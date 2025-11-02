import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn } from 'lucide-react';
import { authService } from '../api/services';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login(formData);
      const { token, user } = response.data;
      login(user, token);

      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/products');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="auth-container"
      >
        <div className="auth-header">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="auth-icon"
          >
            <LogIn size={40} />
          </motion.div>
          <h2>Welcome Back</h2>
          <p>Login to your HostelEase account</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="error-message"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>
              <Mail size={18} />
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>
              <Lock size={18} />
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter your password"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="btn-submit"
            disabled={loading}
          >
            {loading ? <div className="spinner-small"></div> : 'Login'}
          </motion.button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="auth-link">Register here</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
