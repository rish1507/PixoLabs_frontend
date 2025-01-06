import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';
import { Menu, X } from 'lucide-react';
import './Navbar.css';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false); // Close drawer after clicking
    }
  };
  
  const location = useLocation();
  
  return (
    <nav className="navbar" style={{display: location.pathname === '/' ? 'flex' : 'none'}}>
      <div className="navbar-left">
        <a href="#" className="logo">Pixolabs</a>
        {/* Desktop Navigation */}
        <div className="nav-links desktop-only">
          <a href="#" onClick={() => scrollToSection('get-started')}>Get Started</a>
          <a href="#" onClick={() => scrollToSection('how-it-works')}>How it Works</a>
        </div>
      </div>
      
      {/* Desktop Navigation */}
      <div className="navbar-right desktop-only">
        <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="icon-link">
          <FontAwesomeIcon icon={faDiscord} />
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="icon-link">
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <Link to="/docs" className="docs-link">Docs</Link>
        <Link to="/Login" className="login-link">Log in</Link>
        <Link to="/signup" className="signup-button">Sign up</Link>
      </div>

      {/* Mobile Menu Button */}
      <button className="mobile-menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X size={24} color="white" /> : <Menu size={24} color="white" />}
      </button>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-drawer ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-links">
          <a href="#" onClick={() => scrollToSection('get-started')}>Get Started</a>
          <a href="#" onClick={() => scrollToSection('how-it-works')}>How it Works</a>
          <div className="mobile-social-links">
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faDiscord} /> Discord
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} /> GitHub
            </a>
          </div>
          <Link to="/docs">Docs</Link>
          <Link to="/Login">Log in</Link>
          <Link to="/signup" className="mobile-signup">Sign up</Link>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && <div className="mobile-overlay" onClick={() => setIsMenuOpen(false)} />}
    </nav>
  );
};

export default Navbar;