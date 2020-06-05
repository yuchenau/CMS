const { validateToken } = require('../utils/jwt');

module.exports = (req, res, next) => {
    // const obj = {}, obj.a 和 obj['a'] 都是可以取值的
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).send('Access Denied123');
    }
    const contentArray = authHeader.split(' ');
    if (contentArray.length !== 2 || contentArray[0] !==  'Bearer') {
        return res.status(401).send('Invalid token format');
    }
    const decoded = validateToken(contentArray[1]);
    if (!decoded) {
        return res.status(401).send('Access Denied456');
    }
    req.user = decoded;
    return next();
}