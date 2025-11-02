import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, LogOut, LayoutDashboard, Package } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="navbar"
    >
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <ShoppingBag className="brand-icon" />
          <span>HostelEase</span>
        </Link>

        <div className="navbar-links">
          {user ? (
            <>
              <Link to="/products" className="nav-link">
                <Package size={18} />
                Products
              </Link>

              {user.role === 'admin' ? (
                <Link to="/admin" className="nav-link">
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
              ) : (
                <Link to="/orders" className="nav-link">
                  <ShoppingBag size={18} />
                  My Orders
                </Link>
              )}

              <div className="user-menu">
                <span className="user-name">
                  <User size={18} />
                  {user.name}
                </span>
                <button onClick={handleLogout} className="btn-logout">
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-primary">Login</Link>
              <Link to="/register" className="btn-secondary">Register</Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
