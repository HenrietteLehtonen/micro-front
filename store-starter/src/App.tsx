// FOR TESTING PURPOSES ONLY
import { MediaProvider } from './contexts/MediaContext';
import Test from './components/Test';
import { UserProvider } from './contexts/UserContext';

const App = () => {
  return (
    <UserProvider>
      <MediaProvider>
        <Test />;
      </MediaProvider>
    </UserProvider>
  );
};

export default App;
