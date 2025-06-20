import User from '../models/User.js';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: true
};

const signup = async (req, res) => {
  const { email, password } = req.body;

  const emailInUse = await User.exists({ email });
  if (emailInUse) throw new Error('Check your credentials', { cause: 200 });

  const salt = await bcrypt.genSalt(13);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = (await User.create({ ...req.body, password: hashedPassword })).toObject();

  const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '1d' });

  delete user.password;

  res.cookie('token', token, cookieOptions);
  res.json({ message: 'hello', user });
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password').lean();
  if (!user) throw new Error('Check your credentials', { cause: 400 });

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Check your credentials', { cause: 400 });

  const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '1d' });

  delete user.password;

  res.cookie('token', token, cookieOptions);
  res.json({ message: 'hello', user });
};

const me = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).lean();

  res.json(user);
};

const signout = async (req, res) => {
  res.clearCookie('token', cookieOptions);

  res.json({ message: 'Signed out' });
};

export { me, signup, signin, signout };
