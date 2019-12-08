// Node.js WebSocket server script
const http = require('http');
const WebSocketServer = require('websocket').server;
const server = http.createServer();
server.listen(8080);
const wsServer = new WebSocketServer({
    httpServer: server
});

let clients = [];
wsServer.on('request', function(request) {
    const connection = request.accept(null, request.origin);
    console.log('adding new client with ip: ', connection.remoteAddress);
    connection.on('message', function(message) {
      console.log('Received Message:', message.utf8Data);
      connection.sendUTF('Hi this is WebSocket server!');
    });
    connection.on('close', function(reasonCode, description) {
        console.log('Client has disconnected: ', connection.remoteAddress);
        clients = [];
    });
    clients.push(connection);
    console.log(clients.length);
});

const sendEvent = async (type, args = {}) => {
  const argsString = await JSON.stringify(args);
  console.log(`sending event ${type} with args ${argsString}`);
  clients.forEach(client => {
    console.log(`sending event ${type} to client: ', ${client.remoteAddress}`);
    client.sendUTF(JSON.stringify({type, ...args}));
  });
}

module.exports = sendEvent;