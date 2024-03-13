const express = require('express');
const bodyParser = require('body-parser');
const router = require('./Routes/route');

const PORT = 3300;
const app = express();
app.use(bodyParser.json());



app.use('/' , router);





app.listen(PORT , () => {console.log(`server is lisening on the port ${PORT}`)})