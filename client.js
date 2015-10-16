var net = require('net');

var readableStandardInput =  process.stdin;
var writableStandardOutput = process.stdout;

var client = new net.Socket();

// connects to the server on port 6969
client.connect(6969, '0.0.0.0', function() {
  client.write('Hello, server! Love, Client.');
});

// sends a message to the server
readableStandardInput.on('data', function(chunk) {
  client.write(chunk.toString());
});

// Receives a message from the server
client.on('data', function(data) {
  console.log('Received: ' + data);
});

// when the server stops connection
client.on('close', function() {
  console.log('Connection closed');
});

