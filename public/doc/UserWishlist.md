User Wishlist
-------------

### GET **.../v1/users/:userId/wishlist/apartments?interestExtent=&&offset=&limit=&field=...**

Display the wishlist of a user. A user can only have one wishlist, which contains apartments.

**Request Parameters**

| Parameter | type   | validate | value | Attribute | Note |
|:---------:|:------:|:--------:|:-----:|:---------:|:---------:|
|   userId   | int  | required |    1   |  unique   |
|   interestExtent   | int  |  |    3   |   |
|   note   | string  |  |  "This apt is great!"   |    |
|   offset    |  int   |       |       1/2/3...       |         |        page number      |
|   limit   |  int   |       |          10          |         |           limit      |
|field| String |       | |    |   | projection field |
**Sample Request**

GET {ServerPath}/v1/users/:userId/wishlist/apatments?interestExtent=1&offset=10&limit=5&filed=note,aptId

**Success Response**

```json
{
   "status": 200,
    "data":[
        {
            "aptId": 1,
            "interestExtent": 3,
            "note":"This apt is perfect!",
            "link":{"ref":"selfApt", "href":"../v1/apartment/:aptId"},
        },
        {
            "aptId": 3,
            "interestExtent": 1,
            "note":"This apt sucks!",
            "link":{"ref":"selfApt", "href":"../v1/apartment/:aptId"},
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
    "status": 200,
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

****Headers****

  Location:/users/:userId/wishlist/apartments/3

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
