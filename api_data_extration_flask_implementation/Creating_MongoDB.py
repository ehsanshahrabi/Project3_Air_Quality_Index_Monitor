#!/usr/bin/env python
# coding: utf-8

# In[1]:


import requests
from bs4 import BeautifulSoup
import pandas as pd
from splinter import Browser
from flask_pymongo import PyMongo
import flask


# In[2]:


# Send a GET request to the website
url = "https://aqicn.org/city/all/"

response = requests.get(url)


# In[3]:


# Create a BeautifulSoup object to parse the HTML content
soup = BeautifulSoup(response.content, "html.parser")


# In[4]:


container = soup.find("div", class_="main-cities")


# In[5]:


city_elements = container.find_all("a")


# In[6]:


cities = [city_element.text.strip() for city_element in city_elements]


# In[7]:


cities_df = pd.DataFrame(cities, columns=["City Name"])
cities_df


# In[8]:


cities_df.info()


# In[9]:


#Removing parenthesis form the City Name column
cities_df['City Name'] = cities_df['City Name'].str.replace(r'\s+\(.*\)', '', regex=True)
cities_df


# In[10]:


cities_list = cities_df["City Name"].tolist()


# In[11]:


print(cities_list)


# In[12]:


import json
import time


# In[18]:


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
    print(json.dumps(response_cities, indent=4))


# In[19]:


#Storage the data into a MongoDB database
from pymongo import MongoClient


# In[20]:


#Establish the MongoDB server
client = MongoClient('mongodb://localhost:27017/')


# In[21]:


#Create a database
db = client['major_cities_airq']
print(db)


# In[22]:


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
    'forecast': response_cities['data']['forecast']
    
}


# In[23]:


# Create a collection
collection = db['air_quality_data']


# In[24]:


#Insert the data into the collection
collection.insert_one(airquiality)


# In[25]:


app = flask.Flask(__name__)


# In[26]:
@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/database<br/>"
        f"/maps"
        f"/graphs"
    )


@app.route("/database")
def database():
    collection.insert_many({
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


# In[ ]:


if __name__ == '__main__':
    app.run()


# In[ ]:


client.close()


# In[ ]:




