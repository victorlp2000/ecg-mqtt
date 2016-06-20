
var mqtt = require('mqtt');
var fs = require('fs');

if (process.argv.length <= 2) {
  console.log("from file");
  process.exit();
}

var filename = process.argv[2];

var data = fs.readFileSync(filename);
var lines = data.toString().split('\n');

console.log('lines:' + lines.length);

var id = 'datafile';
var i = 0;

client = mqtt.connect({host:"120.25.86.124", port:1883});
client.on('connect', function() {
  client.subscribe(id);

  setInterval(function() {
    var msg = lines[i];
    console.log('publish: ' + i);
    console.log(msg);
    client.publish(id, msg);
    if (i < lines.length)
      i ++;
    else
      i = 0;
  }, 1000);
});
