function errorHandler(err, req, res, next) {
  console.log('err');
  if (err.status) {
    res.status(err.status).json({
      message: err.message,
    });
  } else if (err.name == "SequelizeValidationError") {
    let errors = [];
    for (let i = 0; i < err.errors.length; i++) {
      errors.push({ message: err.errors[i].message });
    }
    console.log(err);
    res.status(400).json(errors);
  } else {
    res.status(500).json(err);
  }
}

module.exports = errorHandler;
