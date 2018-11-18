const express = require('express');
const app = express();
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config.js');
const webpack = require('webpack');
const port = 3031;
const compiler = webpack(webpackConfig);
const fs = require('fs');
const storeDir = __dirname + '/public/';
var encoding = 'utf8';
const mongoose = require('mongoose');
// import axios from 'axios';
const axios = require('axios');

/*
 * Mongo connection
 */
mongoose.connect('mongodb://localhost/test', { useMongoClient: true });
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {

    db.db.collection("collection-name", function(err, collection){
        collection.find({}).toArray(function(err, data){
            console.log(data); // it will print your collection data
        })
    });

});

app.get(`/complaints`, (req, res) => {
    axios.get('http://10.10.5.193:8888/complains')
    .then(result => {
      // apply view on data
      console.log(result.data);
      res.send(result.data);
    })
    .catch(err => {
      console.log(err);
    })
});

app.post(`/complaints`, (req, res) => {
  axios({
    method: 'post',
    url: 'http://10.10.5.193:8888/complains',
    data: {"speech": req.query.message},
    config: { headers: {'Content-Type': 'application/json' }}
  })
  // axios.post(`http://10.10.5.193:8888/complains`, {})
  .then(result => {
    // apply view on data
    console.log(result.data);
    res.send(result.data);
  })
  .catch(err => {
    console.log(err);
  })
});

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'app.js',
  contentBase: './dist',
  host: 'localhost',
}));

app.use(webpackHotMiddleware(compiler, {
  log: console.log,
  reload: true,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
}));

app.route('/')

app.use('/dist', express.static(__dirname + '/dist/'));
app.use('/public', express.static(__dirname + '/public'));

// viewed at http://localhost:3031
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, function () {
  console.log('server running at ', port);
});
