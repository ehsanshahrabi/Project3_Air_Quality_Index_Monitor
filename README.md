
# Project3
### Description
This project aims to create a web application for visualizing air quality data. It utilizes Flask, MongoDB, and JavaScript libraries, namely Leaflet, D3.js, and Plotly.js. The application retrieves air quality data from an external source, stores it in a MongoDB database and a JSON file, then provides interactive visualizations.
Scraping City Names.

### Scrape city names:
1.  Sends a GET request to the website "https://aqicn.org/city/all/" using the requests.get().
2. Creates a BeautifulSoup object named soup to parse the HTML content of the response. 
3. Finds a specific ``<div>`` element with the class ``main-cities`` using the ``find()`` method on the soup object. This locates the container that holds the desired information.
4. Uses the ``find_all()`` method on the container object to find all the ``<a>`` elements within the container. These elements represent the cities.
5. Extracts the text from each city element, removes leading and trailing spaces using ``.strip()``, and stores them in a list called cities.
6. Creates a DataFrame called ``cities_df`` using ``pd.DataFrame()`` with the cities list as the data and "City Name" as the column name.
7. Cleans the ``City Name`` column in the cities_df DataFrame by removing parentheses using the ``str.replace()`` method with a regular expression pattern.
8. Converts the "City Name" column in the DataFrame to a list called ``cities_list``.

### Creating our DataBase:
1. Create a connection to the local MongoDB server using ``MongoClient('mongodb://localhost:27017/')``.
2. Selects the "air_quality" database and "air_quality" collection using ``client['air_quality']`` and ``db['air_quality']``, respectively.
3. Defines two base URLs: ``base_url_cities_1`` and ``base_url_cities_0``. These URLs will be used to construct the *API endpoint* URLs for retrieving air quality data for each city. 
4. Iterates over each city in ``cities_list`` and constructs the complete API URL using the base URLs and the city name. Sends a GET request to the constructed URL using ``requests.get()``, and parses the response as JSON using ``.json()``.
5. Checks if the response status is "ok" using ``response_cities['status']``. If it is, inserts the response data into the MongoDB collection using collection.insert_one(response_cities).
6. With the data_extract.ipynb code, generate a JSON file mimicking a MongoDB database structure, facilitating visualization for the Second and Third Views.

### Setting up the Flask web application. 
 Here we set up a Flask web application that interacts with a MongoDB database to retrieve air quality data and display it on a map.

1. Libraries:
    1.1 ``Flask`` and ``render_template`` from flask: ``Flask`` is a web framework for Python, and ``render_template`` is used to render HTML templates.
    1.2 json: Used for working with JSON data.
    1.3 MongoClient from pymongo: Used for connecting to MongoDB.
2. Establish a connection to the MongoDB database: The code establishes a connection to the MongoDB server running on localhost at port 27017 and selects the ``air_quality_status`` database and ``air_quality_status`` collection.

3. Create a Flask application object: The code creates a Flask application object named ``app`` using ``Flask(__name__, static_folder='.', static_url_path='')``. The ``static_folder`` and ``static_url_path`` parameters are set to allow serving static files (like HTML, CSS, and JavaScript) from the root directory.

3. Define routes and view functions:

    3.1 ``@app.route('/map')`` defines a route for ``/map``. The associated view function, ``map_route()``, retrieves the air quality data from the database and formats it as a list of coordinates (latitude, longitude, AQI). It then passes the coordinates to the ``map.html`` template for rendering.
    3.2 ``@app.route('/index')`` defines a route for ``/index``. The associated view function, ``index()``, returns the ``index.html`` file from the `*static files* directory.
    3.3 ``@app.route('/')`` defines a route for the root URL ``(/)``. The associated view function, ``home()``, renders the ``home.html`` template.
4. Start the Flask application: The code uses ``app.run()`` to start the Flask application. When executed directly (if __name__ == '__main__':), the app.run() line ensures that the application is started only if the script is run directly and not imported as a module.

In summary, this code sets up a Flask application with three routes: ``/map``, ``/index``, and ``/``. The ``/map`` route retrieves `*air quality data from a MongoDB database*, formats it as coordinates, and passes it to the ``map.html`` template. The ``/index`` route returns the ``index.html`` file, and the ``/`` route renders the ``home.html`` template.

