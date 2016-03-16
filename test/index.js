'use strict'

var _ = require('lodash')
var assert = require('assert')
var cls = require('../lib')

describe('indonesian-news-category-classifier', function () {
  
  it('should return text prediction', function () {
    var text = 'Southampton - Liverpool menang besar kala bertandang ke Southampton di babak kelima Piala Liga Inggris.'
    var answer = {text:'Southampton - Liverpool menang besar kala bertandang ke Southampton di babak kelima Piala Liga Inggris.',scores:[['edukasi',0],['health',0],['otomotif',0.01105690398096329],['travel',0],['lifestyle',0.005535347700350083],['techno',0],['internasional',0.017679008325458944],['entertainment',0.037913594950406894],['ibukota',0.009704732756494333],['bisnis',0.003148003916906026],['sport',0.9030505827942292],['nasional',0.011911825575191133]],prediction:'sport'}
    var result = cls.predict(text)
    assert(_.isEqual(answer, result))
  })
})
