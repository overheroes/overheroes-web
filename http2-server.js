const express = require('express');
const request = require('request');
const spdy = require('spdy');
const app = express();
const port = 5000;
const fs = require('fs');

const options = {
  key: fs.readFileSync(__dirname + '/certificate/server.key'),
  cert:  fs.readFileSync(__dirname + '/certificate/server.crt')
};

app.use(express.static(__dirname + '/public'));

app.get('/heroes', (req, res) => {
  request('https://overwatch-data.herokuapp.com/data/heroes.json', (error, response, body) => {
      if (!error && response.statusCode === 200) {
        res.send(body);
      }
    }
  );
});

spdy.createServer(options, app)
  .listen(port, (error) => {
    if (error) {
      console.error(error);
      return process.exit(1);
    } else {
      console.log('Listening on port: ' + port + '.');
    }
  });

module.exports = app;
