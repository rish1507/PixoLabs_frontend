import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';
import './Navbar.css';

const Navbar = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="#" className="logo">Pixolabs</a>
        <div className="nav-links">
          <a href="#" onClick={() => scrollToSection('get-started')}>Get Started</a>
          <a href="#" onClick={() => scrollToSection('how-it-works')}>How it Works</a>
        </div>
      </div>
      
      <div className="navbar-right">
        <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="icon-link">
          <FontAwesomeIcon icon={faDiscord} />
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="icon-link">
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <Link to="/docs" className="docs-link">Docs</Link>
        <Link to="/login" className="login-link">Log in</Link>
        <Link to="/signup" className="signup-button">Sign up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
