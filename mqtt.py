'''
    Connect to MQTT server, get ECG data, push into:
        1. Elasticsearch /ecg/device_id/timestamp
        2. MySQL


    Created Sep. 1, 2015
    By Victor Weiping Liu

'''
import sys, os, urlparse
import json
import paho.mqtt.client as paho

import push_elasticsearch as es

elasticsearch = es.MyElasticsearch()


# Define event callbacks
def on_connect(mosq, obj, rc):
    print("rc: " + str(rc))

def on_message(mosq, obj, msg):
    # ECG data
    if msg.topic[0:5] == "/ecg/":
        # convert to dict
        payload = json.loads(msg.payload)
        if payload['d'] == None:
            print "wrong ECG data format"
            print msg.playload
        else:
            #print payload['d']
            elasticsearch.push(payload['d'])
            # myDB.push(payload['d'])
    else:
        print(msg.topic + " " + str(msg.qos) + " " + str(msg.payload))

def on_publish(mosq, obj, mid):
    print("mid: " + str(mid))

def on_subscribe(mosq, obj, mid, granted_qos):
    print("Subscribed: " + str(mid) + " " + str(granted_qos))

def on_log(mosq, obj, level, string):
    print(string)

#
# connect to MQTT server,
# url - tcp://localhost:1883
#
def connectMQTT(url):
    mqttc = paho.Client()
    # Assign event callbacks
    mqttc.on_message = on_message
    mqttc.on_connect = on_connect
    mqttc.on_publish = on_publish
    mqttc.on_subscribe = on_subscribe

    # Uncomment to enable debug messages
    mqttc.on_log = on_log

    # Parse CLOUDMQTT_URL (or fallback to localhost)
    url_str = os.environ.get('CLOUDMQTT_URL', url) # tcp://52.10.125.94:1884
    url = urlparse.urlparse(url_str)

    # Connect
    # mqttc.username_pw_set(url.username, url.password)
    mqttc.connect(url.hostname, url.port)

    # Start subscribe, with QoS level 0
    #mqttc.subscribe("hello/world", 0)
    mqttc.subscribe("/ecg/#", 0)

    # Publish a message
    #mqttc.publish("hello/world", "my message")

    # Continue the network loop, exit when an error occurs
    rc = 0
    while rc == 0:
        rc = mqttc.loop()
    print("rc: " + str(rc))

if __name__ == "__main__":
    print sys.argv
    if len(sys.argv) > 1:
        print sys.argv[1]
        connectMQTT(sys.argv[1])
    else:
        connectMQTT("tcp://dev.cloudemist.com:1884");
    #    connectMQTT("tcp://52.10.125.94:1884");

