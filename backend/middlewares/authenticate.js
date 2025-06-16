import User from '../models/User.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import jwt from 'jsonwebtoken';

const authenticate = async (req, res, next) => {
  //  Den Token (Ausweis) aus den Cookies oder dm Authorization Header nehmen
  let { token } = req.cookies;

  // console.log('COOKIES ', req.cookies);

  const { authorization } = req.headers;
  if (authorization) {
    token = authorization.split(' ')[1];
  }
  // Request zurückweisen, wenn gar kein Token geschickt wurde.
  if (!token) throw new ErrorResponse('Not authenticated', 401);

  try {
    // Ist der Token gültig? Wurde er mit unserem SECRET erstellt?
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    // OPTIONAL: Hole weitere Userinformationen aus der Datenbank, z.B. Email oder Berechtigungen
    const user = await User.findById(_id).select('email').lean();
    req.user = user;
  } catch (error) {
    // Fehlernachricht anpassen, wenn Token ungültig war
    console.log(error);
    throw new ErrorResponse('Not authenticated', 401);
  }

  // Wenn alles glatt lief, wird der Request durchgelassen.
  next();
};

export default authenticate;
