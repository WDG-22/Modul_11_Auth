import User from '../models/User.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createToken = (_id) =>
  jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN + 'd',
  });

const setAuthCookie = (res, token) => {
  const secure = !['development', 'test'].includes(process.env.NODE_ENV); // "production", "development", "test"

  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'none',
    secure,
    expires: new Date(Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000), // ein Tag gültig
  });
};

const registerUser = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  // Email überprüfen
  const emailInUse = await User.exists({ email });
  if (emailInUse) throw new ErrorResponse('Go to login', 200);

  // Passwort absichern
  const salt = await bcrypt.genSalt(15);
  const hashedPW = await bcrypt.hash(password, salt);

  //  User abspeichern
  const user = await User.create({ firstName, lastName, email, password: hashedPW });

  // console.log(user);
  delete user.password;

  const token = createToken(user._id);

  setAuthCookie(res, token);

  res.json({ message: 'Go to login', token, user });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password').lean();
  if (!user) throw new ErrorResponse('Invalid credentials', 401);

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new ErrorResponse('Invalid credentials', 401);

  delete user.password;

  const token = createToken(user._id);

  setAuthCookie(res, token);

  res.json({ message: 'Hier ist dein Ausweis...', user, token });
};

export { registerUser, login };
