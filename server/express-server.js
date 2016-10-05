
var express = require('express');
var fs = require('fs');
var http = require('http');
var path = require('path');
var app = express();

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var storage = {
  results: []
};

// var file = 'data.json';
// var msgs = [];

// var readFile = function(data) {
//   fs.readFile(file, (err, data) => {
//     if (err) { 
//       throw err; 
//     }
//     msgs = JSON.parse(data);
//   });
// };

// var postToFile = function() {
//   fs.writeFile(file, JSON.stringify(msgs), (err) => {
//     if (err) { 
//       throw err; 
//     }
//     console.log('It\'s saved!');
//   });
// };

// fs.open(file, 'r', (err, data) => {
//   if (err) {
//     if (err.code === 'ENOENT') {
//       console.error('myfile does not exist');
//       return;
//     } else {
//       throw err;
//     }
//   } else {
//     readFile(data);
//   }
// });

app.use(express.static( __dirname + '/../client'));

app.get('/classes/messages', function(request, response) {
  statusCode = 200;
  response.setHeader('Last-Modified', (new Date()).toUTCString());
  response.writeHead(statusCode, headers);
  // response.end(JSON.stringify({results: msgs}));
  response.end(JSON.stringify(storage));
  // response.status(statusCode).send(storage);
});

app.post('/classes/messages', function(request, response) {
  var status = 201;
  response.setHeader('Last-Modified', (new Date()).toUTCString());
  response.writeHead(statusCode, headers);
  request.on('data', function(msg) {
    msg = JSON.parse(msg);
    // msgs.push({
    //   username: msg.username,
    //   text: msg.text,
    //   roomname: msg.roomname,
    //   createdAt: new Date()
    // });
    storage.results.push({
      username: msg.username,
      text: msg.text,
      roomname: msg.roomname,
      createdAt: new Date()
    });
  });
  // request.on('end', function() {
  //   postToFile();
  // });
  response.end(JSON.stringify(storage));
  // response.end(JSON.stringify({results: msgs}));
});

// app.listen(3000);
app.listen(process.env.PORT);