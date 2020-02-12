## Sign Up

POST `/signup`

#### REQUEST

```json
{
     
	"email": "STRING",
	"name":"STRING",
	"password": "STRING",
}
```

#### RESPONSE

```json
{
    "status": "success",
    "message": "Successfully registered."
}
```

## Login

POST `/login`

#### REQUEST

```json
{
     
	"email": "STRING",
	"password": "STRING"
}
```

#### RESPONSE

```json
{
    "status": "success",
    "message": "Successfully logged in.",
    "Authorization": "<auth_token>",
    "role": "STRING",
    "email": "STRING"
```

## Logout

POST `/logout`

#### REQUEST

##### Header
```json
{
    "Authorization": "<auth_token>"
}
```
##### Body
```json
{
     
	"email": "STRING",
	"password": "STRING"
}
```

#### RESPONSE

```json
{
    "status": "success",
    "message": "Token Deactivated",
```

## Challenge
​
GET `/challenge/<challenge_id>`
​
Required Headers - `Authorization: <access_token>`
​
#### RESPONSE 
​
Success (Status Code - 200)
```json
{
     "challenge":{
                        "description":"STRING",
                        "problem_statement":"STRING",
                        "input_format":"STRING",
                        "output_format":"STRING",
                        "constraints":"STRING",
                        "difficulty":"STRING",
                        "sample_input":"STRING",
                        "sample_output":"STRING",
                        "marks":"INTEGER",
                        "challenge_name": "STRING",
                        "challenge_id": "INTEGER",
                        "constratints": "STRING"
    }
}
```
​
POST `/challenge/<challenge_name>`
​
Required Headers - `Authorization: <user_token>`
​
#### REQUEST 
​
Body 
```json
{
        "challenge_details": {
                            "description":"STRING",
                            "problem_statement":"STRING",
                            "input_format":"STRING",
                            "output_format":"STRING",
                            "constraints":"STRING",
                            "difficulty":"STRING",
                            "sample_input":"STRING",
                            "sample_output":"STRING",
                            "marks":"INTEGER"
        },
        "test_cases":[
                        {
                            "test_case_name":"STRING",
                            "test_case_strength":"STRING",
                            "visibility":"Boolean",
                            "input":"INTEGER",
                            "output":"INTEGER",
                        }   
        ],
        "settings":[
                    {
                        "language":"STRING",
                        "time_limit":"INTEGER",
                        "memory_limit":"INTEGER",
                    },
        ],
        "action":"creating the challenge"
​
}
```
​
#### RESPONSE
​
Success (Status Code - 201)
```json
{
       "comment":"successfully stored the data"
}
```
​
## Challenges
​
GET `/challenges`
​
Required Headers - `Authorization: <access_token>`
​
Query Params
​
```
{
    "contest_id": "INTEGER"
}
```
#### RESPONSE
​
SUCCESS (Status Code - 200)
```json
{
        "contest_id":"INTEGER", 
            "challenges":[{   
                            "challenge_id":"STRING",
                            "description":"STRING",
                            "problem_statement":"STRING",
                            "input_format":"STRING",
                            "output_format":"STRING",
                            "constraints":"STRING",
                            "difficulty":"INTEGER",
                            "sample_input":"STRING",
                            "sample_output":"STRING",
                            "marks":"INTEGER",
            }
        ],
​
        "comment":"getting all the challenges for a particular contest id if id is present",
​
}
```
GET `/challenges`
​
Required Headers - `Authorization: <access_token>`
​
#### RESPONSE
​
SUCCESS (Status Code - 200)
```json
{
     "challenges":[
                {
                "challenge_name":"STRING",
                "challenge_id":"INTEGER",
                "test_case_count":"INTEGER",
            }
            ]
​
}
```
## Contest
​
POST `/contest/<contest_name>`
​
Required Headers - `Authorization: <access_token>`
​
#### REQUEST
​
BODY
```json
{
            "start_date":"DATETIME",
            "end_date":"DATETIME",
            "end_time":"INTEGER",
            "details":"STRING",
            "show_leader_board":"BOOLEAN",
            "challenges_ids":["INTEGER","INTEGER","INTEGER"],
            "action":" "
}
```
​
#### RESPONSE
​
Success (Status Code - 201)
```json
{
           "comment":"Successfully created Contest"
 
​
}
```
​
GET `/contest/<contest_id>`
​
Required Headers - `Authorization: <access_token>`
​
#### RESPONSE
​
Success (Status Code - 200)
```json
{
            "data": [
                {
                    "description": "STRING",
                    "challenge_id": "INTEGER",
                    "problem_statement": "STRING",
                    "input_format": "STRING",
                    "output_format": "STRING",
                    "difficulty": "STRING",
                    "sample_input": "STRING",
                    "sample_output": "STRING",
                    "created_at": "01/STRING/2020",
                    "max_score": "INTEGER",
                    "submit_status": "BOOLEAN"
                }
            ],
            "contest_data": {
                "contest_name": "STRING",
                "contest_id": 1,
                "start_date": "STRING",
                "start_time": "STRING",
                "end_date": "STRING",
                "end_time": "STRING",
                "details": "STRING",
                "max_score": "INTEGER",
                "show_leaderboard": "INTEGER",
                "created_at": "STRING"
            },
            "submit_data": {}
}
```
​
## Contests
​
GET `/contests`
​
Required Headers - `Authorization: <access_token>`
​
#### RESPONSE
​
Success (Status Code - 200)
```json
{
            "contests":[{
                        "contest_id":"INTEGER",
                        "contest_name":"STRING",
                        "start_date":"DATETIME",
                        "end_date":"DATETIME",
                        "end_time":"DATETIME",
                        "details":"STRING",
                        "show_leader_board":"BOOLEAN",
                        "created_at": "STRING"
                    }],
            "comments":"",        
​
}
```
​
## Run Code
​
POST `/runcode`
​
Required Headers - `Authorization: <access_token>`
​
#### REQUEST
​
Body
```json
{
            "contest_id":"INTEGER",
            "challenge_id":"INTEGER",
            "language":"STRING",
            "code":"STRING",
            "action":"submitting the code"
​
}
```
#### RESPONSE
​
Success (Status Code - 200)
```json
{           
            "comment": "STRING",
            "user_output": "STRING",
            "user_error": "STRING",
            "sample_result": "BOOLEAN",
            "is_error": "BOOLEAN",
            "is_custom_input": "BOOLEAN",
            "custom_input": "STRING",
            "error_type": "STRING"
​
}
```
​
## Submit Code
​
POST `/submit`
​
Required Headers - `Authorization: <access_token>`
​
#### REQUEST
​
Body
```json
{
        "challenge_id":"INTEGER",
        "contest_id":"INTEGER",
        "code":"STRING",
        "language":"STRING",
        "action":"submit the code",
    
}
```
​
#### RESPONSE
​
Success (Status Code - 200)
```json
{
        "total_marks":"INTEGER",
        "test_case_result":[
                            { 
                                "test_case_id":"INTEGER",
                                "passed":"BOOLEAN",
                            },{},{}],
        "time_taken":"DATETIME",
        "memory_taken":"INTEGER",
        "comment": ""
​
}
​
```
​
## Leaderboard
​
GET `contest/<contest_id>/leaderboard`
​
Required Headers - `Authorization: <access_token>`
​
#### RESPONSE
​
Success (Status Code - 202)
```json
{
            "leaderboard":[
                {
                    "contest_id": "INTEGER",
                    "user_id": "INTEGER",
                    "total": "INTEGER",
                    "name": "STRING",
                    "email": "STRING",
                    "contest_name": "STRING",
                    "rank": "INTEGER"
                    
                }],
            "comment":""
​
}
```
GET `contest/<contest_id>/leaderboard/<user_id>`
​
Required Headers - `Authorization: <access_token>`
​
#### RESPONSE
​
Success (Status Code - 202)
```json
{
            "challenges":[
                {
                    "submission_id": "INTEGER",
                    "challenge_id": "INTEGER",
                    "challenge_name": "STRING",
                    "name": "STRING",
                    "time_taken": [
                        "INTEGER",
                        "INTEGER"
                    ],
                    "created_at": "STRING",
                    "score": "INTEGER",
                    "contest_name": "STRING"
                            
                        }],
            "comment":"success"
​
}
​
​
​
```
​
GET `/contest/<contest_id>/leaderboard/<user_id>/code/<submission_id>`
​
Required Headers - `Authorization: <access_token>`
​
#### RESPONSE
​
Success (Status Code - 202)
```json
{
                "code_path": "STRING",
                "code": "STRING",
                "comment": "success",
                "test_case_info": {
                    "tco1": "BOOLEAN",
                    "tco2": "BOOLEAN"
                }
}
```