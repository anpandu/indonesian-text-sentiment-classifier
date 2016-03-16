'use strict'

var _ = require('lodash')
var jsonfile = require('jsonfile')
var Tok = require('nalapa').tokenizer
var Word = require('nalapa').word
var Cleaner = require('nalapa').cleaner
var svm = require('node-svm')

var Classifier = function () {
  this.model = []
}

Classifier.prototype.loadModel = function(path) {
  this.model = svm.restore(jsonfile.readFileSync(path).svm)
}

Classifier.prototype.classify = function(scoreset) {
  var labels = scoreset.map(function (s) { return s[0]})
  var scores = scoreset.map(function (s) { return s[1]})
  var prediction = this.model.predictSync(scores)
  var result = labels[prediction]
  return result
}

var classifier = new Classifier ()
classifier.loadModel(__dirname+'/../res/15741.model.json')
module.exports = classifier
