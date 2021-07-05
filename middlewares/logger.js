module.exports = function logger(req, res, next) {
    const { method, originalUrl } = req;
    const time = Date.now()
    console.log(`${method} to ${originalUrl} on ${time}`);
  
    next();
  };