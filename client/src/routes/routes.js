import { Dashboard } from '@view/admin';
import { Logs, Templates } from '@view/admin/configs';
import { DetailPermission, Permissions } from '@view/admin/permissions';
import { Customers, Personnel } from '@view/admin/users';
import { DetailProduct, Products, Promotions } from '@view/admin/warehouse';
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
  { path: '/admin/logs', element: Logs, layout: 'admin' },
  { path: '/admin/templates', element: Templates, layout: 'admin' },

  { path: '/admin/permissions', element: Permissions, layout: 'admin' },
  { path: '/admin/permissions/create', element: DetailPermission, layout: 'admin' },
  { path: '/admin/permissions/detail/:_id', element: DetailPermission, layout: 'admin' },

  { path: '/admin/products', element: Products, layout: 'admin' },
  { path: '/admin/products/create', element: DetailProduct, layout: 'admin' },
  { path: '/admin/products/detail/:_id', element: DetailProduct, layout: 'admin' },
  { path: '/admin/promotions', element: Promotions, layout: 'admin' },
];

export default routes;
