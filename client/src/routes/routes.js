import { ForgotPassword, SignIn, SignUp } from '@view/auth';
import { Home } from '@view/web';

const routes = [
  { path: '/auth/signin', element: SignIn, public: true },
  { path: '/auth/signup', element: SignUp, public: true },
  { path: '/auth/forgot-password', element: ForgotPassword, public: true },

  { path: '/', element: Home, public: true, layout: 'admin' }
];

export default routes;
