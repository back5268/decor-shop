import { AuthProvider } from '@context/AuthContext';
import { NavigationScroll, Toastify } from './components/base';
import Routes from './routes';

const App = () => {
  return (
    <AuthProvider>
      <Toastify />
      <NavigationScroll>
        <Routes />
      </NavigationScroll>
    </AuthProvider>
  );
};

export default App;
