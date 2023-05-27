// Fetching data from our API
d3.json("/api/data").then(data => {
    // Creating an array of all city names for our dropdown
    var cityNames = Object.keys(data);

    // Populating our dropdown with city names
    var citySelect = d3.select("#citySelect");
    cityNames.forEach(city => {
        citySelect.append("option").text(city);
    });

    // Function to create plots for a given city
    var createPlots = city => {
        var cityData = data[city].data;

        // Clearing any existing plots
        d3.select("#plots").html("");

        // Prepare pollutant data
        var pollutants = cityData.iaqi;
        delete pollutants.p;  // do not show "p" values in charts

        var names = Object.keys(pollutants);
        var values = Object.values(pollutants).map(d => d.v);

        // Create AQI bar chart
        var aqiColor;
        if (cityData.aqi <= 50) aqiColor = 'green';
        else if (cityData.aqi <= 100) aqiColor = 'yellow';
        else if (cityData.aqi <= 150) aqiColor = 'orange';
        else aqiColor = 'red';

        var trace1 = {
            x: ['AQI'],
            y: [cityData.aqi],
            type: 'bar',
            marker: {
                color: aqiColor
            }
        };
        var layout1 = {
            title: 'AQI'
        };
        Plotly.newPlot('plots', [trace1], layout1);

        // Create pollutants bar chart
        var trace2 = {
            x: names,
            y: values,
            type: 'bar'
        };
        var layout2 = {
            title: 'Pollutants'
        };
        Plotly.newPlot('plots', [trace2], layout2);
    };

    // Creating plots for the first city by default
    createPlots(cityNames[0]);

    // Updating plots whenever a different city is selected
    citySelect.on("change", function () {
        var selectedCity = this.value;
        createPlots(selectedCity);
    });
});
