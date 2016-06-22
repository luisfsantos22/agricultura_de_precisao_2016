from Agricultura_Precisao.models import User, Sensorval, Typesensor
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'iduser', 'name', 'password')


class SensorValSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Sensorval
        fields = ('url', 'sensorvalid', 'value', 'timestamp')# Falta acabar isto


class TypeSensorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Typesensor
        fields = ('url','typesensorid', 'typesensorname', 'maxval', 'minval')