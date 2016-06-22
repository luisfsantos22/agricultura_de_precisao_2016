//Average graphic and Status count graphic
window.onload = function () {
    var chart1 = new CanvasJS.Chart("columnChart", {
        title: {
            text: "Average Sensors Value"
        },
        animationEnabled: true,   // change to true
        data: [
            {
                // Change type to "bar", "area", "spline", "pie",etc.
                type: "column",
                dataPoints: [
                    {label: "Soil Temperature", y: 20},
                    {label: "Soil Humidity", y: 12},
                    {label: "No2", y: 0.3},
                    {label: "No2", y: 0.2},
                    {label: "Luminosity", y: 54}
                ]
            }
        ]
    });
    chart1.render();


    var chart2 = new CanvasJS.Chart("statusChart", {
        title: {
            text: "Global Status Sensor"
        },
        animationEnabled: true,
        data: [  //array of dataSeries
            { //dataSeries - first quarter
                /*** Change type "column" to "bar", "area", "line" or "pie"***/
                type: "column",
                name: "status green",
                color: "green",
                dataPoints: [
                    {label: "Soil Temperature", y: 6},
                    {label: "Soil Humidity", y: 7},
                    {label: "No2", y: 4},
                    {label: "No2", y: 3},
                    {label: "Luminosity", y: 8}
                ]
            },
            { //dataSeries - second quarter

                type: "column",
                name: "status yellow",
                color: "yellow",
                dataPoints: [
                    {label: "Soil Temperature", y: 2},
                    {label: "Soil Humidity", y: 3},
                    {label: "No2", y: 3},
                    {label: "No2", y: 5},
                    {label: "Luminosity", y: 2}
                ]
            },
            { //dataSeries - third quarter

                type: "column",
                name: "status red",
                color: "red",
                dataPoints: [
                    {label: "Soil Temperature", y: 2},
                    {label: "Soil Humidity", y: 0},
                    {label: "No2", y: 3},
                    {label: "No2", y: 2},
                    {label: "Luminosity", y: 0}
                ]
            }
        ]
    });
    chart2.render();
//temperature average by month
    var chart3 = new CanvasJS.Chart("chartTemperature", {

        title: {
            text: "Temperature Average by Month"
        },
        animationEnabled: true,
        data: [
            {
                type: "stepArea",

                dataPoints: [

                    {x: new Date(2016, 01), y: 12.00},
                    {x: new Date(2016, 02), y: 18.50},
                    {x: new Date(2016, 03), y: 15.00},
                    {x: new Date(2016, 04), y: 11.50},
                    {x: new Date(2016, 05), y: 16.75},
                    {x: new Date(2016, 06), y: 19.30},
                    {x: new Date(2016, 07), y: 22.80},
                    {x: new Date(2016, 08), y: 27.50},
                    {x: new Date(2016, 09), y: 22.75},
                    {x: new Date(2016, 10), y: 19.30},
                    {x: new Date(2016, 11), y: 16.80},
                    {x: new Date(2016, 12), y: 14.50}
                ]
            }
        ]
    });
    chart3.render();

    //Reads by month
    var chart4 = new CanvasJS.Chart("chartReads",
        {

            title: {
                text: "Reads - per month"
            },
            animationEnabled: true,
            axisX: {
                valueFormatString: "MMM",
                interval: 1,
                intervalType: "month"
            },
            axisY: {
                includeZero: false

            },
            data: [
                {
                    type: "line",

                    dataPoints: [
                        {x: new Date(2012, 00, 1), y: 450},
                        {x: new Date(2012, 01, 1), y: 414},
                        {
                            x: new Date(2012, 02, 1),
                            y: 520,
                            indexLabel: "highest",
                            markerColor: "red",
                            markerType: "triangle"
                        },
                        {x: new Date(2012, 03, 1), y: 460},
                        {x: new Date(2012, 04, 1), y: 450},
                        {x: new Date(2012, 05, 1), y: 500},
                        {x: new Date(2012, 06, 1), y: 480},
                        {x: new Date(2012, 07, 1), y: 480},
                        {
                            x: new Date(2012, 08, 1),
                            y: 410,
                            indexLabel: "lowest",
                            markerColor: "DarkSlateGrey",
                            markerType: "cross"
                        },
                        {x: new Date(2012, 09, 1), y: 500},
                        {x: new Date(2012, 10, 1), y: 480},
                        {x: new Date(2012, 11, 1), y: 510}
                    ]
                }
            ]
        });

    chart4.render();
};