User Wishlist
-------------

### GET **.../v1/users/:userId/wishlist/apartments**
### GET **.../v1/users/:userId/wishlist/apartments?price=&bathroom=&offset=...**

Display the wishlist of a user. A user can only have one wishlist, which contains apartments.

**Request Parameters**

| Parameter | type   | validate | value | Attribute | Note |
|:---------:|:------:|:--------:|:-----:|:---------:|:---------:|
|   userId   | int  | required |    1   |  unique   |
|   interestExtent   | int  |  |    3   |   |
|   note   | string  |  |  "This apt is great!"   |    |
|   offset    |  int   |       |       1/2/3...       |         |        page number      |
|   limit   |  int   |       |          10          |         |           limit      |
|price| Int |       | 2000-3000|    |   | room price |
|room| int |         |2-4|    | number of rooms|
|bathroom| Int | |2-4| | number of bathrooms|
|floor            | int    | required | 1-20    |    |
|propertyType| string	|	| "single"/"condo"/"apartment"	|	|	|
|brokerFee|	int	|	| 0-2000|	|

**Cautions**

**Success Response**

```json
{
   "status": 204,
    "data":[
        {
            "aptId": 1,
            "interestExtent": 3,
            "note":"This apt is perfect!",
            "price": 3000,
            "room": 2,
            "bathroom": 3,
            "floor": 1,
            "propertyType": 2,
            "brokerFee": 800
        },
        {
            "aptId": 3,
            "interestExtent": 1,
            "note":"This apt sucks!",
            "price": 2500,
            "room": 2,
            "bathroom": 2,
            "floor": 4,
            "propertyType": 3,
            "brokerFee": 600
        },
],
   "links":[
            {"ref":"next", "href":"../v1/users/:userId/wishlist/apartments?offset=2&limit=2"},
            {"ref":"first", "href":"../v1/users/:userId/wishlist/apartments?offset=0&limit=2"},
            {"ref":"last","href":"../v1/users/:userId/wishlist/apartments?offset=21092&limit=2"}

]
}

```
**Error Response**

```json
{
    "status":404,
    "data": "Error message"
}
```



### GET **/v1/users/:userId/wishlist/apartments/:id**

Display the details of a record in wishlist.

**Request Parameters**

| Parameter | type   | validate | value | Attribute |
|:---------:|:------:|:--------:|:-----:|:---------:|
|   userId   | int  | required |       |  unique   |
|   aptId    | int  | required |       |  unique   |

**Cautions**

**Success Response**

```json
{
    "status": 204,
    "wishlist":{
        "data":{
            "userId": 1,
            "wishlistId": 1
        },
        "link":{
            "rel":"self",
            "href":"/users/1/wishlist",
        }
    },
    "apt":{
        "data":{
            "aptId": 1,
            "interestExtent":3,
             "note":"This apt is perfect!",
            "price": 3000,
            "room": 2,
            "bathroom": 3,
            "floor": 1,
            "propertyType": 2,
            "brokerFee": 800
        },
        "link":{
            "rel":"wishedApartment",
            "href":"/apartment/1"
        }
    }
}
```
**Error Response**

```json
{
    "status":404,
    "data": "Error message"
}
```



### PUT  **/v1/users/:userId/wishlist/apartments/:id**

Update a record in the wishlist.

**Request Parameters**

| Parameter | type   | validate | value | Attribute |
|:---------:|:------:|:--------:|:-----:|:---------:|
|   userId   | int  | required |       |  unique   |
|   aptId    | int  | required |       |  unique   |
|   interestExtent    | int  |  |       |     |
|   note    | string  |  |       |     |

**Cautions**

**Success Response**

```json
{
    "status":200
}
```
**Error Response**

```json
{
    "status":404,
    "data": "Error message"
}
```



### POST **/v1/users/:userId/wishlist/apartments**

add a new record to the wishlist.

**Request Parameters**

| Parameter | type   | validate | value | Attribute |
|:---------:|:------:|:--------:|:-----:|:---------:|
|   userId   | int  | required |       |  unique   |
|   aptId    | int  | required |       |  unique   |
|   interestExtent    | int  |  |       |     |
|   note    | string  |  |       |     |

**Cautions**

**Success Response**

```json
{
    "status":200,
    "Location":"/users/:userId/wishlist/apartments/3"
}
```
**Error Response**

```json
{
    "status":404,
    "data": "Error message"
}
```



### DELETE **/v1/users/:userId/wishlist/apartments/:id**

Delete a record in the wishlist.

**Request Parameters**

| Parameter | type   | validate | value | Attribute |
|:---------:|:------:|:--------:|:-----:|:---------:|
|   userId   | int  | required |       |  unique   |
|   aptId    | int  | required |       |  unique   |

**Cautions**

**Success Response**

```json
{
    "status": 204,
    "data":"delete success"
}
```
**Error Response**

```json
{
    "status":404,
    "data": "Error message"
}
```
