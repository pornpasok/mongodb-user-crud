const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

const path = require('path');
const router = express.Router();

app.use(cors())
app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
    //__dirname : It will resolve to your project folder.
});
   
router.get('/style.css',function(req,res){
    res.sendFile(path.join(__dirname+'/style.css'));
});
   
router.get('/script.js',function(req,res){
    res.sendFile(path.join(__dirname+'/script.js'));
});

app.use('/', router);

const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI;

app.post('/users/create', async (req, res) => {
    // Gen Password
    var generator = require('generate-password');
    var password = generator.generate({
        length: 10,
        numbers: true
    });
    console.log(password);

    const user = req.body;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('mydb').collection('users').insertOne({
        id: parseInt(user.id),
        fname: user.fname,
        lname: user.lname,
        username: user.username,
        dbname: user.dbname,
        role: user.role,
        email: user.email,
        expiredate: user.expiredate,
        status: 'active'
    });

    // Create DB User
    const db = client.db(user.dbname);
    await db.command({
        createUser: user.username,
        pwd: password,
        roles: [{role: user.role, db: user.dbname}],
    });

    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "User with ID = " + user.id + " is created",
        "user": user
    });

    // Send Mail to User
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_KEY
      }
    });
    
    var mailOptions = {
      from: 'ton350d@gmail.com',
      to: user.email,
      subject: 'MongoDB Information',
      text: 'Username: ' + user.username + '\nPassword: ' + password + '\nDB: ' + user.dbname + '\nRole: ' + user.role + '\nExpire Date: ' + user.expiredate
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
})

app.get('/users', async (req, res) => {
    const id = parseInt(req.params.id);
    const client = new MongoClient(uri);
    await client.connect();
    const users = await client.db('mydb').collection('users').find({}).toArray();
    await client.close();
    res.status(200).send(users);
})

app.get('/users/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const client = new MongoClient(uri);
    await client.connect();
    const user = await client.db('mydb').collection('users').findOne({ "id": id });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "user": user
    });
})

app.put('/users/update', async (req, res) => {
    // Gen Password
    var generator = require('generate-password');
    var password = generator.generate({
        length: 10,
        numbers: true
    });
    console.log(password);

    const user = req.body;
    const id = parseInt(user.id);
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('mydb').collection('users').updateOne({ 'id': id }, {
        "$set": {
            id: parseInt(user.id),
            fname: user.fname,
            lname: user.lname,
            username: user.username,
            dbname: user.dbname,
            role: user.role,
            email: user.email,
            expiredate: user.expiredate,
            status: 'active'
        }
    });

    // Update DB User
    const db = client.db(user.dbname);
    await db.command({
        updateUser: user.username,
        pwd: password,
        roles: [{role: user.role, db: user.dbname}],
    });

    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "User with ID = " + id + " is updated"
    });

    // Send Mail to User
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_KEY
      }
    });
    
    var mailOptions = {
      from: 'ton350d@gmail.com',
      to: user.email,
      subject: 'MongoDB Information',
      text: 'Username: ' + user.username + '\nPassword: ' + password + '\nDB: ' + user.dbname + '\nRole: ' + user.role + '\nExpire Date: ' + user.expiredate
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
})

// app.delete('/users/delete', async (req, res) => {
//     const id = parseInt(req.body.id);
//     const client = new MongoClient(uri);
//     await client.connect();
//     await client.db('mydb').collection('users').deleteOne({ 'id': id });
//     await client.close();
//     res.status(200).send({
//         "status": "ok",
//         "message": "User ID = " + id + " is deleted"
//     });
// })

// Delete with Update Status
app.put('/users/delete', async (req, res) => {
  const user = req.body;
  const id = parseInt(user.id);
  const client = new MongoClient(uri);
  await client.connect();
  await client.db('mydb').collection('users').updateOne({ 'id': id }, {
      "$set": {
          id: parseInt(user.id),
          status: 'delete'
      }
  });

  console.log('userrname: ' +user.username)
  console.log('dbname: ' +user.dbname)
  
  // Delete DB User
  const db = client.db(user.dbname);
  await db.command({
      dropUser: user.username
  });
  
  await client.close();
  res.status(200).send({
      "status": "ok",
      "message": "User  = " + user.username + " is delete"
  });

  // Send Mail to User
  /*
  var nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_KEY
    }
  });
  
  var mailOptions = {
    from: 'ton350d@gmail.com',
    to: user.email,
    subject: 'MongoDB Information',
    text: 'Username: ' + user.username + '\nPassword: ' + password + '\nDB: ' + user.dbname + '\nRole: ' + user.role + '\nExpire Date: ' + user.expiredate
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  */
})




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})