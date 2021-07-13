const response = (message = "", status = false, data = []) => {
  return {
    status,
    message,
    data,
  };
};

module.exports.response = response;
