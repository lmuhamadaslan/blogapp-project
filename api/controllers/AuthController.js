import User from '../models/UsersModel.js';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  // check email and user
  const check = await User.findAll({
    where: {
      [Op.or]: [{ username: req.body.username }, { email: req.body.email }],
    },
  });
  if (check.length > 0)
    return res.status(409).json('Username or email already exists');

  // hash password and create user
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  try {
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    res.status(200).json('User has been created!');
  } catch (error) {
    res.json(error);
  }
};

export const login = async (req, res) => {
  // check username
  const user = await User.findAll({
    where: {
      username: {
        [Op.eq]: req.body.username,
      },
    },
  });
  if (user.length === 0) return res.status(409).json('Username not found');

  // check password
  const isPasswordCorrect = bcrypt.compareSync(req.body.password, user[0].password);
  if (!isPasswordCorrect) return res.status(400).json("Username or password is incorect")

  const token = jwt.sign({id: user[0].id}, "jwtkey")
  const {id, email, password, img, ...other} = user[0].dataValues

  res.cookie("access_token", token, {
    httpOnly: true,
    sameSite:"none",
    secure: true
  }).status(200).json(other)

};

export const logout = async (req, res) => {
  
  res.clearCookie("access_token", {
    sameSite:"none",
    secure: true
  }).status(200).json("User has been logout")
};
