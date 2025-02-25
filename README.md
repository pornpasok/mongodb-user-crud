# mongodb-user-crud

### Native Nodejs
```
# Export ENV
export MONGODB_URI="mongodb+srv://XXX:XXX@cluster0.yuxvtce.mongodb.net/?retryWrites=true&w=majority"
export EMAIL_USER="XXX@gmail.com"
export EMAIL_KEY="XXX"

# Usage
npm install express cors mongodb generate-password nodemailer 
node server.js
```

### Docker
```
# Build
docker build -t mongodb-user-crud .

# Run
docker run -d -p 3000:3000 \
-e MONGODB_URI="mongodb+srv://XXX:XXX@cluster0.yuxvtce.mongodb.net/?retryWrites=true&w=majority" \
mongodb-user-crud

```

### Check App
http://localhost:3000

![mongodb-express-crud](images/mongodb-express-crud.png)


### Ref
https://nodemailer.com/usage/using-gmail/
https://karnyong.medium.com/%E0%B9%80%E0%B8%82%E0%B8%B5%E0%B8%A2%E0%B8%99-api-%E0%B8%AA%E0%B8%B3%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A-crud-%E0%B8%82%E0%B9%89%E0%B8%AD%E0%B8%A1%E0%B8%B9%E0%B8%A5-%E0%B8%94%E0%B9%89%E0%B8%A7%E0%B8%A2-express-js-%E0%B9%81%E0%B8%A5%E0%B8%B0-mongodb-62b6b799b280