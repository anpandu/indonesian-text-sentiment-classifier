'use strict'

var _ = require('lodash')
var jsonfile = require('jsonfile')
var assert = require('assert')
var Preprocess = require('../../lib/modules/Preprocess.js')

describe('Preprocess', function () {

  it('loadTfIdf', function () {
    var answer = jsonfile.readFileSync('lib/res/sentiment.model.json').tfidf
    assert(Preprocess.tfidf.length > 0, 'empty tfidf')
    Preprocess.tfidf.slice(0,5).forEach(function (tfidf, idx) {
      assert(_.isEqual(tfidf, answer[idx]))
    })
  })

  it('getToken', function () {
    var text = '@asdasd #asdasd Kapal feri Sea Prince yang mengangkut sebanyak http://asd.zxc https://asd.zxc'
    var answer = 'Kapal feri Sea Prince yang mengangkut sebanyak'
    var tokens = Preprocess.cleanText(text)
    assert(_.isEqual(answer, tokens))
  })

  it('getToken', function () {
    var text = 'Kapal feri Sea Prince yang mengangkut sebanyak 100 orang dari Singapura menuju Indonesia tenggelam di Batam'
    var answer = ['kapal','feri','sea','prince','mengangkut','orang','singapura','indonesia','tenggelam','batam']
    var tokens = Preprocess.getToken(text)
    assert(_.isEqual(answer, tokens))
  })

  it('getScores', function () {
    var text = 'Southampton - Liverpool menang besar kala bertandang ke Southampton di babak kelima Piala Liga Inggris. Tertinggal lebih dahulu, Liverpool bikin 6 gol balasan di mana Divock Origi mencetak hat-trick dan Daniel Sturridge dua gol.'
    var tokens = Preprocess.getToken(text)
    var scores = Preprocess.getScores(tokens)
    var answer = [["0",0],["1",1],["2",0]]
    assert(_.isEqual(answer, scores))
  })

  it('process', function () {
    var text = 'Kapal feri Sea Prince yang mengangkut sebanyak 100 orang dari Singapura menuju Indonesia tenggelam di Batam'
    var answer = {"text":"Kapal feri Sea Prince yang mengangkut sebanyak 100 orang dari Singapura menuju Indonesia tenggelam di Batam","scores":[["0",0],["1",0],["2",0]]}
    var result = Preprocess.process(text)
    assert(_.isEqual(answer, result))
  })
})