### Visualizing our map
![map](https://github.com/ehsanshahrabi/Project3_Air_Quality_Index_Monitor/assets/124327258/76b62f24-1061-4bab-9d0b-82a46415389b)

1. HTML Structure: The code defines the basic structure of an HTML document using <html>, <head>, and <body> tags.

2. Title and Stylesheet: The <title> tag sets the title of the HTML page to "Map". The <link> tag references a CSS stylesheet from a CDN (https://unpkg.com/leaflet/dist/leaflet.css) to style the map and legend.

3. Map Container: The <div> tag with id="map" is a placeholder for the map. The map will be rendered inside this container.

4. JavaScript Libraries: The <script> tag references two JavaScript libraries from a CDN `"https://unpkg.com/leaflet/dist/leaflet.js" 
    These libraries provide the functionality to create and interact with the map.
5. JavaScript Code: The JavaScript code within the <script> tags performs the following actions:

    5.1.Retrieve data from ``Flask``: The code uses the ``{{ coordinates | tojson }}`` template variable to get the *coordinates* and *metrics* data from Flask. The data is assigned to the *data* variable.

    5.6 Format Data: The coordinates and metrics *arrays* are created by extracting the corresponding values from the data array.

    5.7 Create the Map: The ``L.map()`` function creates a new map object with the specified ``ID`` ``('map')`` and initial view coordinates ([51.505, -0.09]).

    5.8 Add Tile Layer: The ``L.tileLayer()`` function adds a tile layer to the map using ``OpenStreetMap`` as the source. The tile layer is configured with the necessary options, such as attribution and maximum zoom level.

    5.9 Define Color Range: The ``getColor()`` function takes a metric value as input and returns a color based on a predefined range. The *colors* correspond to different *air pollution levels*.

    5.10 Create Legend: The ``L.control()`` function creates a new control object for the legend, positioned at the bottom left. The ``onAdd`` method is overridden to create the HTML content of the legend, including the color-coded labels for each pollution level.

    5.10 Add Legend to Map: The ``addTo()`` method is used to add the legend control to the map.

    5.11 Add Markers to the Map: The *for loop* iterates over the coordinates array and adds circle markers to the map for each coordinate. The *marker's color* is determined based on the corresponding *metric value*. The marker's radius, fill color, and opacity are set based on the pollution level. The metric value is displayed as a tooltip on the marker.

    5.11 Closing Tags: The closing </script>, </body>, and </html> tags complete the HTML document.

Overall, this HTML template uses JavaScript and the Leaflet library to render a map and visualize air quality data using circle markers and a legend. The data is obtained from Flask and dynamically displayed on the map based on the pollution level.

### Visualizing the Second and Third Views
 ![datavisualizations](https://github.com/ehsanshahrabi/Project3_Air_Quality_Index_Monitor/assets/124327258/ade1d880-9657-40a9-b8d5-6c6f0e328ce3)
 
For visualizing the air quality data, the app.js file uses D3.js and Plotly.js libraries. It displays current air quality index and a forecast for PM2.5 maximum and minimum values.
The following functionality is provided by the code:
 
1- The sortCities function sorts cities based on the selected option.
 
2- The updatePlots function updates plots based on the selected city.
 
3- The createView2 function creates the view for the forecast of PM2.5 maximum and minimum values.
 
4- Event listeners are set up for changes in the city selection and sorting option.
 
5- The d3.json function retrieves the air quality data from the JSON file.
 
6- The retrieved data populates the dropdown menus with city options.
 
7- The updatePlots and createView2 functions are called initially and whenever the city selection or sorting option changes.
 
8- Plotly.js library is used to create the plots and display them in the designated <div> elements in the HTML.
 
In addition, the code also provides a table displaying daily AQI levels.
 
### Visualizing the Fourth Views:
 ![20mostpolluted](https://github.com/ehsanshahrabi/Project3_Air_Quality_Index_Monitor/assets/124327258/bd98ed61-fc51-41e7-9733-3e85e94bfe1f)
In this view we have 20 most pulloted city that powered by Java Script and potly.



