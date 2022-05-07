import jwt from 'jsonwebtoken';
import { config } from './config';

const signToken = (user) => {
  return jwt.sign(user, config.jwToken, {
    expiresIn: '30d',
  });
};

const isAuth = async (req, res, next) => {
	console.log('inside auth (token): ', req.headers)
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // BEARER XXX
    jwt.verify(token, config.jwToken, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Token is not valid' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'Token is not suppiled' });
  }
};
export { signToken, isAuth };