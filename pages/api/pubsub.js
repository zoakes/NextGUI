const { PubSub } = require('@google-cloud/pubsub');


const { startWebSocketServers } = require('./websocket'); // adjust the path as needed
const wssMap = startWebSocketServers();
const pubsub = new PubSub();


// Create or reference an existing topic
const topicName = 'YOUR_TOPIC_NAME';
const subscriptionName = 'YOUR_SUBSCRIPTION_NAME';
let subscription = pubsub.subscription(subscriptionName);

// Listener for `message` event
subscription.on('message', (message) => {
  console.log(`Received message ID: ${message.id}`);
  const data = JSON.parse(message.data.toString());
  const algoId = data.algo_id;
  const rows = data.rows;

  // Get the WebSocket server for the algo_id
  const wss = wssMap[algoId];

  // Broadcast the message to all connected clients of the algo server
  if (wss) {
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          algo_id: algoId,
          data: rows
            // data example:
            // [
            //     {
            //         "id": "series_id1",
            //         "data": [
            //             {"time": 123, "value": 456},
            //             ...
            //         ]
            //     },
            //     {
            //         "id": "series_id2",
            //         "data": [
            //             {"time": 789, "value": 1011},
            //             ...
            //         ]
            //     },
            //     ... potentially more series updates ...
            // ]
        }));
      }
    });
  }

  message.ack();
});

// Error event handler
subscription.on('error', (error) => {
  console.error(`Received error: ${error.message}`);
});
