from flask import Flask, render_template, jsonify
import json
import os

app = Flask(__name__, static_folder='.', static_url_path='')

# Loading the data from your JSON file into a Python dictionary
with open(os.path.join('data', 'aqi_data_ok_status.json'), 'r') as f:
    data = json.load(f)


@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify(data)


@app.route("/")
def index():
    return app.send_static_file('index.html')


if __name__ == '__main__':
    app.run(debug=True)
