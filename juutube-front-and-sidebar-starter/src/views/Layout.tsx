// This is for testing purposes only
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <header>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/sidebar">Sidebar</Link>
          </li>
        </ul>
      </header>
      <Outlet />
    </div>
  );
};

export default Layout;
