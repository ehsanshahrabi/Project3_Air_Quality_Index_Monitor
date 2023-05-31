import requests
from bs4 import BeautifulSoup
import pandas as pd
from splinter import Browser
from flask_pymongo import PyMongo
import flask
import json
import time

# Send a GET request to the website
url = "https://aqicn.org/city/all/"

response = requests.get(url)
# Create a BeautifulSoup object to parse the HTML content
soup = BeautifulSoup(response.content, "html.parser")
container = soup.find("div", class_="main-cities")
city_elements = container.find_all("a")
cities = [city_element.text.strip() for city_element in city_elements]
cities_df = pd.DataFrame(cities, columns=["City Name"])
cities_df['City Name'] = cities_df['City Name'].str.replace(r'\s+\(.*\)', '', regex=True)
cities_list = cities_df["City Name"].tolist()
base_url_cities_0 = "http://api.waqi.info/feed/"
base_url_cities_1 = "/?token=cfec51e63370e90b7880950705e8add14a2602b6"
base_url_citydata_0 = "http://api.airvisual.com/v2/city?city="

for x in cities_list:
    base_url_cities = base_url_cities_0 + x + base_url_cities_1
    params = {
        "param":"pm25",
        "value":"true"
        
    }
    response_cities = requests.get(base_url_cities, params=params).json()
    # print(json.dumps(response_cities, indent=4))
    #Storage the data into a MongoDB database
from pymongo import MongoClient
#Establish the MongoDB server
client = MongoClient('mongodb://localhost:27017/')
#Create a database
db = client['major_cities_airq']
#Prepare the data to be inserted into the collection
airquiality = {
    'aqi': response_cities['data']['aqi'],
    'idx': response_cities['data']['idx'],
    'attributions': response_cities['data']['attributions'],
    'city_geo': response_cities['data']['city']['geo'],
    'city_name': response_cities['data']['city']['name'],
    'dominant_pol': response_cities['data']['dominentpol'],
    'iaqi': response_cities['data']['iaqi'],
    'time': response_cities['data']['time'],
    'forecast': response_cities['data']['forecast']}
#Insert the data into the collection
collection.insert_one(airquiality)
app = flask.Flask(__name__)
@app.route("/add_one")
def add_one():
    collection.insert_one({
    'aqi': response_cities['data']['aqi'],
    'idx': response_cities['data']['idx'],
    'attributions': response_cities['data']['attributions'],
    'city_geo': response_cities['data']['city']['geo'],
    'city_name': response_cities['data']['city']['name'],
    'dominant_pol': response_cities['data']['dominentpol'],
    'iaqi': response_cities['data']['iaqi'],
    'time': response_cities['data']['time'],
    'forecast': response_cities['data']['forecast']    
})
    return flask.jsonify(message="success")
if __name__ == '__main__':
    app.run()
# client.close()