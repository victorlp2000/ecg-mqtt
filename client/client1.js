
var mqtt = require('mqtt')
var msg = '{"d":{ "client_id":"d:b448b82707", "time_gyro_x":"1441039217094", "time_gyro_y":"1441039217095", "acc_x":"0.02", "light":"216.24", "compass_x":"0.00", "time_gyro_z":"1441039217094", "time_light":"1441039217097", "acc_z":"-0.96", "time_ecg":"1441039216853", "ecg":"-5,-4,-3,-2,-1,0,-5,-4,-3,-2,-1,0,0,1,2,3,4,5,-5,-4,-3,-2,-1,0,0,1,2,3,4,5,-5,-4,-3,-2,-1,0,0,1,2,3,4,5,-5,-4,-3,-2,-1,0,0,1,2,3,4,5,-5,-4,-3,-2,-1,0,0,1,2,3,4,5,-5,-4,-3,-2,-1,0,0,1,2,3,4,5,-5,-4,-3,-2,-1,0,0,1,2,3,4,5,-5,-4,-3,-2,-1,0,0,1,2,3,4,5,-5,-4,-3,-2,-1,0,0,1,2,3,4,5", "time_acc_z":"1441039217095", "gyro_x":"-1.16", "compass_y":"0.00", "time_compass_y":"1441039217094", "time_acc_x":"1441039217095", "acc_y":"0.01", "time_compass_z":"1441039217095", "time_compass_x":"1441039217094", "gyro_z":"0.15", "gyro_y":"-2.94", "time_acc_y":"1441039217095", "compass_z":"0.00" }}'; 
client = mqtt.createClient(1884, '52.10.125.94');
 
client.subscribe('presence');
 
console.log('Client publishing.. ');

client.publish('presence', msg);
client.end();