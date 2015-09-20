var mqtt = require('mqtt')

var sumLength = 0;
var items = 0;
var minLength = 300;
var maxLength = 0;
var minTime = 100;
var maxTime = 0;
var lastTime = 0;
var lastLength = 0;
var fixedTime = 0;
var timeInterval = 4.7;
var counter = 0;

client = mqtt.connect({host:"dev.cloudemist.com", port:1884});
//client = mqtt.connect({host:"52.10.125.94", port:1884});
//client = mqtt.createClient(1883, "localhost");
 
client.subscribe('#');
//client.subscribe('iot-2/evt/status/fmt/json');
 
client.on('message', function(topic, message) {
  //console.log(message.toString());
  var data = JSON.parse(message.toString());
  if ("ecg" in data.d) {
      if (lastTime != 0) {
        var  averageTime = (data.d.ecg.start_ecg - lastTime) / lastLength;
        if (averageTime < minTime)
          minTime = averageTime;
        if (averageTime > maxTime)
          maxTime = averageTime;
      }
      if (fixedTime == 0) {
        fixedTime = data.d.ecg.start_ecg;
      } else {
        var diffTime = data.d.ecg.start_ecg - fixedTime;
        console.log("diff time:" + diffTime);
        if (diffTime > 200 && counter > 10) {
          timeInterval += 0.05;
          console.log("interval +++ :" + timeInterval);
          counter = 0;
        } else if (diffTime < -200 && counter > 10) {
          timeInterval -= 0.05;
          console.log("interval --- :" + timeInterval);
          counter = 0;
        }
        counter ++;
      }
    sumLength += data.d.ecg.data.length;
    items ++;
    if (sumLength/items < minLength)
        minLength = sumLength/items;
    if (sumLength/items > maxLength)
        maxLength = sumLength/items;
    //console.log("length:" + data.d.ecg.data.length + ", average:" + sumLength/items + ", minLength:" + minLength + ", maxLength:" + maxLength);
    //console.log("delta time:" + (data.d.ecg.start_ecg - lastTime) + ", minTime:" + minTime + ", maxTime:" + maxTime);
    lastLength = data.d.ecg.data.length;
    lastTime = data.d.ecg.start_ecg;
    fixedTime += lastLength * timeInterval;
  }
  //console.log(data);
});
 
console.log('Client started...');

