// Add this to the VERY top of the first file loaded in your app
const apm = require('elastic-apm-node').start({
    // Override service name from package.json
    // Allowed characters: a-z, A-Z, 0-9, -, _, and space
    serviceName: 'process.env.ELASTIC_APM_SERVICE_NAME',

    // Use if APM Server requires a token
    secretToken: 'process.env.ELASTIC_APM_SECRET_TOKEN',

    // Use if APM Server uses API keys for authentication
    apiKey: '',

    // Set custom APM Server URL (default: http://localhost:8200)
    serverUrl: 'process.env.ELASTIC_APM_SERVER_URL',
    //environment: 'process.env.ELASTIC_APM_ENV'
})

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
    const user = req.body;
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('mydb').collection('users').insertOne({
        id: parseInt(user.id),
        fname: user.fname,
        lname: user.lname,
        username: user.username,
        email: user.email,
        avatar: user.avatar
    });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "User with ID = " + user.id + " is created",
        "user": user
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
            email: user.email,
            avatar: user.avatar
        }
    });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "User with ID = " + id + " is updated",
        "user": user
    });
})

app.delete('/users/delete', async (req, res) => {
    const id = parseInt(req.body.id);
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('mydb').collection('users').deleteOne({ 'id': id });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "User with ID = " + id + " is deleted"
    });
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})