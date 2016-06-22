# Create your views here.


import json
import re

from django.core import serializers
from django.core.urlresolvers import reverse
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.shortcuts import render
from rest_framework import viewsets

from Agricultura_Precisao.models import Waspmote, User, Appkey, Sensorval, Typesensor, Sensor, Alert
from Agricultura_Precisao.serializers import UserSerializer, SensorValSerializer, TypeSensorSerializer


def index(request):
    return render(request, 'index.html')


def login(request):
    return render(request, 'login.html')


def alert(request):
    alerts = []
    waspmotealert = []

    for app in Appkey.objects.filter(userid=request.session['userID']):
        waspmote = Waspmote.objects.filter(waspmoteid=app.appkeyid)
        waspmotealert += Waspmote.objects.filter(waspmoteid=app.appkeyid)
        for wasp in waspmote:
            sen = Sensor.objects.filter(waspmoteid=wasp.waspmoteid)
            for alertsSensores in sen:
                alerts += Alert.objects.filter(sensorfk=alertsSensores.sensorid)

    context = {'waspmoteAlert': waspmotealert, 'alerts': alerts}
    return render(request, 'Alert.html', context)


def agricprecisao(request):
    appkeyid = request.GET.get('appId')
    waspmote_info = Waspmote.objects.filter(appkeyid=appkeyid)
    aux = None
    auxbatery = None
    flag = False
    array = dict()

    for wasp in waspmote_info:
        for sensor in wasp.sensor_set.all():
            if sensor.status == 0:
                aux = 0
                break
            elif sensor.status == 1:
                aux = 1
                flag = True
            elif sensor.status == 2:
                if not flag:
                    aux = 2

        array[wasp.waspmoteid] = aux
        aux = None
        flag = False
    battery = Sensorval.objects.filter(sensor_fk=6).last()
    context = {'waspmote_info': waspmote_info,
               'array': array, 'battery': battery}
    return render(request, 'AgriculturaPrecisao.html', context)


def realtime(request):
    return render(request, 'realtime.html')


def get_100values(request):
    if request.is_ajax():
        if request.method == 'GET':
            incoming_json = request.GET['sensorId']
            aux_list = re.findall('\d+', incoming_json)  # Buscar o id do sensor
            sensor_id = int(
                ''.join(map(str, aux_list)))  # O id do sensor vem numa lista, isto serve para o meter num int
            values = Sensorval.objects.filter(sensor_fk=sensor_id)[::-1][:100]
            data = serializers.serialize("json", values)
            return HttpResponse(data, content_type="application/json")

    else:
        return HttpResponse(json.dumps({"error": "error"}),
                            content_type="application/json")


def get_1000values(request):
    if request.is_ajax():
        if request.method == 'GET':
            incoming_json = request.GET['sensorId']
            aux_list = re.findall('\d+', incoming_json)  # Buscar o id do sensor
            sensor_id = int(
                ''.join(map(str, aux_list)))  # O id do sensor vem numa lista, isto serve para o meter num int
            #LAST 30 DAYS
            #temp = date.today() - timedelta(days=30)
            #valuesmonth = Sensorval.objects.filter(sensor_fk=sensor_id, timestamp__gte=temp)
            # LAST 30 DAYS
            valuesmonth = Sensorval.objects.filter(sensor_fk=sensor_id)[::-1][:1000]
            datamonth = serializers.serialize("json", valuesmonth)
            return HttpResponse(datamonth, content_type="application/json")
    else:
        return HttpResponse(json.dumps({"error": "error"}),
                            content_type="application/json")


def get_customdayvalues(request):
    array = []
    if request.is_ajax():
        if request.method == 'GET':
            incoming_json = request.GET['sensorId']
            incoming_json2 = request.GET['date']
            aux_list = re.findall('\d+', incoming_json)  # Buscar o id do sensor
            sensor_id = int(
                ''.join(map(str, aux_list)))  # O id do sensor vem numa lista, isto serve para o meter num int
            valuesall = Sensorval.objects.filter(sensor_fk=sensor_id)
            for val in valuesall:
                datac = val.timestamp.strftime('%Y-%m-%d')
                if datac == incoming_json2:
                    array.append(val)
            datavalues = serializers.serialize("json", array)
            return HttpResponse(datavalues, content_type="application/json")
    else:
        return HttpResponse(json.dumps({"error": "error"}),
                            content_type="application/json")


def get_customintervalvalues(request):
    array = []
    if request.is_ajax():
        if request.method == 'GET':
            incoming_json = request.GET['sensorId']
            incoming_json2 = request.GET['dateini']
            incoming_json3 = request.GET['datefim']
            aux_list = re.findall('\d+', incoming_json)  # Buscar o id do sensor
            sensor_id = int(
                ''.join(map(str, aux_list)))  # O id do sensor vem numa lista, isto serve para o meter num int
            valuesall = Sensorval.objects.filter(sensor_fk=sensor_id)

            for val in valuesall:
                datac = val.timestamp.strftime('%Y-%m-%d')
                print(datac)
                if incoming_json2 <= datac <= incoming_json3:
                    array.append(val)
            print(array)
            datavalues = serializers.serialize("json", array)
            return HttpResponse(datavalues, content_type="application/json")
    else:
        return HttpResponse(json.dumps({"error": "error"}),
                            content_type="application/json")


def get_typesensor(request):
    if request.is_ajax():
        if request.method == 'GET':
            sensor_id = request.GET['sensorid']
            typesensor = Typesensor.objects.get(sensor__sensorid=sensor_id).typesensorname
            jsonResponse = json.dumps({'typesensor': typesensor})
            return HttpResponse(jsonResponse, content_type="application/json")
    else:
        return HttpResponse(json.dumps({"error": "error"}),
                            content_type="application/json")


def validate_login(request):
    if request.method == 'POST':
        username = str(request.POST['username'])
        pwd = str(request.POST['password'])
        user = User.objects.get(name=username, password=pwd)
        if user is None:
            return render(request, 'index.html')
        else:
            request.session['userID'] = user.iduser
            request.session['username'] = user.name
            url = reverse('appkeys', args=())
            return HttpResponseRedirect(url)


def appkeys(request):
    appkey_info = Appkey.objects.filter(userid=request.session['userID'])
    waspmote_info = Waspmote.objects.filter(appkeyid=appkey_info)
    context = {'appkey_info': appkey_info, 'waspmote_info': waspmote_info}
    return render(request, 'Appkeys.html', context)


def logout(request):
    request.session.clear()
    render(request, index)


def navbar(request):
    return render(request, 'navbar.html')


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer


class sensorValViewSet(viewsets.ModelViewSet):
    queryset = Sensorval.objects.all()
    serializer_class = SensorValSerializer


class typesensorViewSet(viewsets.ModelViewSet):
    queryset = Typesensor.objects.all()
    serializer_class = TypeSensorSerializer
