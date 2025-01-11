const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db')
const app = express();
const port = 5000;

app.use(cors());

app.use(morgan('dev'));
app.use(express.json())

connectDB()



app.listen(port, () => {
    console.log(`Server działa na porcie: ${port}`)
})