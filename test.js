var http = require('http');
var assert = require('assert');
var restc = require('restc');

var server = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World');
});

var client = restc(
  {
    name: 'HELLO',
    port: 1337
  },
  require('./index').logger()
);

server.listen(1337, '127.0.0.1', function () {
  console.log('Server running at http://127.0.0.1:1337');

  client.get('/', function (err, req, res, data) {
    if (err) throw err;
    assert(data == 'Hello World');

    client.post('/', "Hello !", function (err, req, res, data) {
      if (err) throw err;
      assert(data == 'Hello World');

      process.exit();
    });
  });

});

