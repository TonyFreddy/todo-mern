const express = require('express');
const mongoose = require('mongoose');
const PORT = 4000;

const app = express();

app.get('/', (req, res) => {
    res.send("Hi Again");
});

mongoose.connect('mongodb://tony:tonydrzzdj@ac-psbcp8z-shard-00-00.xqet5tc.mongodb.net:27017,ac-psbcp8z-shard-00-01.xqet5tc.mongodb.net:27017,ac-psbcp8z-shard-00-02.xqet5tc.mongodb.net:27017/?ssl=true&replicaSet=atlas-5zuooj-shard-0&authSource=admin&appName=todo')
.then(() => {
    console.log('Connected to the database');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((err) => {
    console.log('Connection failed', err.message);
});

//tonydrzzdj