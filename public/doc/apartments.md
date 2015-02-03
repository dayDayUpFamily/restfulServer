------------

### Naming Convention

url: '-' separated

json key: camel

Apartments List
---------------

### GET **/v1/apartments?price=&bath=&offset=...**

Query and Pagination

**Request**

| Parameter  | type   | value   | default|    Note |
|:----------:|:------:|:-------:|:------:|:--------:|
|   offset |  int    |  1/2/3...|    1   |          |
|   limit  |  int    |     10   |    10  |  limit     |
|price     |  int    | 2000-3000| 2000   |  room price |
|room      |  int    | 2-4      | 2      | number of rooms|
|bath      |  int    |2-4       | 2      | number of bathrooms|
|floor     |  int    | required | 1-20   |  1  |
|brokerFee |	int	   |	 0-2000	| 0|||

**Cautions**

**Response**

```json
{
  "status": 200,
  "data"  : [
            {
              "id": 1,
              "price": 3000,
              "room": 2,
              "bath": 3,
              "floor": 1,
              "brokerFee": 800
            },
            {
              "id": 3,
              "price": 2500,
              "room": 2,
              "bath": 2,
              "floor": 4,
              "brokerFee": 600
            }

          ],
  "links":[
            {"ref":"pre","href":"../apartments?offset=4&limit=2"},
            {"ref":"next","href":"../apartments?offset=8&limit=2"},
            {"ref":"first","href":"../apartments?offset=0&limit=2"},
            {"ref":"last","href":"../apartments?offset=400&limit＝2"}
         ]
}
or

{
  "status":404,
  "data": "Error message"
}

```

Apartment Detail
----------------

###GET **/v1/apartments/:id**


**Request**

| Parameter | type | validate | value | Attribute |
|:---------:|:----:|:--------:|:-----:|:---------:|
|   id   | int  | required |   123 |  unique   |

**Response**

```json
{
  "status": 200,
  "data": {
    "id": 1,
    "price": 3000,
    "room": 2,
    "bath": 3,
    "floor": 1,
    "brokerFee": 800
  }
}


{
  "status":404,
  "data": "Error message"
}
```

### POST **/v1/apartments**


add a apartment

**Request**

|  Parameter      | type             | value                | Default | Note      |
|:------------------:|:--------:|:--------------------:|:-------:|:---------:|
|price| Int        | 2000-3000|  2000   | room price |
|room| int          |2-4|  2  | number of rooms|
|bath| Int  |2-4| 2| number of bathrooms|
|floor  | int    | 1-20    |  1  | |
|brokerFee|	int	|	 0-2000 |	800  || |

**Response**

****Headers****

  Link: <http:/ap1/v1/apartments/123";"rel":"self"

****Body****

```json
{
  "status": 201,
  "data": "create success!"
}


{
  "status":404,
  "data": "error message"
}
```
### PUT **/v1/apartments/:id**

update info of a apartment

**Request**

|  Parameter      | type             | value                | Default | Note      |
|:------------------:|:--------:|:--------------------:|:-------:|:---------:|
|id|int|  |2|  |
|price| int        | 2000-3000|  2000   | room price |
|room| int          |2-4|  2  | number of rooms|
|bath| int  |2-4| 2| number of bathrooms|
|floor  | int    | 1-20    |  1  | |
|brokerFee|	int	|	 0-2000 |	800  || |


```json
{
  "status": 200,
  "data":"update success"
}


{
  "status":404,
  "data": "error message"
}
```
### Delete **/v1/apartments/:id**
delete a apartment

**Request**

|  Parameter      | type            | validate | value                | Default | Note      |
|:------------------:|:---------------:|:--------:|:--------------------:|:-------:|:---------:|
|     id     |       int       | required  |         |     1|unique|    |


```json
{
  "status": 200,
  "data":"delete success"
}
{
  "status": 403,
  "data":"error message"
}

```
