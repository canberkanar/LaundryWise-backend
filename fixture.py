# CREATE MOCK-UP DATA BY CALLING API ENDPOINTS
# author: @dilrubareyyan
# Run:
# pip3 install requests
# python3 fixture.py

# Importing the requests library
import requests
  
# Defining the api-endpoint 
BASE_URL = "http://localhost:"
PORT = "4000/"
HEADER = {}


# CREATE USERS:

URL = BASE_URL + PORT + "auth/register"

SevPro1 = {
    "username": "Grammar-Immobilien",
    "password": "123456",
    "email": "grammar@email.com",
    "address": """Apartment Complex Unity-alpha
        Josef-Wirth-Weg 21
        80939 Munich""",
    "mobileNumber": "+49 30 901820",
    "role": "admin"
}
SevPro2 = {
    "username": "Laundromat-Service",
    "password": "123456",
    "email": "Laundromat@email.com",
    "address": "Knorrstrasse 42, 80807 Muenchen",
    "mobileNumber": "+49 30 921875",
    "role": "admin"
}
SuperAdmin = {
    "username": "admin",
    "password": "123456",
    "email": "admin@email.com",
    "address": "address",
    "mobileNumber": "1111111",
    "role": "superAdmin"
}


serviceProvider1 = requests.post(url=URL, json=SevPro1).json()
serviceProvider2 = requests.post(url=URL, json=SevPro2).json()
print("Created 2 service providers.")
superAdmin = requests.post(url=URL, json=SuperAdmin).json()
print("Created 1 super admin.")


Cust1 = {
    "username": "Laura-Paul",
    "password": "123456",
    "email": "laurapaul@email.com",
    "address": "address3",
    "mobileNumber": "333333",
    "role": "customer",
    "laundrywiseCode" : serviceProvider2["laundrywiseCode"]
}
Cust2 = {
    "username": "Herman-Hess",
    "password": "123456",
    "email": "hermann@email.com",
    "address": "address4",
    "mobileNumber": "4444444",
    "role": "customer",
    "laundrywiseCode" : serviceProvider1["laundrywiseCode"]
}
Cust3 = {
    "username": "Talha",
    "password": "123456",
    "email": "talha@email.com",
    "address": "Knorrstrasse 57, 80807 Muenchen",
    "mobileNumber": "+491573346810",
    "role": "customer",
    "laundrywiseCode" : serviceProvider2["laundrywiseCode"]
}
Cust4 = {
    "username": "Dilruba",
    "password": "123456",
    "email": "dilruba@email.com",
    "address": """Apartment Complex Unity-alpha
        Josef-Wirth-Weg 21
        80939 Muenchen""",
    "mobileNumber": "+491578021193",
    "role": "customer",
    "laundrywiseCode" : serviceProvider1["laundrywiseCode"]
}
Cust5 = {
    "username": "Ayberk",
    "password": "123456",
    "email": "dilruba@email.com",
    "address": """Apartment Complex „unity β“
        Freisinger Landstraße 84-90
        80939 Muenchen""",
    "mobileNumber": "+4915381217993",
    "role": "customer",
    "laundrywiseCode" : serviceProvider1["laundrywiseCode"]
}
Cust6 = {
    "username": "Canberk",
    "password": "123456",
    "email": "canberk@email.com",
    "address": """Apartment Complex „unity β“
        Freisinger Landstraße 84-90
        80939 Muenchen""",
    "mobileNumber": "+491570020423",
    "role": "customer",
    "laundrywiseCode" : serviceProvider1["laundrywiseCode"]
}


customer1 = requests.post(url=URL, json=Cust1).json()
customer2 = requests.post(url=URL, json=Cust2).json()
customer3 = requests.post(url=URL, json=Cust3).json()
customer4 = requests.post(url=URL, json=Cust4).json()
customer5 = requests.post(url=URL, json=Cust5).json()
customer6 = requests.post(url=URL, json=Cust6).json()
print("Created 9 users.")



# CREATE LAUNDRY ROOMS:
# serviceProvider1: laundryRoom1, laundryRoom2
# serviceProvider2: laundryRoom3
URL = BASE_URL + PORT + "laundryroom/"

LR1 = {
    "serviceProviderId": serviceProvider1["_id"],
    "name": "Blok-A",
    "address": "Apartment Complex Unity-alpha Josef-Wirth-Weg 21 80939 Munich",
    "operationStartHour": 6,
    "operationEndHour": 24
}
LR2 = {
    "serviceProviderId": serviceProvider1["_id"],
    "name": "Blok-B",
    "address": "Apartment Complex Unity-alpha Josef-Wirth-Weg 21 80939 Munich",
    "operationStartHour": 6,
    "operationEndHour": 24
}
LR3 = {
    "serviceProviderId": serviceProvider2["_id"],
    "name": "Laundromat",
    "address": "Knorrstrasse 42, 80807 Muenchen",
    "operationStartHour": 6,
    "operationEndHour": 24
}

laundryRoom1 = requests.post(url=URL, json=LR1).json()
laundryRoom2 = requests.post(url=URL, json=LR2).json()
laundryRoom3 = requests.post(url=URL, json=LR3).json()
print("Created 3 laundry rooms.")


# CREATE MACHINES: (WASHERS) & (DRYERS)
# serviceProvider1: laundryRoom1: (M1, M2, M3) & (M4, M5)
# serviceProvider1: laundryRoom2: (M6) & (M7)
# serviceProvider2: laundryRoom3: (M8, M9) & (M10, M11)
URL = BASE_URL + PORT + "machine/"

