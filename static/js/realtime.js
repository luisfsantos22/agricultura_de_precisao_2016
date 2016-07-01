var chart;
var typesensorlib;
$("#realTimeButton").click(function () {
    //var waspmoteId = jsonData.waspmoteId.replace(/^\D+/g, '');
    //var sensorId = jsonData.sensorId.replace(/^\D+/g, '');
    //var app_key = jsonData.app_key;

    var sensorIds = getcheckedValues();
    //alert(sensorIds);
    var user = 3899;
    var waspmoteId = '+';
    var sensorId = '+';
    var app_key = '+';
    //typesensorReader(sensorId);
    var MQTTbroker = '192.168.160.98';
    var MQTTport = 3000;
    var MQTTsubTopic = 'Final/' + user + '/' + app_key + '/' + waspmoteId + '/Sensor/' + sensorId; //works with wildcard # and + topics dynamically now
//mqtt broker
    var client = new Paho.MQTT.Client(MQTTbroker, MQTTport,
        "myclientid_" + parseInt(Math.random() * 100, 10));

    var dataTopics = [];

    //mqtt connecton options including the mqtt broker subscriptions
    var options = {
        userName: "Agri_prec",
        password: "1530a822cb627f42664f22e224a32ae8d6f9fdafd6879766a3d8fe362c705c5f",
        timeout: 3,
        onSuccess: function () {
            console.log("mqtt connected");
            // Connection succeeded; subscribe to our topics
            client.subscribe(MQTTsubTopic, {qos: 1});
        },
        onFailure: function (message) {
            console.log("Connection failed, ERROR: " + message.errorMessage);
            //window.setTimeout(location.reload(),20000); //wait 20seconds before trying to connect again.
        }
    };


    //Chamar as funções
    init();
    $('#realtime_graph').show();
    draw_graphic();

    client.onMessageArrived = onMessageArrived;
    client.onConnectionLost = onConnectionLost;

    //can be used to reconnect on connection lost
    function onConnectionLost(responseObject) {
        console.log("connection lost: " + responseObject.errorMessage);
        //window.setTimeout(location.reload(),20000); //wait 20seconds before trying to connect again.
    }

    //what is done when a message arrives from the broker
    function onMessageArrived(message) {

        var res = message.destinationName.split("/");
        var sensorId = res[res.length - 1];
        var exists = $.inArray(sensorId, sensorIds);
        if (exists != -1) {
            var typeSensorName = typesensorReader(sensorId);
            //alert(typeSensorName);
            if (dataTopics.indexOf(message.destinationName) < 0) {
                dataTopics.push(message.destinationName); //add new topic to array
                var y = dataTopics.indexOf(message.destinationName); //get the index no
                //create new data series for the chart
                var newseries = {
                    id: y,
                    name: typeSensorName,
                    data: []
                };
                chart.addSeries(newseries); //add the series

            }


            var y = dataTopics.indexOf(message.destinationName); //get the index no of the topic from the array
            var x = JSON.parse(message.payloadString);
            var myEpoch = new Date().getTime(); //get current epoch time
            var thenum = Object.keys(x).map(function (_) {
                return x[_];
            });
            var thenum1 = parseFloat(thenum[1]);
            var plotMqtt = [myEpoch, Number(thenum1)]; //create the array
            if (isNumber(thenum1)) { //check if it is a real number and not text
                console.log('is a propper number, will send to chart.');
                plot(plotMqtt, y);	//send it to the plot function
            }
        }
    }

    //check if a real number
    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    //function that is called once the document has loaded
    function init() {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });
        client.connect(options);
    }

    //this adds the plots to the chart
    function plot(point, chartno) {
        console.log(point);

        var series = chart.series[0],
            shift = series.data.length > 20; // shift if the series is
                                             // longer than 20

        console.log(chartno);
        // add the point
        chart.series[chartno].addPoint(point, true, shift);
    }

    //settings for the chart
    function draw_graphic() {
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'realtime_graph',
                defaultSeriesType: 'spline'
            },
            title: {
                text: 'Realtime data'
            },

            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150,
                maxZoom: 20 * 1000,
                title: {
                    text: 'DateTime',
                    margin: 10
                }
            },
            yAxis: {
                minPadding: 0.2,
                maxPadding: 0.2,
                title: {
                    text: 'SensorVal',
                    margin: 30
                }
            },
            series: []
        });
    }

    function typesensorReader(sensorid) {
        jsonData = {sensorid: sensorid};
        var result = "";
        $.ajax({
            url: "get_typesensor/",
            async: false,
            type: "GET",
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            data: jsonData,
            success: function (jsonResponse) {
                result = JSON.stringify(jsonResponse['typesensor']);

            },
            error: function () {
                result = "error";
            }
        });
        return result;
    }

    function getcheckedValues() {
        var favorite = [];
        $.each($("input[name='checkvalue']:checked"), function () {
            favorite.push($(this).val());
        });
        return favorite;
    }
});


