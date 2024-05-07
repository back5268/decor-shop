import { Dashboard } from '@view/admin';
import { Customers, Personnel } from '@view/admin/users';
import { ForgotPassword, SignIn, SignUp } from '@view/auth';
import { Home } from '@view/web';

const routes = [
  { path: '/auth/signin', element: SignIn, public: true },
  { path: '/auth/signup', element: SignUp, public: true },
  { path: '/auth/forgot-password', element: ForgotPassword, public: true },

  { path: '/', element: Home, public: true, layout: 'web' },
  { path: '/admin', element: Dashboard, layout: 'admin' },
  { path: '/admin/personnel', element: Personnel, layout: 'admin' },
  { path: '/admin/customers', element: Customers, layout: 'admin' },
];

export default routes;
