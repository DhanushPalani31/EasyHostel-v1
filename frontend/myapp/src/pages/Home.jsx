import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Package, Zap, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <ShoppingBag size={40} />,
      title: 'Easy Ordering',
      description: 'Order your hostel essentials with just a few clicks'
    },
    {
      icon: <Package size={40} />,
      title: 'Wide Selection',
      description: 'Snacks, stationery, toiletries, and more'
    },
    {
      icon: <Zap size={40} />,
      title: 'Fast Delivery',
      description: 'Get your items delivered right to your hostel room'
    },
    {
      icon: <Shield size={40} />,
      title: 'Secure & Reliable',
      description: 'Safe payments and order tracking'
    }
  ];

  return (
    <div className="home-page">
      <motion.section
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="hero-title"
          >
            Your Hostel Essentials,
            <br />
            <span className="gradient-text">Just a Click Away</span>
          </motion.h1>

          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="hero-description"
          >
            HostelEase makes it simple for students to get everything they need without leaving their room
          </motion.p>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="hero-buttons"
          >
            {user ? (
              <Link to="/products" className="btn-hero-primary">
                Browse Products
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn-hero-primary">
                  Get Started
                </Link>
                <Link to="/login" className="btn-hero-secondary">
                  Login
                </Link>
              </>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="hero-image"
        >
          <div className="floating-card">
            <ShoppingBag size={80} className="floating-icon" />
          </div>
        </motion.div>
      </motion.section>

      <section className="features-section">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="section-title"
        >
          Why Choose HostelEase?
        </motion.h2>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="feature-card"
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
