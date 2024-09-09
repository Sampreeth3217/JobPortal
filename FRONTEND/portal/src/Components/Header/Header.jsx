import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>Logo</div>
      <div style={styles.rightSection}>
        <nav style={styles.nav}>
          <Link to="/" style={styles.navItem}>Explore Jobs</Link>
          <Link to="/register" style={styles.navItem}>Register</Link>
          <Link to="/login" style={styles.navItem}>Login</Link>
        </nav>
        <Link to="/profile" style={styles.username}>Username</Link>
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between', // Space between logo and right section
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#1a1a1a',
    color: '#fff'
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold'
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  nav: {
    display: 'flex',
    gap: '20px'
  },
  navItem: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '18px'
  },
  username: {
    backgroundColor: '#e0e0e0',
    color: '#000',
    padding: '10px 20px',
    borderRadius: '25px',
    textDecoration: 'none',
    fontSize: '18px'
  }
};

export default Header;
