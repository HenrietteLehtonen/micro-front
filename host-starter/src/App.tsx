import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Single from "./views/single/Single";
import Profile from "./views/profile/Profile";
import Upload from "upload/Upload";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./views/Layout";
import Home from "./views/home/Home";

// import UserProvider from mediastore mfe
// Providers are exposed by the mediastore remote. At runtime these become
// federated async imports. Add runtime checks/logs so we can see if they
// resolved correctly in production on the deployed host.
const isProd = import.meta.env.PROD;
const basename = isProd ? "/~hussaink/host" : "/";

import { UserProvider } from "mediastore/UserContext";
import { MediaProvider } from "mediastore/MediaContext";

function App() {
  return (
    
    <Router basename={basename}>
      <UserProvider>
        <MediaProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/single/:id" element={<Single />} />
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/upload"
                element={
                  <ProtectedRoute>
                    <Upload />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </MediaProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
