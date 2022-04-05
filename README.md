# EXPRESS 

### #
1. Project written in typescript
2. Use `Yarn` to install dependencies

## escription:

Create A basic Express application, that makes a CRUD operation (create, read, update, delete) into a file database.json.


## How will I complete this project?
- Your aplication should be able to perform.
  - `GET` Request which returns all the data in your database.json data
  - `POST` Request which adds data to your database.json file (Note: If there is no database.json on post, create one dynamically). Also, when posting data, the id, createdAt and updatedAt fields are generated dynamically. id are generated with the data position.
  - `PUT` Request updates fields of a particular data using the id in the database.json file. If an object with the id sent in the request is not found in the database.json file, 404 status is responded. Also, the id, createdAt and updatedAt fields cannot be updated by the input. The id and createdAt fields remains the same as they were at the point of creation while the updatedAt field changes dynamically to the current date whenever any field is updated.
  - `DELETE` Request removes a particular data from your database.json file using the id. If the object with the id sent in the request is not found in the database.json file, a 404 response is returned.

- Heroku link
https://idris-express-app.herokuapp.com


- Data format example:

```
[
  {
    organization: "node ninja",
    createdAt: "2020-08-12T19:04:55.455Z",
    updatedAt: "2020-08-12T19:04:55.455Z",
    products: ["developers","pizza"],
    marketValue: "90%",
    address: "sangotedo",
    ceo: "cn",
    country: "Taiwan",
    id: 2,
    noOfEmployees:2,
    employees:["james bond","jackie chan"]
  }
]
```

## Test coverage
- Test is written to using supertest and jest

### Test
- Test for a GET request
- Test for a POST request
- Test for a PUT request
- Test for a DELETE request
- Test to return proper HTTP status codes and response bodies

## Input validation
- All inputs are validated using my created validation code.

### Thanks 🙂
