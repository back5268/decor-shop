import { adminRouter } from './admin';
import { authRouter } from './auth';
import { infoRouter } from './info';
import { webRouter } from './web';

export const routes = (app) => {
  app.use('/web', webRouter);
  app.use('/admin', adminRouter);
  app.use('/auth', authRouter);
  app.use('/info', infoRouter);
  app.get('/', (req, res) => {
    res.json('Welcome to Decor Shop!');
  });
};
