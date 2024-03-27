import sim
import time 
import requests 
import json  

from fastapi import FastAPI


localHost = "http://127.0.0.1:8000/"



# global configuration variables
clientID=-1



# Helper function provided by the teaching staff
def get_data_from_simulation(id):
    """Connects to the simulation and gets a float signal value

    Parameters
    ----------
    id : str
        The signal id in CoppeliaSim

    Returns
    -------
    data : float
        The float value retrieved from the simulation. None if retrieval fails.
    """
    if clientID!=-1:
        res, data = sim.simxGetFloatSignal(clientID, id, sim.simx_opmode_blocking)
        if res==sim.simx_return_ok:
            return data
    return None

class DataCollection():
    def __init__(self):
        pass   
         

    address = "https://iscf1-68bf6-default-rtdb.europe-west1.firebasedatabase.app/"
    def run(self):
        while True:
            data = {
                "x": None,
                "y": None,
                "z": None,
                "timestamp": time.time()
            }    
            
            
            x = get_data_from_simulation("accelX")            
            if x is not None:
                data["x"] = x
            
            y = get_data_from_simulation("accelY")
            if y is not None:
                data["y"] = y

            z = get_data_from_simulation("accelZ")
            if z is not None:
                data["z"] = z
            
            print(data)
            
            
            print(requests.post(localHost,json.dumps(data)))
            
            time.sleep(1)

    

if __name__ == '__main__':
    sim.simxFinish(-1) # just in case, close all opened connections
    clientID=sim.simxStart('127.0.0.1',19997,True,True,5000,5) # Connect to CoppeliaSim
    if clientID!=-1:
        data_collection = DataCollection()
        data_collection.run()      
    else:
        exit()
    