M1 = {
    "deviceRoomId": laundryRoom1["_id"],
    "deviceNumberInRoom": 1,
    "machineType": "washer",
    "isEnabled": True,
    "operationCount": 0,
    "price": 1.6
}
M2 = {
    "deviceRoomId": laundryRoom1["_id"],
    "deviceNumberInRoom": 2,
    "machineType": "washer",
    "isEnabled": True,
    "operationCount": 0,
    "price": 1.6
}
M3 = {
    "deviceRoomId": laundryRoom1["_id"],
    "deviceNumberInRoom": 3,
    "machineType": "washer",
    "isEnabled": True,
    "operationCount": 0,
    "price": 1.6
}
M4 = {
    "deviceRoomId": laundryRoom1["_id"],
    "deviceNumberInRoom": 4,
    "machineType": "dryer",
    "isEnabled": True,
    "operationCount": 0,
    "price": 0.8
}
M5 = {
    "deviceRoomId": laundryRoom1["_id"],
    "deviceNumberInRoom": 5,
    "machineType": "dryer",
    "isEnabled": True,
    "operationCount": 0,
    "price": 0.8
}
M6 = {
    "deviceRoomId": laundryRoom2["_id"],
    "deviceNumberInRoom": 1,
    "machineType": "washer",
    "isEnabled": True,
    "operationCount": 0,
    "price": 1.5
}
M7 = {
    "deviceRoomId": laundryRoom2["_id"],
    "deviceNumberInRoom": 2,
    "machineType": "dryer",
    "isEnabled": True,
    "operationCount": 0,
    "price": 1.0
}
M8 = {
    "deviceRoomId": laundryRoom3["_id"],
    "deviceNumberInRoom": 1,
    "machineType": "washer",
    "isEnabled": True,
    "operationCount": 0,
    "price": 2.0
}
M9 = {
    "deviceRoomId": laundryRoom3["_id"],
    "deviceNumberInRoom": 2,
    "machineType": "washer",
    "isEnabled": True,
    "operationCount": 0,
    "price": 2.0
}
M10 = {
    "deviceRoomId": laundryRoom3["_id"],
    "deviceNumberInRoom": 3,
    "machineType": "dryer",
    "isEnabled": True,
    "operationCount": 0,
    "price": 1.5
}
M11 = {
    "deviceRoomId": laundryRoom3["_id"],
    "deviceNumberInRoom": 4,
    "machineType": "dryer",
    "isEnabled": True,
    "operationCount": 0,
    "price": 1.5
}

machine1 = requests.post(url=URL, json=M1).json()
machine2 = requests.post(url=URL, json=M2).json()
machine3 = requests.post(url=URL, json=M3).json()
machine4 = requests.post(url=URL, json=M4).json()
machine5 = requests.post(url=URL, json=M5).json()
machine6 = requests.post(url=URL, json=M6).json()
machine7 = requests.post(url=URL, json=M7).json()
machine8 = requests.post(url=URL, json=M8).json()
machine9 = requests.post(url=URL, json=M9).json()
machine10 = requests.post(url=URL, json=M10).json()
machine11 = requests.post(url=URL, json=M11).json()

print("Created 11 machines.")

# CREATE RENTALS:
URL = BASE_URL + PORT + "rental/new"

R1 = {   
    "machineId": machine1["_id"],
    "machineType": "washer",
    "allocatedTimeId": machine1["timeslots"][1]["_id"],
    "customerId": customer1["_id"]
}

R2 = {   
    "machineId": machine1["_id"],
    "machineType": "washer",
    "allocatedTimeId": machine1["timeslots"][1]["_id"],
    "customerId": customer1["_id"]
}
R3 = {   
    "machineId": machine1["_id"],
    "machineType": "washer",
    "allocatedTimeId": machine1["timeslots"][2]["_id"],
    "customerId": customer2["_id"]
}
R4 = {   
    "machineId": machine2["_id"],
    "machineType": "washer",
    "allocatedTimeId": machine2["timeslots"][11]["_id"],
    "customerId": customer1["_id"]
}
R5 = {   
    "machineId": machine11["_id"],
    "machineType": "dryer",
    "allocatedTimeId": machine11["timeslots"][29]["_id"],
    "customerId": customer2["_id"]
}
R6 = {   
    "machineId": machine5["_id"],
    "machineType": "dryer",
    "allocatedTimeId": machine5["timeslots"][22]["_id"],
    "customerId": customer2["_id"]
}
R7 = {   
    "machineId": machine7["_id"],
    "machineType": "dryer",
    "allocatedTimeId": machine7["timeslots"][29]["_id"],
    "customerId": customer1["_id"]
}
R8 = {   
    "machineId": machine8["_id"],
    "machineType": "washer",
    "allocatedTimeId": machine8["timeslots"][10]["_id"],
    "customerId": customer2["_id"]
}
R9 = {   
    "machineId": machine10["_id"],
    "machineType": "dryer",
    "allocatedTimeId": machine10["timeslots"][6]["_id"],
    "customerId": customer1["_id"]
}
R10 = {   
    "machineId": machine3["_id"],
    "machineType": "washer",
    "allocatedTimeId": machine3["timeslots"][5]["_id"],
    "customerId": customer2["_id"]
}

reservation1 = requests.post(url=URL, json=R1).json()
reservation2 = requests.post(url=URL, json=R2).json()
reservation3 = requests.post(url=URL, json=R3).json()
reservation4 = requests.post(url=URL, json=R4).json()
reservation5 = requests.post(url=URL, json=R5).json()
reservation6 = requests.post(url=URL, json=R6).json()
reservation7 = requests.post(url=URL, json=R7).json()
reservation8 = requests.post(url=URL, json=R8).json()
reservation9 = requests.post(url=URL, json=R9).json()
reservation10 = requests.post(url=URL, json=R10).json()

print("Created 10 rentals.")






