'use strict'

var _ = require('lodash')
var jsonfile = require('jsonfile')
var assert = require('assert')
var svm = require('node-svm')
var Classifier = require('../../lib/modules/Classifier.js')

describe('Classifier', function () {

  it('loadModel', function () {
    var answer = jsonfile.readFileSync('lib/res/sentiment.model.json').svm
    assert(_.isObject(Classifier.model), 'empty model')
  })

  it('classify', function () {
    var scores = [ [ '2', 0 ], [ '0', 0 ], [ '1', 0 ] ]
    var result = Classifier.classify(scores)
    assert(_.isEqual(result, '2'))
  })
})
