const bcrypt = require('bcrypt');

const password = "123";

const hashed = bcrypt.hashSync(password, 12);
console.log(hashed);