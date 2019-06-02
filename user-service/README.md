# User Service
This file describes the function provided by user service.

## Functions
### Login function
Endpoint: /auth/login<br />
HTTP Method: POST<br />
Request Body
```
{
    "username": "myUsername",
    "password": "myPassword",
}
```

### Create User
Endpoint: /user<br />
HTTP Method: POST<br />
Request Body
```
{
    "username": "myUsername",
    "email": "myEmail@email.com",
    "password": "myPassword",
}
```

### Change Password
Endpoint: /change_password<br />
HTTP Method: POST<br />
Request Body
```
{
    "username": "myUsername",
    "password": "myPassword"
}
```

### Activate User
Endpoint: /activate/{username}<br />
HTTP Method: GET<br />

### Deactivate User
Endpoint: /deactivate/{username}<br />
HTTP Method: GET<br />

### Get User Information
Endpoint: /user/{username}<br />
HTTP Method: GET<br />
