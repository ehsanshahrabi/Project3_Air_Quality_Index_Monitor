from flask import Flask, render_template, jsonify
import flask
from pymongo import MongoClient
import os
import json

# Replace the connection string and database name with your own
client = MongoClient("mongodb://localhost:27017/air_quality_status")
db = client["air_quality_status"]
collection = db["air_quality_status"]

#We create our Flask app object:
app = flask.Flask(__name__,static_folder='.', static_url_path='')



@app.route("/about")
def about():
    return render_template("about.html")

@app.route('/map')
def map_route():
    # Retrieve the data from the database
    data = collection.find()
    coordinates = [(record['data']['city']['geo'][0], record['data']['city']['geo'][1], record['data']['aqi']) for record in data]
    
    # Pass the coordinates to the frontend
    return render_template('map.html', coordinates=coordinates)



@app.route("/index")
def index():
    return app.send_static_file('index.html')

@app.route("/")
def home():
    
    return render_template('home.html')


if __name__ == '__main__':
    app.run()