let lyrics = [
  'End of passion play, crumbling away',
  'I\'m your source of self-destruction',
  'Veins that pump with fear, sucking dark is clear',
  'Leading on your deaths construction',
  'Taste me you will see',
  'More is all you need',
  'Dedicated to',
  'How I\'m killing you',
  'Come crawling faster',
  'Obey your Master',
  'Your life burns faster',
  'Obey your Master',
  'Master',
  'Master of Puppets I\'m pulling your strings',
  'Twisting your mind and smashing your dreams',
  'Blinded by me, you can\'t see a thing',
  'Just call my name, \'cause I\'ll hear you scream',
  'Master',
  'Master',
  'Just call my name, \'cause I\'ll hear you scream',
  'Master',
  'Master'
];

let WebSocketServer = require('ws').Server;
let server = new WebSocketServer({port: 40510})

console.log('Socket server started');

server.on('connection', (ws) => {
  console.log('Socket server got a connection!');
  let singing;
  ws.on('message', (message) => {
    console.log('Socket server received a message:', message);
    ws.send(message);
    if (!singing && message.match(/sing/)) {
      setTimeout(() => {
        ws.send(JSON.stringify({who: "Hetfield", message: "Sure! Here is my favourite:"}));
        let i = 0;
        singing = setInterval(
          () => ws.send(JSON.stringify({
            who: 'Hetfield',
            message: lyrics[(i++) % lyrics.length]
          })),
          1500
        );
      }, 1500);
    }
  });
  ws.on('close', () => {
    console.log('Socket server closed down.');
    clearInterval(singing)
  });
});
