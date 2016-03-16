'use strict'

var _ = require('lodash')
var jsonfile = require('jsonfile')
var assert = require('assert')
var svm = require('node-svm')
var Classifier = require('../../lib/modules/Classifier.js')

describe('Classifier', function () {

  it('loadModel', function () {
    var answer = jsonfile.readFileSync('lib/res/15741.model.json').svm
    assert(_.isObject(Classifier.model), 'empty model')
  })

  it('classify', function () {
    var scores = [['edukasi',0],['health',0],['otomotif',0.03595302533370599],['travel',0.3185146904481461],['lifestyle',0.024128275486337593],['techno',0.10048398717407839],['internasional',0.10504621790818398],['entertainment',0.08531553564656265],['ibukota',0.04273118574437586],['bisnis',0.16635922529394154],['sport',0.04591184898444333],['nasional',0.07555600798022455]]
    var result = Classifier.classify(scores)
    assert(_.isEqual(result, 'bisnis'))
  })
})
