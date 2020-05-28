module.exports = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        return res.status(400).send(err.message);
    }
    // other errors
    console.error(err);
    // 生产情况下应该尽量避免返回 500 的错误
    return res.status(500).send('something unexpected happened');
}