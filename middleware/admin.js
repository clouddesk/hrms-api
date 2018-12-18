module.exports = function(req, res, next) {
    if(req.user.id !== 1) return res.status(403).send('Access forbidden!');
    next();
}