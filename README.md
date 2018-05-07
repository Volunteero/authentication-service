# AuthenticationBackend

### Mock API
##### ``POST http://demo8679439.mockable.io/auth/register ``
##### ``POST http://demo8679439.mockable.io/auth/login    ``


### How to use?

#### /auth
For authentication </br></br>
GET **/access** </br>
```
Input (In querystring)

accessToken: { 
    type: 'string',
    required: true,
}
resource: {
    type: 'string',
    required: true,
},
action: {
    type: 'string',
    required: true,
}

Output
{
    allowed: true/false
}
```
POST **/register** </br>
```
Input (In body)

username: {
    type: 'string',
    required: true,
},
password: {
    type: 'string',
    required: true,
    minLength: 6,
    pattern:
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
},

Output
{
    success: true
}
/
{
    code: "",
    message: ""
}
```
POST **/login** </br>
```
Input (In body)

username: {
    type: 'string',
    required: true,
},
password: {
    type: 'string',
    required: true,
    minLength: 6,
    pattern:
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
},

Output
{
    success: true
}
/
{
    code: "",
    message: ""
}
```
POST **/refresh** </br>
```
Input (In querystring)

accessToken: { 
    type: 'string',
    required: true,
}
resource: {
    type: 'string',
    required: true,
},
action: {
    type: 'string',
    required: true,
}

Output
{
    accessToken: ""
}
```

#### /internal
You can create and manage users and roles. </br></br>
**All of the requests require a set of accessKey and secretAccessKey that are later passed thorugh the query string ``?accessKey=<YOUR_KEY_HERE>&secretAccessKey=<YOUR_SECRET_KEY_HERE>``** </br/>

Everything works with permissions for actions on certain resources. For example, you can create a role called **myRole** that has permissions to **delete** (action) on **organisation:1234** (resource). You can then create a user called **myUser** and attach the **myRole** you just created. That would mean that **myUser** has permission to **delete** **organisation:1234** resource.

POST **/users/create** </br>
```
Input (In body)

username: { 
    type: 'string',
    required: true,
}

Output
{
    username: ""
}
```
POST **/users/getRoles** </br>
```
Input (In body)

username: { 
    type: 'string',
    required: true,
}

Output
{
    username: "",
    roles: [""]
}
```
POST **/users/attachRoles** </br>
```
Input (In body)

username: {
    type: 'string',
    required: true,
},
roles: {
    type: 'array',
    items: {
        type: 'string'
    },
    required: true,
}

Output
{
    username: "",
    newRoles: [""]
}
```
POST **/users/detachRoles** </br>
```
Input (In body)

username: {
    type: 'string',
    required: true,
},
roles: {
    type: 'array',
    items: {
        type: 'string'
    },
    required: true,
}

Output
{
    username: "",
    detachedRoles: [""]
}
```
POST **/roles/create** </br>
```
Input (In body)

roleName: {
    type: 'string',
    required: true,
},
resources: {
    type: 'array',
    items: {
        type: 'string'
    },
    required: true,
},
actions: {
    type: 'array',
    items: {
        type: 'string'
    },
    required: true,
}

Output
{
    "roleName": "",
    "resources": [
        ""
    ],
    "actions": [
        ""
    ]
}
```
POST **/roles/getPermissions** </br>
```
Input (In body)

roleName: {
    type: 'string',
    required: true,
}

Output
{
    "roleName": "",
    "permissions": {
        RESOURCE_NAME: [ "permissions" ]
    }
}
```
POST **/roles/addPermissions** </br>
```
Input (In body)

roleName: {
    type: 'string',
    required: true,
},
resources: {
    type: 'array',
    items: {
        type: 'string'
    },
    required: true,
},
actions: {
    type: 'array',
    items: {
        type: 'string'
    },
    required: true,
}

Output
{
    "roleName": "",
    "resources": [
        ""
    ],
    "actions": [
        ""
    ]
}
```
POST **/roles/removePermissions** </br>

```
Input (In body)

roleName: {
    type: 'string',
    required: true,
},
resources: {
    type: 'array',
    items: {
        type: 'string'
    },
    required: true,
},
actions: {
    type: 'array',
    items: {
        type: 'string'
    },
    required: true,
}

Output
{
    "roleName": "",
    "resources": [
        ""
    ],
    "actions": [
        ""
    ]
}
```


### Local Deployment
* ``git clone git@github.com:Volunteroo/AuthenticationBackend.git``
* ``cd authentication-service``
* ``copy the .env file to the root directory``
* ``npm install``
* ``npm run dev``
* Service available at localhost:3000
