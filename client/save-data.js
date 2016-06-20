var mqtt = require('mqtt');
var fs = require('fs');

client = mqtt.connect({host:"120.25.86.124", port:1883});

// must have device-id from command line
if (process.argv.length <= 2) {
	console.log("miss device-id");
	process.exit();
}
var id = process.argv[2];
console.log('subscribe to: ' + id);
client.subscribe(id);

var filename = id.lastIndexOf('/');
if (filename === -1)
  filename = id;
else
  filename = id.substring(filename + 1);
filename += ".dat";

var stream = fs.createWriteStream(filename);
var index = 0;

console.log("writing ecg data into: " + filename);
client.on('message', function(topic, message) {
  var data = JSON.parse(message.toString());
  stream.write(JSON.stringify(data) + '\n');
  console.log(index++);
});
 
console.log('Client started...');

