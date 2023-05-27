from flask import Flask, jsonify
import json

app = Flask(__name__)

# Loading the data from your JSON file into a Python dictionary
with open('aqi_data_ok_status.json', 'r') as f:
    data = json.load(f)


@app.route('/', methods=['GET'])
def get_data():
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)
