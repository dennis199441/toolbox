# Community Service
This file describes the function provided by community service. This service includes CRUD operations of community and members

## Functions
### Add community

Add community with name `community_name`.<br />

Endpoint: /community<br />
HTTP Method: POST<br />
Request Body
```
{
    "community_name": "<community_name>",
}
```

### Get community

Get community information by `community_name`.<br />

Endpoint: /community<br />
HTTP Method: GET<br />
Request Parameter
```
1. community_name
```

### Get community list

Get community list.<br />

Endpoint: /community_list<br />
HTTP Method: GET<br />

### Update community

Update community name.<br />

Endpoint: /update_community<br />
HTTP Method: GET<br />
Request Parameter
```
1. old_community_name
2. new_community_name
```

### Delete community

Delete community by `community_name`.<br />

Endpoint: /remove_community<br />
HTTP Method: GET<br />
Request Parameter
```
1. community_name
```

### Add member

Add member to community.<br />

Endpoint: /member<br />
HTTP Method: POST<br />
Request Body
```
{
    "community_name": "<community_name>",
    "user_id": "<user_id>",
    "description": "<description>",
    "lat": "<latitude>",
    "lng": "longitude"
}
```

### Update member

Update member information.<br />

Endpoint: /update_member<br />
HTTP Method: POST<br />
Request Body
```
{
    "community_name": "<community_name>",
    "user_id": "<user_id>",
    "description": "<description>",
    "lat": "<latitude>",
    "lng": "longitude"
}
```

### Get member

Get member information by `community_name` and `user_id`.<br />

Endpoint: /member<br />
HTTP Method: GET<br />
Request Parameter
```
1. community_name
2. user_id
```

### Get member list

Get member list of community by `community_name`.<br />

Endpoint: /member_list<br />
HTTP Method: GET<br />
Request Parameter
```
1. community_name
```

### Remove member

Remove member from community by `community_name` and `user_id`.<br />

Endpoint: /remove_member<br />
HTTP Method: GET<br />
Request Parameter
```
1. community_name
2. user_id
```
