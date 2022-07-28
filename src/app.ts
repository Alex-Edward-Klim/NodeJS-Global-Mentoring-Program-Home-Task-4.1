import express, { NextFunction, Request, Response } from 'express';

import cors from 'cors';

import 'express-async-errors';

import morgan from 'morgan';

import usersRoutes from './routes/users';
import groupsRoutes from './routes/groups';

import loginRouter from './routes/login';
import authenticateUser from './middlewares/authenticateUser';

import logger from './logger';

const app = express();

app.use(cors());

app.use((req, res, next) => {
  express.json()(req, res, (err) => {
    if (err) {
      return res.status(400).send('Incorrect JSON format');
    }

    return next();
  });
});

app.use(morgan(':response-time ms'));

app.use((req, res, next) => {
  const objectToLog = {
    method: req.method,
    params: req.query,
    body: req.body,
    url: req.originalUrl,
  };
  logger.info(objectToLog);
  next();
});

process.on('uncaughtException', (error) => {
  logger.error(`captured error: ${error.message}`);
  // const { exit } = process;
  // exit(1);
});

process.on('unhandledRejection', (reason) => {
  if (reason instanceof Error) {
    logger.error(`Unhandled rejection detected: ${reason.message}`);
    return;
  }
  logger.error(`Unhandled rejection detected: ${reason}`);
});

app.use('/api/users', authenticateUser, usersRoutes);
app.use('/api/groups', authenticateUser, groupsRoutes);

app.use('/api/login', loginRouter);

app.use((req, res) => {
  const err = {
    status: 404,
    message: 'URL not found',
  };

  res.status(404).json(err);
});

app.use(async (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    if (res.headersSent) {
      next(err);
    } else {
      logger.error(err.message);
      res.status(err.status || 500).send(err.message);
    }
  }
});

// throw new Error('custom err');

export default app;
