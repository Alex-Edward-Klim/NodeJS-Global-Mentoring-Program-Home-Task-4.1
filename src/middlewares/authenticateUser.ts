import { NextFunction, Request, Response } from 'express';

import jwt from 'jsonwebtoken';

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers.authorization;

  const token = bearerHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).send('Auth token not provided');
  }

  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err) => {
    if (err) {
      return res.status(403).send('Access denied');
    }

    return next();
  });
};

export default authenticateUser;
