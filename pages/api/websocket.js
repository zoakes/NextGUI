// Can temporarily use this, will treat it like node.js
// In prod -- set up another endpoint somewhere, for the real ws server. 

const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');

    // Send a welcome message when a client connects
    ws.send('Welcome to the WebSocket server!');

    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        
        // Broadcast the message to all connected clients
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`WebSocket server is running on http://localhost:${PORT}`);
});
