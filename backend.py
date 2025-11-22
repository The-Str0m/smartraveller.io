import requests
import time
from datetime import datetime

url = "http://data.itsfactory.fi/journeys/api/1/gtfs-rt/vehicle-positions/json"

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    'Accept': 'application/json'
}

while True:
    data = requests.get(url, headers=headers).json()
    for vehicle in data.get("entity", []):
        vehicle_position = vehicle["vehicle"]["position"]
        vehicle_id = vehicle["vehicle"]["vehicle"]["id"]
        print(f"  {vehicle_id}: {vehicle_position['latitude']}, {vehicle_position['longitude']}")
    time.sleep(3)
