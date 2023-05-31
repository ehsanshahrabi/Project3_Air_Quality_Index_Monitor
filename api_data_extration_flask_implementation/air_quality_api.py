import requests as r
import csv
import heapq
import pandas as pd
from flask import Flask, jsonify

app = Flask(__name__)

def get_city_data(city):
    data = get_data(city)
    if 'data' in data and 'aqi' in data['data']:
        aqi = data['data']['aqi']
        if aqi is not None:
            aqi = int(aqi)
            return aqi, data
    return None

def get_data(city):
    api_url = "https://api.waqi.info/feed"
    token = "9fc32713a421a9e591b401b0c8fa559aff5205e8"
    response = r.get(f"{api_url}/{city}/?token={token}")
    if response.status_code == 200:
        data = response.json()
        if 'data' in data:
            return data
    return None

@app.route('/api/data/<city>', methods=['GET'])
def get_api_data(city):
    city_data = get_city_data(city)
    if city_data:
        return jsonify(city_data[1])
    else:
        return jsonify({"error": "No data available for the city."})

@app.route('/', methods=['GET'])
def index():
    return "Welcome to the API!"

@app.route('/favicon.ico')
def favicon():
    return app.send_static_file('favicon.ico')

if __name__ == '__main__':
    app.run(debug=True)

    city = "Beijing"  # Set the desired city name here
    if city:
        city_data = get_city_data(city)
        if city_data:
            data = city_data[1]['data']
            df = pd.DataFrame([data])
            filename = r'C:\Users\yukiz\Documents\Bootcamp\aq_output.csv'
            df.to_csv(filename, index=True)
