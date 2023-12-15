const createError = (status, message) => {
    const err = new Error();
    err.status = status;
    err.message = message + "ERROR!";
    return err;
  };
  module.exports = {createError};