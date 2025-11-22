import requests
import time
import threading
from flask import Flask, jsonify

app = Flask(__name__)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response

url = "http://data.itsfactory.fi/journeys/api/1/gtfs-rt/vehicle-positions/json"

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    'Accept': 'application/json'
}

bus_data = []

@app.route('/buses')
def buses():
    global bus_data
    return jsonify(bus_data)

def update_vehicle_data():
    global bus_data
    while True:
        try:
            data = requests.get(url, headers=headers).json()
            vehicles = []
                
            for vehicle in data.get("entity", []):
                vehicle_position = vehicle["vehicle"]["position"]
                vehicle_id = vehicle["vehicle"]["vehicle"]["id"]
                lat = vehicle_position['latitude']
                lng = vehicle_position['longitude']
                    
                vehicles.append({
                    "id": vehicle_id,
                    "lat": lat,
                    "lng": lng
                })        
            bus_data = vehicles
        except Exception as e:
            print(f"error {e}")
        time.sleep(2)

update_thread = threading.Thread(target=update_vehicle_data, daemon=True)
update_thread.start()

if __name__ == '__main__':
    PORT = 8080
    app.run(debug=True, host='127.0.0.1', port=PORT, threaded=True)
