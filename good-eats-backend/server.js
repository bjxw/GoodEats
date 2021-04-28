const express = require('express');
const cors = require('cors');
const path = require('path')
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI || process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false});
const connection = mongoose.connection;
connection.once('open', () =>{
    console.log("MongoDB database connection established successfully");
})

const placesRouter = require('./routes/places');
app.use('/place', placesRouter);

app.use(express.static(path.join(__dirname, '../good-eats-frontend/build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../good-eats-frontend/build/index.html'))
})

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});