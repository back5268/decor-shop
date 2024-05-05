import { AuthProvider } from '@context/AuthContext';
import { ConfirmDialog, LazyLoading, NavigationScroll, ScrollToTop, Toastify } from './components/base';
import Routes from './routes';

const App = () => {
  return (
    <AuthProvider>
      <ConfirmDialog />
      <Toastify />
      <LazyLoading />
      <ScrollToTop />
      <NavigationScroll>
        <Routes />
      </NavigationScroll>
    </AuthProvider>
  );
};

export default App;
