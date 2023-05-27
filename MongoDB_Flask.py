#We want to connect our MongoDB instance to the Flask application. 
from flask_pymongo import PyMongo
import flask
from flask import Flask, render_template, jsonify
import json
from bson import ObjectId
import re

    
#We create our Flask app object:
app = flask.Flask(__name__)

#Tie our application to the MongoDB Instance:
mongodb_client = PyMongo(app, uri="mongodb://localhost:27017/air_quality_status")
db = mongodb_client.db

#
app.config["MONGO_URI"] = "mongodb://localhost:27017/air_quality_status"
mongodb_client = PyMongo(app)
db = mongodb_client.db

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/about")
def about():
    return render_template("about.html")

#Retrieving Data From the Database
@app.route("/data")
def data():
    fields= {'data'}
    air_quality_status = db.air_quality_status.find(projection = fields )

    air = [ airq['data'] for airq in air_quality_status]
    print(len(air))
    return  flask.jsonify(air)
@app.route('/cityname')
def cityname():
    fields = {'data.city.name': 1}
    citynames = db.air_quality_status.find({},fields)
    thecityname = [re.sub(r'(?<!\w\\)\s*\([^)]*\)', '', n['data']['city']['name']) for n in citynames]
    print(len(thecityname))
    return  flask.jsonify(thecityname)

if __name__ == '__main__':
    app.run(debug=True)