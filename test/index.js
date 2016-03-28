'use strict'

var _ = require('lodash')
var assert = require('assert')
var cls = require('../lib')

describe('indonesian-text-sentiment-classifier', function () {
  
  it('should return text prediction', function () {
    var text = 'Southampton - Liverpool menang besar kala bertandang ke Southampton di babak kelima Piala Liga Inggris.'
    var answer = {"text":"Southampton - Liverpool menang besar kala bertandang ke Southampton di babak kelima Piala Liga Inggris.","scores":[["0",0],["1",0],["2",0]],"prediction":"0"}
    var result = cls.predict(text)
    assert(_.isEqual(answer, result))
  })
})
