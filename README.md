# Luncher Backend

# Admin Endpoints

## GET Admins
`https://bw-luncher.herokuapp.com/api/admin`
 - GET request: Returns array of all admins

## REGISTER
 `https://bw-luncher.herokuapp.com/api/admin/register`
 - POST request: expected object requires a unique email property and a password property. 
 - Example: `{ email: "testing123@email.com", password: "password123" }`

## LOGIN
 `https://bw-luncher.herokuapp.com/api/admin/login`
 - POST request:  expected object requires matching username and password of admin that has been registered.
 - Example: `{ email: "test1@gmail.com", password: "password1" }`

## GET specific admin (Requires Authorization header)
`https://bw-luncher.herokuapp.com/api/admin/:id`
- GET request: Where ":id" is the id of the admin.

## UPDATE Admin (Requires Authorization header)
 `https://bw-luncher.herokuapp.com/api/admin/:id`
 - PUT request: Where ":id" is the id of the admin.


# School Endpoints

## GET Schools
 `https://bw-luncher.herokuapp.com/api/schools`
 - GET request: Returns array of all schools

## GET specific school
 `https://bw-luncher.herokuapp.com/api/schools/:id`
 - GET request: Where ":id" is the id of the school.

## UPDATE specific school (Requires Authorization header)
 `https://bw-luncher.herokuapp.com/api/schools/:id`
 - PUT request: Where ":id" is the id of the school.
 - Object shape requires "name", "location", and "requested_funds" properties.
 - Example object:
```
{
	name: "Newbrooks High",
	location: "677 Random Name Blvd.",
  requested_funds: 2000
} 
```

## DELETE specific school (Requires Authorization header)
 `https://bw-luncher.herokuapp.com/api/schools/:id`
 - DELETE request: Where ":id" is the id of the school.

## ADD a school (Requires Authorization header)
 `https://bw-luncher.herokuapp.com/api/admin/:id/schools`
 - POST request: Where ":id" is the id of the admin currently logged in.
 - Object shape requires "name", "location", and "requested_funds" properties.
 - Example object: 
``` 
{
	name: "Newbrooks High",
	location: "677 Random Name Blvd.",
  requested_funds: 2000
} 
```

## GET schools specific to admin (Requires Authorization header)
 `https://bw-luncher.herokuapp.com/api/admin/:id/schools`
 - GET request: Where ":id" is the id of the admin currently logged in.
 - Returns array of schools added by the admin.