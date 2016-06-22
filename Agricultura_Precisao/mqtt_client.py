import paho.mqtt.client as mqtt

url = "192.168.160.98"
port = 1883
channel = "Final/1530a822cb627f42664f22e224a32ae8d6f9fdafd6879766a3d8fe362c705c5f/2/Sensor/7"
keepALive = 60


# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))
    # Subscribing in on_connect() means that if we lose the connection and
    # reconnect then subscriptions will be renewed.
    client.subscribe(channel)


# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
    print(str(msg.payload))
    return msg.payload

client = mqtt.Client()

client.on_connect = on_connect
client.on_message = on_message
username = "Agri_prec"
password = "1530a822cb627f42664f22e224a32ae8d6f9fdafd6879766a3d8fe362c705c5f"
client.username_pw_set(username, password)
client.connect(url, port, keepALive)

# Blocking call that processes network traffic, dispatches callbacks and
# handles reconnecting.
# Other loop*() functions are available that give a threaded interface and a
# manual interface.
client.loop_forever()
