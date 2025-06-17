import ErrorResponse from '../utils/ErrorResponse.js';

const hasRole =
  (...roles) =>
  (req, res, next) => {
    const { id } = req.params;

    if (roles.includes('self') && req.user._id.toString() === id) {
      return next();
    }

    if (!roles.includes(req.user)) {
      throw new ErrorResponse('Not Authorized', 403);
    }

    next();
  };

export default hasRole;
