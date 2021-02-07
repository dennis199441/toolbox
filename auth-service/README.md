# auth-service

## User authentication:
Implemented jwt authentication

## API access control
Implemented role-based authorization

Default role: Admin

The following example shows that only users with Admin or Operator roles can access `func()`
```python
@role_required(["Admin", "Operator"])
def func():
    ...
```