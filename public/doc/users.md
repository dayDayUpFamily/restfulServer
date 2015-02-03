**Users List**
----------

### GET **/v1/users**


List all users.


**Request Parameters**

| Parameter | Validate   | Type   | Value | Default | Note |
|:---------:|:------:|:--------:|:-----:|:-----:|:-----:|
|userId	|optional	|int	|	|	|Same effect as "GET /users/:id".|
|gender	|optional	|int	|0/1/2	|	|Filter users by gender. Value 0 for unspecified; 1 for male; 2 for female.|
|asc	|optional	|int	|1/2	|	|List by name  in ascending order. Value 1 by first name; 2 by last name.|

**Sample Request**

GET /users?gender=2&asc=1

**Sample Success Response**

```json
{
	"status": 200,
    "data":[
        {
			"userId": "3999",
			"username": "az123",
			"name": {
				"first": "Aleen",
				"middle": "",
				"last": "Zhang"
			},
			"gender": 2,
			"contactInfo": {
				"email": "az@gmail.com",
				"phone": "123-456-7890",
			}
		},
		{
			"userId": "3690",
			"username": "godlike",
			"name": {
				"first": "Cathy",
				"middle": "L.",
				"last": "Dogde"
			},
			"gender": 2,
			"contactInfo": {
				"email": "cld@gmail.com",
				"phone": "223-456-7890",
			}
		},
		...
    ]
}
```

**Possible Error Response**

```json
{
	"status": 404,
    "data": "Error Message"
}
```



---
### POST **/v1/users**

Create a new user.


**Request Body**
| Attribute | Validate   | Type   | Value | Default | Note |
|:---------:|:------:|:--------:|:-----:|:-----:|:-----:|
|username	|required	|string	| 	|	|Rule to be designed.  |
|password	|required	|string	| 	|	|Rule to be designed.  |
|name	|required	|JSONObject	| 	|	| 	|
|name.first	|required	|string	| 	|	|  |
|name.middle	|optional	|string	| 	| 	|   |
|
|name.last	|required	|string	| 	|	|   |
|
|gender	|optional	|int	|0/1/2	| 	|Filter users by gender. Value 0 for unspecified; 1 for male; 2 for female.|
|
|contact	|required	|JSONObject	|   	| 	| 	|
|contact.email	|required	|string	| 	| 	|   |
|contact.phone	|optional	|string	| 	| 	|   |

**Sample Request**

POST /users

HTTP Body
```json
{
	"username": "RahXephone",
	"password": "dolem",
	"name": {
		"first": "Olin",
		"last": "Staccato"
	},
	"gender": 2,
	"contactInfo": {
		"email": "os@gmail.com"
	}
}
```

**Sample Success Response**

```json
{
	"status": 201,
    "data":{
		"userId": "9999",
		"username": "RahXephone",
		"name": {
			"first": "Olin",
			"middle": "",
			"last": "Staccato"
		},
		"gender": 2,
		"contactInfo": {
			"email": "os@gmail.com",
			"phone": "",
		}
	}
}
```

**Possible Error Response**

```json
{
	"status": 400,
    "data": "Error Message"
}
```
```json
{
	"status": 500,
    "data": "Error Message"
}
```



**User Account**
---
### GET **/v1/users/:id**

Retrieve a user given id.


**Request Parameters**

| Parameter | Validate   | Type   | Value | Default | Note |
|:---------:|:------:|:--------:|:-----:|:-----:|:-----:|

**Sample Request**

GET /users/3999

**Sample Success Response**

```json
{
	"status": 200,
    "data":{
		"userId": "3999",
		"username": "az123",
		"name": {
			"first": "Aleen",
			"middle": "",
			"last": "Zhang"
		},
		"gender": 2,
		"contactInfo": {
			"email": "az@gmail.com",
			"phone": "123-456-7890",
		}
	}
}
```

**Possible Error Response**

```json
{
	"status": 404,
    "data": "Error Message"
}
```



---
### PUT **/v1/users/:id**

Update a user given id.


**Request Body**
| Attribute | Validate   | Type   | Value | Default | Note |
|:---------:|:------:|:--------:|:-----:|:-----:|:-----:|
|password	|optional	|string	|	|	|Rule to be designed.  |
|name	|optional	|JSONObject	|	|	|	|
|name.first	|optional	|string	|	|	|  |
|name.middle	|optional	|string	|	|	|  |
|
|name.last	|optional	|string	|	|	|  |
|
|gender	|optional	|int	|0/1/2	|	|Filter users by gender. Value 0 for unspecified; 1 for male; 2 for female.|
|
|contact	|optional	|JSONObject	|	|	|	|
|contact.email	|optional	|string	|	|	|  |
|contact.phone	|optional	|string	|	|	|  |

**Sample Request**

PUT /users/9999

HTTP Body
```json
{
	"password": "dolemmelod",
	"name": {
		"last": "Spaghetti"
	},
	"gender": 1
}
```

**Sample Success Response**

```json
{
	"status": 201,
    "data":{
		"userId": "9999",
		"username": "RahXephone",
		"name": {
			"first": "Olin",
			"middle": "",
			"last": "Spaghetti"
		},
		"gender": 1,
		"contactInfo": {
			"email": "os@gmail.com",
			"phone": "",
		}
	}
}
```

**Possible Error Response**

```json
{
	"status": 400,
    "data": "Error Message"
}
```
```json
{
	"status": 500,
    "data": "Error Message"
}
```



---
### DELETE **/v1/users/:id**

Delete a user given id.


**Sample Request**

DELETE /users/3999

**Sample Success Response**

```json
{
	"status": 200
}
```

**Possible Error Response**

```json
{
	"status": 404,
    "data": "Error Message"
}
```
```json
{
	"status": 500,
    "data": "Error Message"
}
```

