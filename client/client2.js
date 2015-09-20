var mqtt = require('mqtt')
 
client = mqtt.connect({host:"dev.cloudemist.com", port:1884});
//client = mqtt.connect({host:"52.10.125.94", port:1884});
//client = mqtt.createClient(1883, "localhost");
 
client.subscribe('#');
//client.subscribe('iot-2/evt/status/fmt/json');
 
client.on('message', function(topic, message) {
  console.log(message.toString());
});
 
console.log('Client started...');

