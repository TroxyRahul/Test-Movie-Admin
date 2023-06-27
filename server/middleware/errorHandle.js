const errorHandle = (error, req, res, next) => {
  const status = error.status || 500;
  let message = error.message || "Something went wrong, Please try again";

  if (status === 400) {
    message: `${JSON.stringify(
      error.body
    )}:This payload is not accepted required payload is ${
      error.required
    }`;
  }

  res.status(400).json({
    message: message,
  });
};

module.exports = { errorHandle };
