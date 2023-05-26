from flask_pymongo import PyMongo
import flask
from flask import Flask, render_template, jsonify

# We create our Flask app object:
app = flask.Flask(__name__)

# Enable CORS for all routes
@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

#Tie our application to the MongoDB Instance:
mongodb_client = PyMongo(app, uri="mongodb://localhost:27017/air_quality_status")
db = mongodb_client.db

#
app.config["MONGO_URI"] = "mongodb://localhost:27017/air_quality_status"
mongodb_client = PyMongo(app)
db = mongodb_client.db


# Home screen

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"/Database<br/>"
    )


#Retrieving Data From the Database
@app.route("/Database")
def home():
    fields= {'data'}
    air_quality_status = db.air_quality_status.find(projection = fields )

    air = [ airq['data'] for airq in air_quality_status]
    print(len(air))
    return  flask.jsonify(air)

if __name__ == '__main__':
    app.run(debug=True)