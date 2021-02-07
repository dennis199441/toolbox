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

### Build
```bash
docker-compose build
```

### Run
```bash
docker-compose up -d
```

### Stop
```bash
docker-compose down
```