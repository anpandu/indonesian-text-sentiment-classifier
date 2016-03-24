var _ = require('lodash')

var getRecalls = function (conmat) {
  var result = []
  conmat.forEach(function (row, ridx) {
    var value = row[ridx]
    var predicteds = row
    var sum = _.sum(predicteds)
    sum = (sum>0) ? sum : 1
    result.push(value/sum)
  })
  return result
}

var getPrecisions = function (conmat) {
  var result = []
  conmat.forEach(function (row, ridx) {
    var value = row[ridx]
    var actuals = conmat.map(function (row) {return row[ridx]})
    var sum = _.sum(actuals)
    sum = (sum>0) ? sum : 1
    result.push(value/sum)
  })
  return result
}

var getFMeasures = function (conmat) {
  var rs = getRecalls(conmat)
  var ps = getPrecisions(conmat)
  var fms = rs.map(function (r, i) {
    var p = ps[i]
    var sum = (p+r)
    sum = (sum>0) ? sum : 1
    var fm = 2*(p*r)/sum
    return fm
  })
  return fms
}

var getAverageFMeasure = function (conmat) {
  var fms = getFMeasures(conmat)
  return _.sum(fms)/fms.length
}

var printArrays = function (arrs) {
  for (var i = 0; i < arrs[0].length; i++) {
    var str = arrs
      .map(function (arr) { return (''+arr[i]).slice(0,7) + '\t' })
      .reduce(function (a,b) { return a+b})
    console.log(str)
  }
}

var labels = [ '2',
  '0',
  '1']

var conmat = 
[ [ 0, 17, 0 ], [ 0, 60, 0 ], [ 0, 23, 0 ] ]
  
var recalls = getRecalls(conmat)
var precisions = getPrecisions(conmat)
var fmeasures = getFMeasures(conmat)
var fmeasure = getAverageFMeasure(conmat)

console.log('CONFUSION MATRIX')
console.log(conmat)
console.log()
console.log('TOTAL FMEASURE')
console.log(fmeasure)
console.log()

printArrays([labels, recalls, precisions, fmeasures])