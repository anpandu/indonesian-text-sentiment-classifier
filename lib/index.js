'use strict'

var Preprocess = require('./modules/Preprocess.js')
var Classifier = require('./modules/Classifier.js')

var predict = function (text) {
  var result = Preprocess.process(text)
  result.prediction = Classifier.classify(result.scores)
  return result
}

module.exports = {
  predict: predict
}
