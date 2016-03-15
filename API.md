##Services List: Somosport competition API

####API Version: 1.0
####Base URL: https://somosportpocdev.herokuapp.com/api/v1.0/

|    Document Version   | Responsable |      Created on   |     Comments      |
|----------|:-------------:|------:|------:|
| 1.0 |  Jorge Mendoza | 02/24/2016 | N/A|
| 1.1 |  Jorge Mendoza | 03/15/2016 | New set of services|



| Service   | URL |      Method      |    Params   |     Comments      |
|----------|:-------------:|------:|------:|
| login |  https://somosportpocdev.herokuapp.com/api/v1.0/user/login | GET |{"username":"jorge","password":"12345c67"}|Checks for username or email before create the new user|
| User register |  https://somosportpocdev.herokuapp.com/api/v1.0/user/register | POST |{"username":"jorge3","email": "jorgevmendoza3@gmail.com","password": "430378fe561db618c4d1db84fa6b6197"}|pwd non hashed burromocho|
| User forgot password |  https://somosportpocdev.herokuapp.com/api/v1.0/user/forgot | POST |{"username":"jorge"}|takes username or user email|
| User change password |  https://somosportpocdev.herokuapp.com/api/v1.0/user/change_password | POST |{ "id":1, "old_password":"3d324a03882fc0a5467255c3a8f73258", "new_password":"0d4f505ff8ecdb25178fec66b46262df"}|password must be hashed|
| Create Competition |  https://somosportpocdev.herokuapp.com/api/v1.0/competition/create | POST |{"name": "Post Competition","discipline_id":1, "subdiscipline_id":1, "competition_type" 2}| N/A
| Update Competition |  https://somosportpocdev.herokuapp.com/api/v1.0/competition/1/update | POST |{"name": "Post Competition","discipline_id":1, "subdiscipline_id":1, "competition_type" 2}| The number 1 in the URL represents the competition id
| List competition |  https://somosportpocdev.herokuapp.com/api/v1.0/competition/ | GET | N/A|
| List competition by Id |  https://somosportpocdev.herokuapp.com/api/v1.0/competition/1 | GET | url Competition id |The 1 in the URL represents the competition id|
| Create Season |  https://somosportpocdev.herokuapp.com/api/v1.0/season/create | POST |{"name": "Competition Post 2", "description":"Competition Post Description 2", "game_title":"The game of thrones 2", "init_at":"2016-02-22 22:59:58.960518+00","ends_at":"2016-02-25 22:59:58.960518+00","competition_id": 1}| N/A
| Update Season |  https://somosportpocdev.herokuapp.com/api/v1.0/season/update | POST |{"name": "Competition Post 2", "description":"Competition Post Description 2", "game_title":"The game of thrones 2", "init_at":"2016-02-22 22:59:58.960518+00","ends_at":"2016-02-25 22:59:58.960518+00","competition_id": 1}| N/A
| List Season |  https://somosportpocdev.herokuapp.com/api/v1.0/season/ | GET || N/A
| List Season by ID |  https://somosportpocdev.herokuapp.com/api/v1.0/season/1 | GET |URL Season id| N/A
| List Season by Competition |  https://somosportpocdev.herokuapp.com/api/v1.0/competition/1/season | GET |URL competition id| N/A
| List Categories |  https://somosportpocdev.herokuapp.com/api/v1.0/category/ | GET || N/A
| List Categories by ID|  https://somosportpocdev.herokuapp.com/api/v1.0/category/1 | GET |URL category id| N/A
| Create Categories|  https://somosportpocdev.herokuapp.com/api/v1.0/category/create | POST |{	"name": "Post Category",    "description":"Category Post ",    "image_url":"",    "inscription_init_at":"2016-02-22 22:59:58.960518+00",    "inscription_ends_at":"2016-02-25 22:59:58.960518+00",	"gender_id": 1,    "season_id": 1}| N/A
| Update Categories|  https://somosportpocdev.herokuapp.com/api/v1.0/category/1/update | POST |{	"name": "Post Category",    "description":"Category Post ",    "image_url":"",    "inscription_init_at":"2016-02-22 22:59:58.960518+00",    "inscription_ends_at":"2016-02-25 22:59:58.960518+00",	"gender_id": 1,    "season_id": 1}| The 1 in the URL represents the category id
| List Disciplines|  https://somosportpocdev.herokuapp.com/api/v1.0/discipline/ | GET |N/A|
| List Disciplines by ID|  https://somosportpocdev.herokuapp.com/api/v1.0/discipline/1 | GET |The 1 in the URL represents the category id |
| List subdisciplines|  https://somosportpocdev.herokuapp.com/api/v1.0/subdiscipline/ | GET ||
| List subdisciplines by ID|  https://somosportpocdev.herokuapp.com/api/v1.0/subdiscipline/ | GET |URL subdiscipline id | The 1 in the URL represents the category id