var express = require('express')
var path = require('path')
var app = express()
const PORT = process.env.PORT || 4000

app.use(function (req, res, next) {
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url)
  } else {
    next()
  }
})

app.use(express.static('app'))
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'app', 'index.html'))
})

app.listen(PORT, function () {
  console.log('Express server is up on port', PORT)
})
