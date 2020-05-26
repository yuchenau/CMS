// 导入 mongoose，底层实现就是 mongodb
const mongoose = require('mongoose');

// 将这个 arrow function 导出
exports.connectToDB = () => {
    // 这些变量是存储在环境变量中，database 的地址是会变的
    const { DB_HOST, DB_PORT, DB_DATABASE } = process.env;
    const connectionString = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
    // const connectionString = 'mongodb://localhost:27017/jr-cms';

    const db = mongoose.connection;
    db.on('connected', () => {
        // 生产环境下使用 winston 替代 console log
        console.log('DB connected');
    });

    db.on('error', (error) => {
        console.log('DB connection failed');
        console.log(error.message);
        process.exit(1);
    });

    db.on('disconnected', () => {
        console.log('mongoose connection is disconnected');
    });

    // 返回 promise 出去
    return mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
};