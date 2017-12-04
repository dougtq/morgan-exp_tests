let express = require('express')
let bodyParser = require('body-parser')
let consign = require('consign')
let morgan = require('morgan')
let path = require('path')
let fs = require('fs')
let allowcors = require('./cors')

const app = express()

let sucesso = fs.createWriteStream(path.join(__dirname, 'logs/sucessos.log'), {flags: 'a'})
let erro = fs.createWriteStream(path.join(__dirname, 'logs/erros.log'), {flags: 'a'})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms', {
  skip: function (req, res) { return res.statusCode > 299 }, stream: sucesso
}))

app.use(morgan(':remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms', {
  skip: function (req, res) { return (res.statusCode < 400) }, stream: erro
}))

app.use(allowcors)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set('port', 3000)

consign()
.include('./router.js')
.into(app)

app.listen(app.set('port'), () => {
  console.log(`BACKEND is runing on http://localhost:${app.set('port')}`)
})

module.exports = app
