# Basic Clients Api

## Requirements
Create `.env` file and add the following:

    SECRET=<anyscretekeythatyouthinkitsgood>

Then install the required modules.


# Clients Rest API
This API is used to manage the clients of a generic establishment.

## Get auth token

This endpoint returns a token if exist a valid user on the database.

### Request
`POST /auth/token`

### Parameters
* None

### Body
#### Example:

    {
        "email": "string',
        "password": string
    }

### Responses
#### Status
* **200** - Ok!
* **400** - Invalid email/password
* **404** - There's no such email on the database

#### Content
Each client on the list contain the following fields:

Field |   Type  | Description
------|---------|------------
token | string  | The provided user token

#### Example
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbnRvbmlvc2ZqMjFAZ21haWwuY29tIiwiaWF0IjoxNjIxNDk0MjQ4LCJleHAiOjE2MjE2NjcwNDh9.b8Inq-SUoB_xpk8_nmxdBiBsJSyL8S_9-xhoPc7U1H0"
    }

## Get clients

This endpoint return a list of all **client**s registered.

### Request
`GET /clients`

### Parameters
* None

### Headers
    Authorization: 'Baerer ' + 'Authorization-Token'

### Responses
#### Status
* **200** - Ok!
* **401** - Token invalid/missing

#### Content
Each client on the list contain the following fields:

Field |   Type  | Description
------|---------|------------
id    | integer | Clients ID
name  | string  | Clients name
year  | integer | Year of clients registration 

#### Example
    [
        {
            "id": 1,
            "name": "Palmer Murray",
            "year": 2008
        },
        {
            "id": 2,
            "name": "Trisha Jennings",
            "year": 2017
        },
        {
            "id": 3,
            "name": "Rosalyn Shepherd",
            "year": 2013
        }
    ]


## Get specific client

This endpoint return a specific **client** by its `id`.

### Request
`GET /client/:id`

### Parameters
* id - Client id

### Headers
    Authorization: 'Baerer ' + 'Authorization-Token'

### Responses
#### Status
* **200** - Ok!
* **400** - Bad request (id is probably not a integer)
* **401** - Token invalid/missing
* **404** - Client doesn't exist

#### Content

Field |   Type  | Description
------|---------|------------
id    | numeric | Clients ID
name  | string  | Clients name
year  | numeric | Year of clients registration

#### Example
    {
        "id": 1,
        "name": "Palmer Murray",
        "year": 2008
    }

## Create client

This endpoint creates **client**.

### Request
`POST /client`

### Parameters
* None

### Headers
    Authorization: 'Baerer ' + 'Authorization-Token'

### Body
#### Example:

    {
        "name": "string',
        "year": 2021
    }

### Responses
#### Status
* **201** - Created!
* **400** - Bad request (name or year invalid)
* **401** - Token invalid/missing


## Delete specific client

This endpoint deletes a specific **client** by its `id`.

### Request
`DELETE /client/:id`

### Parameters
* id - Client id

### Headers
    Authorization: 'Baerer ' + 'Authorization-Token'

### Responses
#### Status
* **200** - Client's deleted
* **400** - Bad request (id invalid)
* **401** - Token invalid/missing
* **404** - Client doesn't exist


## Update specific client

This endpoint updates a specific **client** by its `id` with the given fields.

### Request
`PATCH /client/:id`

### Parameters
* id - Client id

### Headers
    Authorization: 'Baerer ' + 'Authorization-Token'

### Body
#### Example:

    {
        "name": "string',
        "year": 2021
    }
##### Both fields are optional.

### Responses
#### Status
* **200** - Client's deleted
* **400** - Bad request (id invalid)
* **401** - Token invalid/missing
* **404** - Client doesn't exist