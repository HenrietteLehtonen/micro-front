import "./App.css";

import Profile from "./components/ProfileView";
// Provide mediastore providers in preview so hooks like useUserContext work
import { UserProvider } from "mediastore/UserContext";
import { MediaProvider } from "mediastore/MediaContext";

function App() {
  return (
    <UserProvider>
      <MediaProvider>
        <Profile />
      </MediaProvider>
    </UserProvider>
  );
}

export default App;
