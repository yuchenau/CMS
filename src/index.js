require('dotenv').config();

const express = require('express');
const routes = require('./routes');

const { connectToDB } = require('./utils/db');

const app = express();
const PORT= process.env.PORT || 3000;
 
app.get('/', function (req, res) {
  res.send('Hello World');
})

app.use('/api', routes);

connectToDB().then(() => {
    app.listen(PORT, function(){
        console.log(`server listening on port: ${PORT}`);
    });
});
 
