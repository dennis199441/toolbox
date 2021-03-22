# Example Service

## Run the service
Mount data to `/some/path`

### Build
```
docker-compose build
```

### Start
```
docker-compose up -d
```

### Stop
```
docker-compose down
```

## API Document
some url

## Execute SQL query in repository
```javascript
// Simple query
let data = await db.query("SELECT * FROM example where id = ?", [id])


// Atomic transaction
try {
    await db.beginTransaction();
    
    await db.query("query 1", ["input"]); 
    await db.query("query 2", ["input"]); 
    await db.query("query 3", ["input"]); 
    ...

    await db.commit();
} catch (err) {
    await db.rollback();
}
```