import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Single from "./views/single/Single";
import Profile from "./views/profile/Profile";
import Upload from "upload/Upload";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./views/Layout";
import Home from "./views/home/Home";

// import UserProvider from mediastore mfe
import { UserProvider } from "mediastore/UserContext";
import { MediaProvider } from "mediastore/MediaContext";

function App() {
  return (
    <Router>
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
