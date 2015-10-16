/** Use the net module to create a new server that listens on a specified
*address 0.0.0.0 and port 6969 and listens for and accepts socket connections.
*/

var fs = require('fs');

var net = require('net');

var address = '0.0.0.0';

var PORT = 6969;

var clientList = [];

var server = net.createServer(function(client) { //'connection' listener
  console.log('client connected');

  // Identify the client
  client.name = client.remoteAddress + ':' + client.remotePort;

  // adds the new client to a list
  clientList.push(client);

  // sends a nice welcome message and announce
  client.write('Welcome' + client.name + '\n');
  broadcast(client.name + 'joined the chat\n', client);

  // handle incoming messages from clients
  client.on('data', function(inputFromClient) {
    broadcast(client.name + ' says: ' + inputFromClient, client);
  });

  // client disconnects
  client.on('end', function() {
    console.log('client disconnected');
  });

  // sends the message to all connected clients
  function broadcast(message, sender) {
    clientList.forEach(function (client) {
      // Dont send the message to the sender
      if (client === sender) return;
      client.write(message);
    });

    // Log it to the server output too
    process.stdout.write(message);
  }

  // // client writes data to input
  // client.write('hello\r\n');
  // client.pipe(client);
});

server.listen({
  host : address,
  port : PORT
});