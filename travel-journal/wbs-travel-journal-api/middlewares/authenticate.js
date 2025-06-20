import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new Error('Not authenticated', { cause: 401 });

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = { _id };
    next();
  } catch (error) {
    throw new Error('Not authenticated', { cause: 401 });
  }
};

export default authenticate;
