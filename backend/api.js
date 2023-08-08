require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use('/public', express.static(`${__dirname}/public`));

app.listen(8000, async () => {
    console.log('App is listening on port localhost:8000');
});