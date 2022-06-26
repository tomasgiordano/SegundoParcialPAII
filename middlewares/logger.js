const logger = (req, res, next) => {
    console.log(`Pasaste por el logger`);
    next();
  };

module.exports = logger;