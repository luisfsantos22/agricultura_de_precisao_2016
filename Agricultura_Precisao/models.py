# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from __future__ import unicode_literals

from django.db import models


class Alert(models.Model):
    alertid = models.IntegerField(primary_key=True)
    timestampalert = models.DateTimeField(db_column='timestampAlert')  # Field name made lowercase.
    valuealert = models.FloatField(db_column='valueAlert', blank=True, null=True)  # Field name made lowercase.
    sensorfk = models.ForeignKey('Sensor', models.DO_NOTHING, db_column='sensorFk', blank=True, null=True)  # Field name made lowercase.
    state = models.IntegerField()
    dresciption = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'alert'


class Appkey(models.Model):
    appkeyid = models.AutoField(db_column='appKeyId', primary_key=True)  # Field name made lowercase.
    appkey = models.CharField(db_column='appKey', unique=True, max_length=100)  # Field name made lowercase.
    userid = models.ForeignKey('User', models.DO_NOTHING, db_column='userId')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'appkey'


class Communicationtype(models.Model):
    idtype = models.AutoField(db_column='idType', primary_key=True)  # Field name made lowercase.
    typecommunicationname = models.CharField(db_column='typeCommunicationName', unique=True, max_length=50)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'communicationtype'


class Sensor(models.Model):
    sensorid = models.AutoField(db_column='sensorId', primary_key=True)  # Field name made lowercase.
    waspmoteid = models.ForeignKey('Waspmote', models.DO_NOTHING, db_column='waspmoteId')  # Field name made lowercase.
    typesensorid = models.ForeignKey('Typesensor', models.DO_NOTHING, db_column='typeSensorId')  # Field name made lowercase.
    status = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'sensor'


class Sensorval(models.Model):
    sensorvalid = models.AutoField(db_column='sensorValID', primary_key=True)  # Field name made lowercase.
    value = models.FloatField()
    sensor_fk = models.ForeignKey(Sensor, models.DO_NOTHING, db_column='sensor_FK')  # Field name made lowercase.
    timestamp = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'sensorval'


class Standardparameter(models.Model):
    standardid = models.AutoField(db_column='standardId', primary_key=True)  # Field name made lowercase.
    defaultmax = models.FloatField(db_column='defaultMax')  # Field name made lowercase.
    defaultmediummax = models.FloatField(db_column='defaultMediumMax')  # Field name made lowercase.
    defaultmin = models.FloatField(db_column='defaultMin')  # Field name made lowercase.
    defaultmediummin = models.FloatField(db_column='defaultMediumMin')  # Field name made lowercase.
    typeharvest = models.CharField(db_column='typeHarvest', max_length=50)  # Field name made lowercase.
    sensorfk = models.ForeignKey(Sensor, models.DO_NOTHING, db_column='sensorfk', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'standardparameter'


class Typesensor(models.Model):
    typesensorid = models.AutoField(db_column='typeSensorId', primary_key=True)  # Field name made lowercase.
    typesensorname = models.CharField(db_column='typeSensorName', max_length=40)  # Field name made lowercase.
    maxval = models.FloatField(db_column='maxVal')  # Field name made lowercase.
    minval = models.FloatField(db_column='minVal')  # Field name made lowercase.
    sensornamelib = models.CharField(max_length=40)

    class Meta:
        managed = False
        db_table = 'typesensor'


class User(models.Model):
    iduser = models.AutoField(db_column='idUser', primary_key=True)  # Field name made lowercase.
    name = models.CharField(max_length=45)
    password = models.CharField(max_length=40)
    reference = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'user'


class Waspmote(models.Model):
    waspmoteid = models.AutoField(db_column='waspmoteId', primary_key=True)  # Field name made lowercase.
    macaddress = models.CharField(db_column='macAddress', unique=True, max_length=50)  # Field name made lowercase.
    appkeyid = models.ForeignKey(Appkey, models.DO_NOTHING, db_column='appKeyId')  # Field name made lowercase.
    idtype = models.ForeignKey(Communicationtype, models.DO_NOTHING, db_column='idType')  # Field name made lowercase.
    waspmote_name = models.CharField(max_length=20)

    class Meta:
        managed = False
        db_table = 'waspmote'
