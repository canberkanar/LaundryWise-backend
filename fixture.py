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
# 2 SERVICE PROVIDERS, 2 CUSTOMERS, 1 ADMIN
URL = BASE_URL + PORT + "auth/register"

SevPro1 = {
    "username": "Grammar-Immobilien",
    "password": "123456",
    "email": "grammar@email.com",
    "address": "address1",
    "mobileNumber": "111111",
    "role": "serviceProvider"
}
SevPro2 = {
    "username": "Aldi-Service",
    "password": "123456",
    "email": "aldi@email.com",
    "address": "address2",
    "mobileNumber": "222222",
    "role": "serviceProvider"
}
Cust1 = {
    "username": "Laura-Paul",
    "password": "123456",
    "email": "laurapaul@email.com",
    "address": "address3",
    "mobileNumber": "333333",
    "role": "customer"
}
Cust2 = {
    "username": "Herman-Hess",
    "password": "123456",
    "email": "hermann@email.com",
    "address": "address4",
    "mobileNumber": "4444444",
    "role": "customer"
}
Admin1 = {
    "username": "Laundrywise",
    "password": "123456",
    "email": "admin@email.com",
    "address": "address5",
    "mobileNumber": "555555",
    "role": "admin"
}

serviceProvider1 = requests.post(url=URL, json=SevPro1).json()
serviceProvider2 = requests.post(url=URL, json=SevPro2).json()
customer1 = requests.post(url=URL, json=Cust1).json()
customer2 = requests.post(url=URL, json=Cust2).json()
admin1 = requests.post(url=URL, json=Admin1).json()
print("Created 5 users.")



# CREATE LAUNDRY ROOMS:
# serviceProvider1: laundryRoom1, laundryRoom2
# serviceProvider2: laundryRoom3
URL = BASE_URL + PORT + "laundryroom/"

LR1 = {
    "serviceProviderId": serviceProvider1["_id"],
    "name": "Blok A",
    "address": "address-1",
    "operationStartHour": 6,
    "operationEndHour": 24
}
LR2 = {
    "serviceProviderId": serviceProvider1["_id"],
    "name": "Blok B",
    "address": "address-1",
    "operationStartHour": 6,
    "operationEndHour": 24
}
LR3 = {
    "serviceProviderId": serviceProvider2["_id"],
    "name": "App. 88 Floor 4",
    "address": "address-2",
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
    "price": 0.6
}
M5 = {
    "deviceRoomId": laundryRoom1["_id"],
    "deviceNumberInRoom": 5,
    "machineType": "dryer",
    "isEnabled": True,
    "operationCount": 0,
    "price": 0.6
}
M6 = {
    "deviceRoomId": laundryRoom2["_id"],
    "deviceNumberInRoom": 1,
    "machineType": "washer",
    "isEnabled": True,
    "operationCount": 0,
    "price": 1.6
}
M7 = {
    "deviceRoomId": laundryRoom2["_id"],
    "deviceNumberInRoom": 2,
    "machineType": "dryer",
    "isEnabled": True,
    "operationCount": 0,
    "price": 0.6
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
    "price": 0.8
}
M11 = {
    "deviceRoomId": laundryRoom3["_id"],
    "deviceNumberInRoom": 4,
    "machineType": "dryer",
    "isEnabled": True,
    "operationCount": 0,
    "price": 0.8
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
URL = BASE_URL + PORT + "rental/"

R1 = {   
    "machine_id": machine1["_id"],
    "allocated_time_id": machine1["timeslots"][1]["_id"],
    "customer_id": customer1["_id"],
    "service_provider_id": serviceProvider1["_id"]
}

R2 = {   
    "machine_id": machine1["_id"],
    "allocated_time_id": machine1["timeslots"][1]["_id"],
    "customer_id": customer1["_id"],
    "service_provider_id": serviceProvider1["_id"]
}
R3 = {   
    "machine_id": machine1["_id"],
    "allocated_time_id": machine1["timeslots"][2]["_id"],
    "customer_id": customer2["_id"],
    "service_provider_id": serviceProvider1["_id"]
}
R4 = {   
    "machine_id": machine2["_id"],
    "allocated_time_id": machine2["timeslots"][11]["_id"],
    "customer_id": customer1["_id"],
    "service_provider_id": serviceProvider1["_id"]
}
R5 = {   
    "machine_id": machine11["_id"],
    "allocated_time_id": machine11["timeslots"][29]["_id"],
    "customer_id": customer2["_id"],
    "service_provider_id": serviceProvider2["_id"]
}
R6 = {   
    "machine_id": machine5["_id"],
    "allocated_time_id": machine5["timeslots"][22]["_id"],
    "customer_id": customer2["_id"],
    "service_provider_id": serviceProvider1["_id"]
}
R7 = {   
    "machine_id": machine7["_id"],
    "allocated_time_id": machine7["timeslots"][29]["_id"],
    "customer_id": customer1["_id"],
    "service_provider_id": serviceProvider1["_id"]
}
R8 = {   
    "machine_id": machine8["_id"],
    "allocated_time_id": machine8["timeslots"][10]["_id"],
    "customer_id": customer2["_id"],
    "service_provider_id": serviceProvider2["_id"]
}
R9 = {   
    "machine_id": machine10["_id"],
    "allocated_time_id": machine10["timeslots"][6]["_id"],
    "customer_id": customer1["_id"],
    "service_provider_id": serviceProvider2["_id"]
}
R10 = {   
    "machine_id": machine3["_id"],
    "allocated_time_id": machine3["timeslots"][5]["_id"],
    "customer_id": customer2["_id"],
    "service_provider_id": serviceProvider1["_id"]
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

print(R1)
print("Created 10 rentals.")






