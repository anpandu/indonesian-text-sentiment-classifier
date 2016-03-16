'use strict'

var _ = require('lodash')
var Promise = require('bluebird')
var jsonfile = require('jsonfile')
var Tok = require('nalapa').tokenizer
var Word = require('nalapa').word
var Cleaner = require('nalapa').cleaner
var svm = require('node-svm')
var Preprocess = require('./Preprocess.js')

var Trainer = function () {
  
}

Trainer.prototype.FREQ_THRESHOLD = 3

Trainer.prototype.BLACKLIST = ['kompas','detikhealth','detikoto','detiktravel','next','prev','wolipop','tempo','co','com','fds','rdn','lll','vit','rgr','ddn','arf','lth','odi','adr','eny','als','hst','aln','int','ami','nawangwulan','yon','dema','mechos','de','larocha','daily','mail']

Trainer.prototype.getLabelList = function(data) {
  var labels = data
    .map(function (datum) { return datum.label })
  labels = _.uniq(labels)
  return labels
}

Trainer.prototype.appendCleanTokens = function(_data, _info) {
  var result = _data
    .map(function (d) { return { 'label': d.label, 'text': d.text, 'msg': d.text.slice(0,64) } })
    .map(function (d, idx) {
      if (_info)
        console.log(idx+' TOKEN\t'+d.label.slice(0,7)+'\t\t'+d.msg)
      var tokens = Preprocess.getToken(d.text)
      d.tokens = tokens
      delete d.msg
      return d
    })
  return result
}

Trainer.prototype.getWordFreq = function(_data, _info) {
  var labels = Trainer.prototype.getLabelList(_data)
  var result = labels
    .map(function (label, idx) {
      if (_info)
        console.log(idx+' FREQ\t'+label)
      var tokens = _.chain(_data)
        .filter(function (d) { return d.label === label})
        .map(function (d) { return d.tokens })
        .flatten()
        .value()
      var freq = _.countBy(tokens, _.identity)
      var new_freq = {}
      for (var key in freq)
        if (freq[key] > Trainer.prototype.FREQ_THRESHOLD)
          new_freq[key] = freq[key]
      return { label: label, freq: new_freq }
    })
  return result
}

Trainer.prototype.getTFIDF = function(_freqs, _info) {
  var freqs_ori = _freqs.slice(0)
  var result = _freqs
    .map(function (datum, idx) {
      if (_info)
        console.log(idx+' TFIDF\t'+datum.label)
      var total = 0
      var tf = {}
      var idf = {}
      var tfidf = {}
      for (var key in datum.freq)
        total += datum.freq[key]
      for (var key in datum.freq) {
        tf[key] = datum.freq[key] / total
        var ncontaining = freqs_ori
          .map(function (_freq) { return (key in _freq.freq) ? 1 : 0 })
          .reduce(function (a, b) { return a + b })
        idf[key] = Math.log(freqs_ori.length / ncontaining)
        tfidf[key] = tf[key] * idf[key]
      }
      datum.tfidf = []
      for (var key in tfidf)
        datum.tfidf.push([key, tfidf[key]])
      datum.tfidf = datum.tfidf.filter(function (t) { return t[1] > 0.0001})
      datum.tfidf = _.sortBy(datum.tfidf, function(t) { return -t[1] })
      return datum
    })
  result = result.map(function (res) { return _.omit(res, ['freq'])}) 
  return result
}

Trainer.prototype.appendScores = function(_data, _tfidf, _info) {
  Preprocess.tfidf = _tfidf
  var result = _data
    .map(function (datum, idx) {
      if (_info)
        console.log(idx+' SCORE\t'+datum.text.slice(0,64))
      var tokens = Preprocess.getToken(datum.text)
      datum.scores = Preprocess.getScores(tokens)
      datum.labels = _tfidf.map(function (dict) { return dict.label })
      return datum
    })
  return result
}

Trainer.prototype.train = function(_data, _info) {
  if (_info) console.log('\nPreprocessing text to token ...')
  var data2 = Trainer.prototype.appendCleanTokens(_data, _info)

  if (_info) console.log('\nComputing word frequency ...')
  var freqs = Trainer.prototype.getWordFreq(data2, _info)

  if (_info) console.log('\nComputing TFIDF ... ')
  var tfidf = Trainer.prototype.getTFIDF(freqs, _info)

  if (_info) console.log('\nComputing scores ...')
  var data3 = Trainer.prototype.appendScores(_data, tfidf, _info)
  var dataset = data3.map(function (datum) { 
    var labels = datum.scores.map(function (s) { return s[0]})
    var scores = datum.scores.map(function (s) { return s[1]})
    return [scores, labels.indexOf(datum.label)]
  })

  if (_info) console.log('\nTrain SVM model ...')
  var clf = new svm.CSVC()
  return new Promise (function (resolve, reject) {
      clf
        .train(dataset)
        .spread(function (model, report) {
          var result = {
            labels: data3[0].labels,
            svm: model,
            tfidf: tfidf,
          }
          resolve(result)
        })
    })
}

var trainer = new Trainer ()
module.exports = trainer
