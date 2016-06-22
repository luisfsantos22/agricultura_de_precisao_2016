/**
 * Created by andre on 4/29/16.
 */
var jsonData = {};
$("#sensor-rows").hide();

$("#waspmote-rows").click(function () {
    $("#sensor-rows").toggle();
});

$(document).ready(function () {

    /*
     * Função que guarda o sensorId numa variavel json, para quando o utilizador submeter a form, o ajax
     * mande o sensorId para o python para saber que valores é que tem de ir buscar
     * Usage: Quando clickamos numa div da classe "sensor", vamos guarda o id dessa div numa variavel json
     * */
    $(".sensor").click(function () {
        $("#dash_geral").fadeOut("slow");
        $("#toolShow").show();
        $("#tableContainer").empty();
        $("#chartContainer").empty();

        var waspmoteId = $(this).parent().attr('id');
        var sensorId = $(this).attr('id').replace(/^\D+/g, '');
        var app_key = $(this).parents('div.appkeys').attr('id');
        typesensorReader(sensorId);
        if (jsonData.length == 1) {
            var app_key = {app_key: app_key};
            var waspmoteId = {waspmoteId: waspmoteId};
            var sensorIdJson = {sensorId: sensorId};
            jsonData.push(app_key);
            jsonData.push(waspmoteId);
            jsonData.push(sensorIdJson);
        }
        else {
            jsonData.app_key = app_key;
            jsonData.waspmoteId = waspmoteId;
            jsonData.sensorId = sensorId;
        }

    });

    $('#tableButton').click(function () {
        $('#date_pick').hide();
        $('#last100').attr("disabled", false);
        $('#last1000').attr("disabled", false);
        $('#customDay').attr("disabled", false);
        $('#customInterval').attr("disabled", false);
        $('#realTimeButton').attr("disabled", true);
        $('#chartContainer').hide();
        document.getElementById("tableContainer").style.display = "inline-block";
        document.getElementById("tableContainer").style.width = "50%";
        $('#tableContainer').show();
    });

    $('#graphButton').click(function () {
        $('#date_pick').hide();
        $('#last100').attr("disabled", false);
        $('#last1000').attr("disabled", false);
        $('#customDay').attr("disabled", false);
        $('#customInterval').attr("disabled", false);
        $('#realTimeButton').attr("disabled", false);
        $('#tableContainer').hide();
        document.getElementById("chartContainer").style.width = "80%";
    });

    //Last 100
    $("#last100").click(function () {
        emptycontainers();
        //GRAFICO
        if (document.getElementById('graphButton').checked) {
            $('#date_pick').empty();
            send100Data();
            $('#tableContainer').empty();
            $('#chartContainer').show();
        }
        //TABELA
        else if (document.getElementById('tableButton').checked) {
            $('#date_pick').empty();
            //send100Data();
            $('#chartContainer').empty();
            $('#tableContainer').show();
            f
        }
        //AMBOS
        else {
            $('#date_pick').empty();
            send100Data();
            $('#chartContainer').show();
            $('#tableContainer').show();
        }
    });

    //Last 1000
    $("#last1000").click(function () {
        emptycontainers();
        //GRAFICO
        if (document.getElementById('graphButton').checked) {
            $('#date_pick').empty();
            send1000Data();
            $('#tableContainer').empty();
            $('#chartContainer').show();
        }
        //TABELA
        else if (document.getElementById('tableButton').checked) {
            $('#date_pick').empty();
            //send100Data();
            $('#chartContainer').empty();
            $('#tableContainer').show();
            f
        }
        //AMBOS
        else {
            $('#date_pick').empty();
            send1000Data();
            $('#chartContainer').show();
            $('#tableContainer').show();
        }
    });

    //CUSTOM DAY PICKER
    $('#customDay').click(function () {
        $('#datepickIN').hide();
        $('#datepickFI').hide();
        $('#chartContainer').hide();
        $('#date_pick').show();
        $('#datepickD').show();

        $("#datepickerday").datepicker({
            changeMonth: true,
            changeYear: true
        });
    });

    //CUSTOM INTERVAL PICKER
    $('#customInterval').click(function () {
        $('#date_pick').show();
        $('#datepickD').hide();
        $('#chartContainer').hide();
        $('#datepickIN').show();
        $("#datepickerinit").datepicker({
            changeMonth: true,
            changeYear: true
        });
        $('#datepickFI').show();
        $("#datepickerfinal").datepicker({
            changeMonth: true,
            changeYear: true
        });
    });

    function draw_graphic(values, text) {
        var xValues = [];
        var yValues = [];
        var ano = [];
        var mes = [];
        var dia = [];
        var hours = [];
        var minutes = [];
        var seconds = [];
        var tempoTratado = [];

        for (var i = 0; i < values.length; i++) {
            xValues[i] = values[i]['fields']['timestamp'];
            yValues[i] = values[i]['fields']['value'];
        }

        //2016-04-25T14:54:20.991Z

        for (var i = 0; i < xValues.length; i++) {
            tempoTratado[i] = xValues[i].split(/[-,:.T]/);
        }

        for (var i = 0; i < xValues.length; i++) {
            ano[i] = parseInt(tempoTratado[i][0]);
            mes[i] = parseInt(tempoTratado[i][1]);
            dia[i] = parseInt(tempoTratado[i][2]);
            hours[i] = parseInt(tempoTratado[i][3]);
            minutes[i] = parseInt(tempoTratado[i][4]);
            seconds[i] = parseInt(tempoTratado[i][5]);
        }

        var dataP = [];
        for (var i = 0; i < yValues.length; i++) {
            dataP.push({x: new Date(ano[i], (mes[i] - 1), dia[i], hours[i], minutes[i], seconds[i]), y: yValues[i]});
        }

        var chart = new CanvasJS.Chart("chartContainer", {
            title: {
                text: text
            },

            axisX: {
                title: "TimeLine",
                valueFormatString: "D M Y hh",
                labelAngle: -20,
                gridThickness: 2,
                titleFontSize: 15
            },
            axisY: {
                title: typesensorname,
                gridThickness: 2,
                titleFontSize: 15
            },

            data: [
                {
                    type: "line",
                    dataPoints: dataP

                }
            ]
        });
        chart.render();
    }

    function typesensorReader(sensorid) {
        jsonData = {sensorid: sensorid};
        $.ajax({
            url: "get_typesensor/",
            type: "GET",
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            data: jsonData,
            success: function (jsonResponse) {
                typesensorname = jsonResponse['typesensor'];
            },
            error: function () {
                console.log("erro");
            }
        });
    }

    function send100Data() {
        $.ajax({
            url: "get_100values/",
            type: "GET",
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            data: jsonData,
            success: function (values) {
                var text = 'Últimos 100 valores do Sensor';
                console.log("success");
                draw_graphic(values, text);
            },
            error: function () {
                console.log("erro");
            }
        });
    }

    function send1000Data() {
        $.ajax({
            url: "get_1000values/",
            type: "GET",
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            data: jsonData,
            success: function (valuesmonth) {
                var text = 'Últimos 1000 valores do Sensor';
                console.log("success");
                draw_graphic(valuesmonth, text);
            },
            error: function () {
                console.log("erro");
            }
        });
    }

    $("#customDayB").click(function () {
        var dateObject = $('#datepickerday').datepicker("getDate");
        if (dateObject == null) {
            document.getElementById('errorText').style.display = "block";
            return false;
        }
        document.getElementById('errorText').style.display = "none";
        var dateObjectFinal = $.datepicker.formatDate("yy-mm-dd", dateObject)
        var aux = jsonData;
        aux.date = dateObjectFinal;
        $.ajax({
            type: 'GET',
            url: "get_customdayvalues",
            dataType: "json",
            data: aux,
            success: function (values) {
                var text = 'Valores do Sensor';
                emptycontainers();
                //GRAFICO
                if (document.getElementById('graphButton').checked) {
                    draw_graphic(values, text);
                    $('#tableContainer').empty();
                    $('#chartContainer').show();
                }
                //TABELA
                else if (document.getElementById('tableButton').checked) {
                    //send100Data();
                    $('#chartContainer').empty();
                    $('#tableContainer').show();
                }
                //AMBOS
                else {
                    draw_graphic(values, text);
                    $('#chartContainer').show();
                    $('#tableContainer').show();
                }
            },
            error: function (values) {
                console.log(values);
                console.log("erro no custom");
            }
        });
    });

    $("#customIntervalB").click(function () {
        var dateObjectInit = $('#datepickerinit').datepicker("getDate");
        var dateObjectInitFinal = $.datepicker.formatDate("yy-mm-dd", dateObjectInit)
        var dateObjectEnd = $('#datepickerfinal').datepicker("getDate");
        if (dateObjectInit == null || dateObjectEnd == null) {
            document.getElementById('errorTextInterval').style.display = "block";
            return false;
        }
        document.getElementById('errorTextInterval').style.display = "none";
        var dateObjectEndFinal = $.datepicker.formatDate("yy-mm-dd", dateObjectEnd)
        var aux2 = jsonData;
        aux2.dateini = dateObjectInitFinal;
        aux2.datefim = dateObjectEndFinal;
        $.ajax({
            type: 'GET',
            url: "get_customintervalvalues",
            dataType: "json",
            data: aux2,
            success: function (values) {
                var text = 'Valores do Sensor';
                emptycontainers();
                //GRAFICO
                if (document.getElementById('graphButton').checked) {
                    draw_graphic(values, text);
                    $('#tableContainer').empty();
                    $('#chartContainer').show();
                }
                //TABELA
                else if (document.getElementById('tableButton').checked) {
                    //send100Data();
                    $('#chartContainer').empty();
                    $('#tableContainer').show();
                }
                //AMBOS
                else {
                    draw_graphic(values, text);
                    $('#chartContainer').show();
                    $('#tableContainer').show();
                }
            },
            error: function (values) {
                console.log(values);
                console.log("erro");
            }
        });
    });
});

function emptycontainers() {
    $('#chartContainer').empty();
    $('#tableContainer').empty();
}