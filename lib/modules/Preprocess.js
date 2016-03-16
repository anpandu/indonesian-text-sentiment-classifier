'use strict'

var _ = require('lodash')
var jsonfile = require('jsonfile')
var Tok = require('nalapa').tokenizer
var Word = require('nalapa').word
var Cleaner = require('nalapa').cleaner

var Preprocess = function () {
  this.tfidf = []
}

Preprocess.prototype.loadTfIdf = function(path) {
  this.tfidf = jsonfile.readFileSync(path).tfidf
}

Preprocess.prototype.getToken = function(text) {
  var tokens = Tok.tokenize(text)
  tokens = tokens
    .filter(function (token) { return (Cleaner.removeNonAlphaNumeric(token) !== '') })
    .filter(function (token) { return isNaN(token) })
    .map(function (token) { return token.toLowerCase() })
    .filter(function (token) { return !Word.isStopword(token) })
  tokens = _.uniq(tokens)
  return tokens
}

Preprocess.prototype.getScores = function(tokens) {
  var scores = this.tfidf.map(function (dict) {
    if (tokens.length == 0)
      return 1
    var score = tokens
      .map(function (token) {
        var idx = _.findIndex(dict.tfidf, function(item) { return item[0] === token})
        var s = (idx<0) ? 0 : dict.tfidf[idx][1]
        return s
      })
      .reduce(function (a,b) { return a+b })
    return score
  })
  var total = scores.reduce(function (a,b) { return a+b })
  scores = scores.map(function(score) { return score/((total==0) ? 1 : total) })
  var categories = this.tfidf.map(function (tfidf) { return tfidf.category})
  return _.zip(categories, scores)
}

Preprocess.prototype.process = function(text) {
  var tokens = this.getToken(text)
  var scores = this.getScores(tokens)
  return {
    text: text,
    scores: scores
  }
}

var preprocess = new Preprocess ()
preprocess.loadTfIdf(__dirname+'/../res/15741.model.json')
module.exports = preprocess
