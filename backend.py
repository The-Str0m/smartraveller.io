import requests
import time
import threading
from flask import Flask, jsonify
from pyproj import Transformer

app = Flask(__name__)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response


BUS_URL = "http://data.itsfactory.fi/journeys/api/1/gtfs-rt/vehicle-positions/json"
bus_headers = {
    'User-Agent': 'Mozilla/5.0',
    'Accept': 'application/json'
}

bus_data = []

@app.route('/buses')
def buses():
    return jsonify(bus_data)


def update_vehicle_data():
    global bus_data
    while True:
        try:
            data = requests.get(BUS_URL, headers=bus_headers).json()
            vehicles = []

            for vehicle in data.get("entity", []):
                pos = vehicle["vehicle"]["position"]
                vehicle_id = vehicle["vehicle"]["vehicle"]["id"]

                vehicles.append({
                    "id": vehicle_id,
                    "lat": pos["latitude"],
                    "lng": pos["longitude"]
                })

            bus_data = vehicles

        except Exception as e:
            print("Bus fetch error:", e)

        time.sleep(2)



STOP_URL = "https://geodata.tampere.fi/geoserver/joukkoliikenne/wfs"
STOP_PARAMS = {
    "service": "WFS",
    "version": "2.0.0",
    "request": "GetFeature",
    "typeNames": "joukkoliikenne:joli_bussi_ja_ratikkapysakit_gsview",
    "outputFormat": "application/json"
}

#converting finnish coordinates
transformer = Transformer.from_crs("EPSG:3067", "EPSG:4326", always_xy=True)

stops_data = []


def load_stops():
    global stops_data
    try:
        resp = requests.get(STOP_URL, params=STOP_PARAMS)
        data = resp.json()

        stops = []

        for f in data["features"]:
            x, y = f["geometry"]["coordinates"]
            lon, lat = transformer.transform(x, y)

            stops.append({
                "id": f["properties"]["tunniste"],
                "name": f["properties"]["nimi"],
                "lat": lat,
                "lng": lon,
                "municipality": f["properties"]["kunta"],
                "zone": f["properties"]["tariffivyohyke"],
            })

        stops_data = stops

    except Exception as e:
        print("stop download error - :", e)


@app.route('/stops')
def stops():
    return jsonify(stops_data)


load_stops()

update_thread = threading.Thread(target=update_vehicle_data, daemon=True)
update_thread.start()


if __name__ == '__main__':
    PORT = 8080
    app.run(debug=True, host='127.0.0.1', port=PORT, threaded=True)
