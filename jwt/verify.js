const jwt = require('jsonwebtoken');

const secret = 'long secret';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTkxMzM0MDQyfQ.r1bq8b3OybgFRAxm_4dJaZeqHJmee6oSFP__7ru9wTs';

const valid = jwt.verify(token, secret);

console.log(valid);