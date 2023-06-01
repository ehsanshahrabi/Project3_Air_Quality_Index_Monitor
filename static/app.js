let dropdownCity = d3.selectAll("#citySelect");
let dropdownSorted = d3.selectAll("#sortSelect");
let plotsDiv = d3.selectAll("#plots");
let view2Div = d3.selectAll("#view2");

// Function to sort cities based on the selected sorting option
function sortCities(data, sortOption) {
    let cities = Object.keys(data);
    switch (sortOption) {
        case "pollutedToCleanest":
            cities.sort((a, b) => data[b].data.aqi - data[a].data.aqi);
            break;
        case "cleanestToPolluted":
            cities.sort((a, b) => data[a].data.aqi - data[b].data.aqi);
            break;
        case "aToZ":
            cities.sort();
            break;
        case "zToA":
            cities.sort().reverse();
            break;
        default:
            cities.sort();
            break;
    }
    return cities;
}

// Get data
d3.json("/data/aqi_data_ok_status.json").then((data) => {
    let cities = sortCities(data, dropdownSorted.property("value")); // Sort cities based on the selected sorting option

    cities.forEach((city) => {
        dropdownCity.append("option").text(city).property("value", city);
    });

    dropdownCity.on("change", () => {
        updatePlots();
        createView2();
    });

    dropdownSorted.on("change", () => {
        let sortOption = dropdownSorted.property("value");
        cities = sortCities(data, sortOption); // Sort cities based on the selected sorting option
        dropdownCity.html(""); // Clear previous city options
        cities.forEach((city) => {
            dropdownCity.append("option").text(city).property("value", city);
        });
        updatePlots();
        createView2();
    });

    function updatePlots() {
        let selectedCity = dropdownCity.property("value");
        let cityData = data[selectedCity].data;

        if (cityData) {
            plotsDiv.html(""); // Clear previous plots

            let iaqiData = cityData.iaqi;
            let pollutantKeys = Object.keys(iaqiData).filter(
                (key) => !["h", "p", "t", "w", "dew", "wg", "wd", "r", "d"].includes(key)
            );
            let pollutantValues = pollutantKeys.map((key) => iaqiData[key].v);
            let colorValues = pollutantValues.map((value) => {
                if (value <= 50) return "#61d17d";
                if (value <= 100) return "#f3f367";
                if (value <= 150) return "#f5cb6a";
                if (value <= 200) return "#eb505c";
                if (value <= 300) return "#79528d";
                return "#794553";
            });

            let plotData = {
                x: pollutantKeys,
                y: pollutantValues,
                type: "bar",
                marker: { color: colorValues },
            };

            let layout = {
                title: `Current Air Quality Index - ${selectedCity}`, // Update the plot title with the selected city
                xaxis: { title: "Pollutant" },
                yaxis: { title: "Value" },
            };

            Plotly.newPlot("plots", [plotData], layout);
        }
    }

    function createView2() {
        let selectedCity = dropdownCity.property("value");
        let cityData = data[selectedCity].data;

        if (cityData) {
            view2Div.html(""); // Clear previous content

            let dailyAQIData = cityData.forecast.daily;
            let pm25maxData = dailyAQIData.pm25;
            let pm25minData = dailyAQIData.pm25;

            let xData = pm25maxData.map((d) => d.day);
            let pm25maxValues = pm25maxData.map((d) => d.max);
            let pm25minValues = pm25minData.map((d) => d.min);

            let trace1 = {
                x: xData,
                y: pm25maxValues,
                type: "scatter",
                mode: "lines", // Use 'lines' mode instead of 'markers+lines'
                name: "PM2.5-Max",
                line: { color: "blue" },
            };

            let trace2 = {
                x: xData,
                y: pm25minValues,
                type: "scatter",
                mode: "lines", // Use 'lines' mode instead of 'markers+lines'
                name: "PM2.5-Min",
                line: { color: "green" },
            };

            let layout = {
                title: "Forecast PM2.5 Maximun and Minimum",
                xaxis: {
                    title: "Date",
                    tickformat: "%Y-%m-%d", // Set the tick format to display only the date
                },
                yaxis: { title: "Average AQI Value" },
                width: 800, // Set the desired width for the plot
                margin: {
                    l: 50,
                    r: 50,
                    t: 50,
                    b: 50,
                },
                shapes: [
                    // Add four horizontal lines with pollutantValue color and range
                    {
                        type: "line",
                        x0: xData[0],
                        x1: xData[xData.length - 1],
                        y0: 2,
                        y1: 2,
                        line: { color: "#3DC95E", width: 2, dash: "dash" },
                    },
                    {
                        type: "line",
                        x0: xData[0],
                        x1: xData[xData.length - 1],
                        y0: 51,
                        y1: 51,
                        line: { color: "#FDFD6F", width: 2, dash: "dash" },
                    },
                    {
                        type: "line",
                        x0: xData[0],
                        x1: xData[xData.length - 1],
                        y0: 101,
                        y1: 101,
                        line: { color: "#FFC43B", width: 2, dash: "dash" },
                    },
                    {
                        type: "line",
                        x0: xData[0],
                        x1: xData[xData.length - 1],
                        y0: 151,
                        y1: 151,
                        line: { color: "#FE4B5A", width: 2, dash: "dash" },
                    },
                ],
            };

            Plotly.newPlot("view2", [trace1, trace2], layout); // Call Plotly.newPlot after setting layout and traces
        }
    }

    updatePlots();
    createView2();
});