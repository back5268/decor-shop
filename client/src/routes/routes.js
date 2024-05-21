import { Dashboard, DetailPermission, Permissions } from '@view/admin';
import { Logs, News, Templates } from '@view/admin/configs';
import { Carts, Orders, Transactions } from '@view/admin/transactions';
import { Customers, Personnel } from '@view/admin/users';
import { DetailProduct, DetailPromotion, Products, Promotions } from '@view/admin/warehouse';
import { ForgotPassword, SignIn, SignUp } from '@view/auth';
import { About, Home, Payment, WebProducts } from '@view/web';

const routes = [
  { path: '/auth/signin', element: SignIn, public: true },
  { path: '/auth/signup', element: SignUp, public: true },
  { path: '/auth/forgot-password', element: ForgotPassword, public: true },

  { path: '/', element: Home, public: true, layout: 'web' },
  { path: '/about', element: About, public: true, layout: 'web' },
  { path: '/products/:slug', element: WebProducts, public: true, layout: 'web' },
  { path: '/payment', element: Payment, public: true, layout: 'web' },

  { path: '/admin', element: Dashboard, layout: 'admin' },
  { path: '/admin/personnel', element: Personnel, layout: 'admin' },
  { path: '/admin/customers', element: Customers, layout: 'admin' },

  { path: '/admin/carts', element: Carts, layout: 'admin' },
  { path: '/admin/orders', element: Orders, layout: 'admin' },
  { path: '/admin/transactions', element: Transactions, layout: 'admin' },
  
  { path: '/admin/news', element: News, layout: 'admin' },
  { path: '/admin/logs', element: Logs, layout: 'admin' },
  { path: '/admin/templates', element: Templates, layout: 'admin' },

  { path: '/admin/permissions', element: Permissions, layout: 'admin' },
  { path: '/admin/permissions/create', element: DetailPermission, layout: 'admin' },
  { path: '/admin/permissions/detail/:_id', element: DetailPermission, layout: 'admin' },

  { path: '/admin/products', element: Products, layout: 'admin' },
  { path: '/admin/products/create', element: DetailProduct, layout: 'admin' },
  { path: '/admin/products/detail/:_id', element: DetailProduct, layout: 'admin' },

  { path: '/admin/promotions', element: Promotions, layout: 'admin' },
  { path: '/admin/promotions/create', element: DetailPromotion, layout: 'admin' },
  { path: '/admin/promotions/detail/:_id', element: DetailPromotion, layout: 'admin' }
];

export default routes;
