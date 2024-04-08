function status(req, res) {
  res.status(200).json({ message: "test api " });
}

export default status;
