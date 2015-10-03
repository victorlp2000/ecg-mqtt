
var mqtt = require('mqtt')

var clientId = 'sin-wave';

function getPacket(index) {
	var factor = 10;
	var data = [];
	var d = {
		client_id: clientId,
		packet: 0,
		ecg: {
			start_ecg: 0,
			data: data
		}
	};

	for (var i = 0; i < 200; i++) {
		data.push(Math.sin(Math.PI * 2 * i / 200));
	}
	d.packet = index;
	d.ecg.start_ecg = Date.now();
	return { d: d };
}

//var client = mqtt.createClient(1884, 'dev.cloudemist.com');
var client = mqtt.connect('mqtt://dev.cloudemist.com:1884');
client.on('connect', function() {
	client.subscribe(clientId);
	var index = 0;
	setInterval(function() {
		var msg = JSON.stringify(getPacket(index));
		client.publish(clientId, msg);
		index ++;
	}, 1000);
});
