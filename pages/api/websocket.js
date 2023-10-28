// Can temporarily use this, will treat it like node.js
// In prod -- set up another endpoint somewhere, for the real ws server. 

const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const algoConfig = require('../../config'); // version safe, w node.

let algoPortMapping = algoConfig; // re-export, sort of.

function startWebSocketServer(algoId, port) {
  const app = express();
  const server = http.createServer(app);
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log(`Client connected to ${algoId} server on port ${port}`);

    // Send a welcome message when a client connects
    ws.send(`Welcome to the WebSocket server for ${algoId}!`);

    ws.on('message', (message) => {
      console.log(`[${algoId}] Received message: ${message}`);
      
      // Broadcast the message to all connected clients of the same algo
      wss.clients.forEach(client => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });

    ws.on('close', () => {
      console.log(`Client disconnected from ${algoId} server`);
    });
  });

  server.listen(port, () => {
    console.log(`WebSocket server for ${algoId} is running on http://localhost:${port}`);
  });
}

// Start a WebSocket server for each algorithm
Object.entries(algoPortMapping).forEach(([algoId, port]) => {
  startWebSocketServer(algoId, port);
});


/*
To be clear on the flow:

1.  start multiple WebSocket servers, one for each algorithm, each on its own port. (HERE)
    Port mapping based on config.js -- algo_id: port. 

2.  Clients (in our case, Next components representing charts) 
    connect to the appropriate WebSocket server using the corresponding port 
    (determined by the algorithm they're interested in).

3.  External sources (like some data processing service or another server) send messages to these WebSocket servers. 
    These could be updates related to the algorithm's execution, new data points for the chart, etc.

4.  Upon receiving a message, the WebSocket server broadcasts it to all connected clients for that algorithm.

5.  Each client (React component) processes the received message and updates the chart accordingly.


This could also subscribe to pubsub, or poll things, etc -- but 'push' is going to be most efficient.
*/
