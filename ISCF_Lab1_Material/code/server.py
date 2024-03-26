import time
from fastapi import FastAPI
import json
import requests
from pydantic import BaseModel


address = "https://iscf1-68bf6-default-rtdb.europe-west1.firebasedatabase.app/"

class Item(BaseModel):
    x: float
    y: float | None = None
    z: float
    timestamp: float | None = None


app = FastAPI()
@app.post("/")
async def root1(lolada: Item):
    data = {
        "x": lolada.x,
        "y": lolada.y,
        "z": lolada.z,
        "timestamp": lolada.timestamp
    }  

    requests.post(f"{address}.json", data=json.dumps({"Data":data}))

    return lolada


