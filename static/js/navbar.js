/**
 * Created by Luis on 29/05/2016.
 */
$(document).ready(function () {

    //Div with waspmotes view
    $("#waspView").click(function () {
        //Checker no dropbox
        $('#waspView > i').css('visibility', 'visible');
        $('#sensorView > i').css('visibility', 'hidden');
        //Check if div is with sensor. If is true, hide it
        if ($('#appk').css('display') == "none") {
            $('#appk').css('display', 'block');
            $('#appk').css('visibility', 'visible');
        }

        if ($('#sensorDiv').css('display') == "block") {
            $('#sensorDiv').css('display', 'none');
            $('#sensorDiv').css('visibility', 'hideen');
        }
    });

//Div with sensors view
    $("#sensorView").click(function () {
        //Checker no dropbox
        $('#sensorView > i').css('visibility', 'visible');
        $('#waspView > i').css('visibility', 'hidden');
        //Check if div is with wasp. If is true, hide it
        if ($('#sensorDiv').css('display') == "none") {
            $('#sensorDiv').css('display', 'block');
            $('#sensorDiv').css('visibility', 'visible');
        }

        if ($('#appk').css('display') == "block") {
            $('#appk').css('display', 'none');
            $('#appk').css('visibility', 'hideen');
        }
    });
});

//list Sensors collapse
$(".listSens").click(function () {
    //$(".listSens").innerHTML += ;
});