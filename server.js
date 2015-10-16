/** Use the net module to create a new server that listens on a specified
*address 0.0.0.0 and port 6969 and listens for and accepts socket connections.
*/

var fs = require('fs');

var net = require('net');

var address = '0.0.0.0';

var PORT = 6969;


var server = net.createServer(function(c) { //'connection' listener
  console.log('client connected');

  c.on('end', function() {
    console.log('client disconnected');
  });

  c.write('hello\r\n');
  c.pipe(c);

});

server.listen({
  host : address,
  port : PORT
});