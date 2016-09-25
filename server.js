const express = require('express');
const app = express();
const request = require('request');
const port = 5000;

app.use(express.static(__dirname + '/public', { maxAge: 14400000 }));

app.listen(process.env.PORT || port);

app.get('/heroes', (req, res) => {
  request('https://overwatch-data.herokuapp.com/data/heroes.json', (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  })
});

console.log('started at port: ' + port);

module.exports = app;
