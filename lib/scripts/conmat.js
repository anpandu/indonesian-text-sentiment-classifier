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

var labels = [ 'nasional',
  'ibukota',
  'travel',
  'sport',
  'otomotif',
  'lifestyle',
  'techno',
  'bisnis',
  'entertainment',
  'internasional',
  'health',
  'edukasi' ]

var conmat = 
[ [ 8717, 440, 38, 36, 5, 5, 70, 366, 43, 98, 10, 4 ],
  [ 593, 3977, 1, 5, 2, 1, 9, 45, 58, 6, 2, 1 ],
  [ 55, 1, 1045, 2, 1, 16, 6, 27, 0, 1, 1, 0 ],
  [ 39, 7, 2, 11279, 6, 2, 0, 8, 25, 7, 6, 0 ],
  [ 1, 4, 0, 12, 1011, 0, 2, 13, 1, 0, 1, 0 ],
  [ 17, 2, 33, 13, 0, 1226, 13, 23, 82, 7, 45, 0 ],
  [ 87, 2, 3, 6, 1, 10, 2002, 87, 14, 10, 9, 0 ],
  [ 408, 65, 39, 26, 26, 33, 48, 7342, 16, 8, 3, 0 ],
  [ 62, 82, 2, 23, 0, 40, 8, 13, 4823, 13, 7, 0 ],
  [ 133, 4, 2, 22, 2, 11, 28, 35, 19, 1647, 17, 1 ],
  [ 14, 6, 0, 4, 0, 34, 11, 5, 19, 9, 1221, 0 ],
  [ 15, 0, 0, 1, 0, 0, 7, 3, 1, 4, 6, 89 ] ]
  
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