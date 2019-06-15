# Group Service
This file describes the function provided by group service. This service includes CRUD operations of group and members

## Functions
### Add group

Create group.<br />

Endpoint: /group<br />
HTTP Method: POST<br />
Request Body
```
{
    "group_name": "<group_name>",
    "description": "<description>"
}
```

### Get group

Get group information by `group_id`.<br />

Endpoint: /group<br />
HTTP Method: GET<br />
Request Parameter
```
1. group_id
```

### Get group list

Get group list.<br />

Endpoint: /group_list<br />
HTTP Method: GET<br />

### Update group

Update group name.<br />

Endpoint: /update_group<br />
HTTP Method: GET<br />
Request Parameter
```
1. group_id
2. group_name
3. group_desc
```

### Delete group

Delete group by `group_id`.<br />

Endpoint: /remove_group<br />
HTTP Method: GET<br />
Request Parameter
```
1. group_id
```

### Add member

Add member to group.<br />

Endpoint: /member<br />
HTTP Method: POST<br />
Request Body
```
{
    "group_id": "<group_id>",
    "user_id": "<user_id>",
    "description": "<description>",
    "role": "<role>"
}
```

### Update member

Update member information.<br />

Endpoint: /update_member<br />
HTTP Method: POST<br />
Request Body
```
{
    "group_id": "<group_id>",
    "user_id": "<user_id>",
    "description": "<description>",
    "role": "<role>"
}
```

### Get member

Get member information by `group_name` and `user_id`.<br />

Endpoint: /member<br />
HTTP Method: GET<br />
Request Parameter
```
1. group_id
2. user_id
```

### Get member list

Get member list of group by `group_name`.<br />

Endpoint: /member_list<br />
HTTP Method: GET<br />
Request Parameter
```
1. group_id
```

### Remove member

Remove member from group by `group_name` and `user_id`.<br />

Endpoint: /remove_member<br />
HTTP Method: GET<br />
Request Parameter
```
1. group_id
2. user_id
```
