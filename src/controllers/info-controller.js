const info = (req, res) => {
  return res.json({
    succes: true,
    message: "API is live",
    error: {},
    data: {},
  });
};

module.exports = {
  info,
};
