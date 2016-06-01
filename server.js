var express = require('express');
var app = express();
var request = require('request');
var port = 5000;

app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT  || port);

app.get('/heroes', function(req, res) {
    request('https://overwatch-data.herokuapp.com/data/heroes.json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body);
        }
    })
});


console.log('started at port: ' + port);

module.exports = app;
