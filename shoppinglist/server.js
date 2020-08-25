const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();
const itemsRouter = require('./routes/api/items');
//app.use(bodyParser.json());

//DB Config
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser: true,useCreateIndex: true,useUnifiedTopology:true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established successfully");
});


app.use('/api/items',itemsRouter);

app.listen(port,()=> console.log(`Server is running on port: ${port}`))