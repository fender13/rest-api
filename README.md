# rest-api

*LIST ROUTERS*

**Link Deploy**
https://apple-crumble-16847.herokuapp.com/

**User Routes**
No | Route | HTTP | Header(s) | Body | Description
--- | --- | --- | --- | --- | ---
1 | <span style="color:red">/</span> | GET | <span style="color:red">none</span> | <span style="color:red">none</span> | Go to homepage
2 | <span style="color:red">/api/users</span> | GET | <span style="color:red">none</span> | <span style="color:red">none</span> | Get all the users
3 | <span style="color:red">/api/users/:id</span> | GET | <span style="color:red">none</span> | <span style="color:red">none</span> | Get single user
4 | <span style="color:red">/api/users</span> | POST | <span style="color:red">none</span> | <span style="color:red">Name:String (Required), email:string (Required), username:string (Required), password:string (Required)</span> | Create a user
5 | <span style="color:red">/api/users/:id</span> | DELETE | <span style="color:red">none</span> | <span style="color:red">none</span> | Delete a user
6 | <span style="color:red">/api/users/:id</span> | PUT | <span style="color:red">none</span> | <span style="color:red">Name:String (Required), email:string (Required), password:string (Required)</span> | Update a user with new info

**Additional Routes**
No | Route | HTTP | Header(s) | Body | Description
--- | --- | --- | --- | --- | ---
1 | <span style="color:red">/api/signup</span> | POST | <span style="color:red">none</span> | <span style="color:red">Name:String (Required), email:string (Required), username:string (Required), password:string (Required)</span> | Sign up with new user info
2 | <span style="color:red">/api/signin</span> | POST | <span style="color:red">none</span> | <span style="color:red">username:string (Required), password:string (Required)</span> | Sign up with new user info