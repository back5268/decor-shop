import { NavigationScroll, Toastify } from './components/base';
import Routes from './routes';

const App = () => {
  return (
    <>
      <Toastify />
      <NavigationScroll>
        <Routes />
      </NavigationScroll>
    </>
  );
};

export default App;