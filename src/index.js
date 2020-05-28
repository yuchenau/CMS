require('dotenv').config();

const express = require('express');
require('express-async-errors');

const routes = require('./routes');

const { connectToDB } = require('./utils/db');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT= process.env.PORT || 3000;
 
app.get('/', function (req, res) {
  res.send('Hello World');
})

app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);

connectToDB().then(() => {
    app.listen(PORT, function(){
        console.log(`server listening on port: ${PORT}`);
    });
});