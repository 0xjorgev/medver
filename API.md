##Services List: Somosport competition API

####API Version: 1.0
####Base URL: https://somosportpocdev.herokuapp.com/api/v1.0/

|    Document Version   | Responsable |      Created on   |     Comments      |
|----------|:-------------:|------:|------:|
| 1.0 |  Jorge Mendoza | 02/24/2016 | N/A|



| Service   | URL |      Method      |    Params   |     Comments      |
|----------|:-------------:|------:|------:|
| login |  https://somosportpocdev.herokuapp.com/api/v1.0/user/login | GET |{"username":"jorge","password":"12345c67"}|Checks for username or email before create the new user|
| register |  https://somosportpocdev.herokuapp.com/api/v1.0/user/register | POST |{"username":"jorge3","email": "jorgevmendoza3@gmail.com","password": "430378fe561db618c4d1db84fa6b6197"}|pwd non hashed burromocho|
| forgot password |  https://somosportpocdev.herokuapp.com/api/v1.0/user/forgot | POST |{"username":"jorge"}|takes username or user email|
| change password |  https://somosportpocdev.herokuapp.com/api/v1.0/user/change_password | POST |{ "id":1, "old_password":"3d324a03882fc0a5467255c3a8f73258", "new_password":"0d4f505ff8ecdb25178fec66b46262df"}|password must be hashed|