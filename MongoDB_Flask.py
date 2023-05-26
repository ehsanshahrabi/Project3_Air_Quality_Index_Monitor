#We want to connect our MongoDB instance to the Flask application. 
from flask_pymongo import PyMongo
import flask
import json
from bson import ObjectId

    
#We create our Flask app object:
app = flask.Flask(__name__)

#Tie our application to the MongoDB Instance:
mongodb_client = PyMongo(app, uri="mongodb://localhost:27017/air_quality_status")
db = mongodb_client.db

#
app.config["MONGO_URI"] = "mongodb://localhost:27017/air_quality_status"
mongodb_client = PyMongo(app)
db = mongodb_client.db

#Retrieving Data From the Database
@app.route("/")
def home():
    fields= {'data'}
    air_quality_status = db.air_quality_status.find(projection = fields )

    air = [ airq['data'] for airq in air_quality_status]
    print(len(air))
    return  flask.jsonify(air)

if __name__ == '__main__':
    app.run(debug=True)