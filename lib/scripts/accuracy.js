
var _ = require('lodash')
var jsonfile = require('jsonfile')
var Trainer = require('../modules/Trainer.js')
var Preprocess = require('../modules/Preprocess.js')
var Classifier = require('../modules/Classifier.js')

var datapath = process.argv[2]
var modelpath = process.argv[3]
var dataset = jsonfile.readFileSync(datapath)
var model = jsonfile.readFileSync(modelpath)

Preprocess.loadTfIdf(modelpath)
Classifier.loadModel(modelpath)

var labels = model.labels

var matrix = labels.map(function () { return labels.map(function () { return 0})})
var match = 0
dataset.forEach(function (ds, idx) {
	var score = Preprocess.process(ds.text).scores
  // var printscore = score
  //   .map(function (item) { return item[1].toFixed(5)})
  //   .reduce(function (a,b) { return a+'\t'+b})
  var actual = ds.category
  var prediction = Classifier.classify(score)
  match += (actual==prediction) ? 1 : 0

  var err = (actual==prediction) ? '-' : 'X'
  console.log('%d\t%s\t =>   %s\t%s\t%s',
    idx,
    err,
    actual.slice(0,7),
    prediction.slice(0,7),
    ds.url
  )

  var idx_act = labels.indexOf(actual)
  var idx_pre = labels.indexOf(prediction)
  if (idx_act > -1)
  	matrix[idx_act][idx_pre] += 1
})
console.log('LABELS')
console.log(labels)
console.log('CONFUSION MATRIX')
console.log(matrix)
console.log('ACC')
console.log(dataset.length, match, match/dataset.length)