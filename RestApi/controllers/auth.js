const asyncErrorWrapper = require("express-async-handler");
const User = require("../models/User");

const register = asyncErrorWrapper(async (req, res, next) => {
  const data = req.body;
  console.log(data);

  const { name, email, password } = data;
//   const name = "mehmet";
//   const email = "mehmets@ali.com";
//   const password = "password2";

  const user = await User.create({
    name,
    email,
    password,
  });
  user.save();
  res.status(200).json({
    success: true,
    data: user,
  });
});

const getUsers = asyncErrorWrapper(async (req, res, next) => {
  const data = await User.find();
  res.status(200).json({
    success: true,
    data,
  });
});
module.exports = { register,getUsers };
