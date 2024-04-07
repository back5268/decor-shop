import { authRouter } from './auth';
import { infoRouter } from './info';

export const routes = (app) => {
  app.use('/auth', authRouter);
  app.use('/info', infoRouter);
  app.get('/', (req, res) => {
    res.json('Welcome to Decor Shop!');
  });
};
