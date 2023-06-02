### AQI Data Visualization Web Application - ehsan branch
This web application visualizes the Air Quality Index (AQI) of cities around the world based on data collected from the World Air Quality Index Project (https://aqicn.org/).
The web app allows users to select a city and view the current AQI, along with a forecast of PM2.5 Max and Min. The cities can be sorted alphabetically, from cleanest to most polluted, and vice versa.

### Structure
The project is structured as follows:

app.js: This JavaScript file handles all the front-end logic. This includes fetching the AQI data, handling user interaction, and creating the visualization using D3.js and Plotly.js.

index.html: This is the main HTML file which provides the structure of the web page. It includes the layout and the DOM elements that app.js manipulates.

app.py: This is the Python Flask server that serves the index.html file and provides an API endpoint to access the AQI data.

aqi_data_ok_status.json: This JSON file contains the cleaned and filtered AQI data that was extracted from the World Air Quality Index Project using data_extract.ipynb script.

### Data Collection and Cleaning
The data was scraped from the World Air Quality Index Project using BeautifulSoup. After scraping the data, extensive cleaning was performed to ensure accuracy and uniformity. I removed any entries from the dataset that had a status other than 'ok', ensuring high quality of the data. Once cleaned, the data was saved into a JSON file aqi_data_ok_status.json, ready to be consumed by the Flask server and the front-end.

### Working
![datavisualizations](https://github.com/ehsanshahrabi/Project3_Air_Quality_Index_Monitor/assets/124327258/0507eb77-4fc0-44ad-bd34-27f9acd313be)

The application allows the user to select a city and a sorting method from the dropdown lists in the webpage. Based on the selection, two visualizations are updated. 

1. **Current Air Quality Index**: A bar plot representing the current AQI values of pollutants for the selected city.

2. **Forecast For PM2.5 Max and Min**: A line plot representing the forecasted maximum and minimum PM2.5 levels for the selected city.

Note
This project is for educational purposes only and does not provide real-time AQI data. For real-time data, please refer to the official AQI website or other reliable resources.

### This branch and the code implementation were done by Ehsan Shahrabi. The web application showcases Ehsan's expertise and dedication in creating a functional and informative data visualization tool for the Air Quality Index.

