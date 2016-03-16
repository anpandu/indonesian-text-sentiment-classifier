
var jsonfile = require('jsonfile')
var Trainer = require('../modules/Trainer.js')

var readpath = process.argv[2]
var writepath = process.argv[3]
var data = jsonfile.readFileSync(readpath)
Trainer
  .train(data, true)
  .then(function (result) {
  	console.log()
  	console.log('LABELS '+JSON.stringify(result.labels))
  	jsonfile.writeFileSync(writepath, result, {spaces:2})
  	console.log('RESULT saved to '+writepath)
  })