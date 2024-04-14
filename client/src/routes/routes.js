import { ForgotPassword, SignIn, SignUp } from '@view/auth';

const routes = [
  { path: '/auth/signin', element: SignIn, public: true },
  { path: '/auth/signup', element: SignUp, public: true },
  { path: '/auth/forgot-password', element: ForgotPassword, public: true },

  { path: '/', element: SignIn, public: true }
];

export default routes;
