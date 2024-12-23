import React from 'react';
import './Footer.css';
import PrivacyPolicyPDF from '../../assets/Privacy Policy.pdf';
const Footer = () => {
    const handlePrivacyPolicyClick = (e) => {
      e.preventDefault();
      window.open(PrivacyPolicyPDF, '_blank', 'noopener,noreferrer');
    };
  
    return (
      <footer className="footer">
        <div className="footer-container">
          <span className="copyright">
            Copyright © 2024 HumanLayer. All rights reserved.
          </span>
          <div className="footer-links">
            <a href="/terms" className="footer-link">
              Terms of Use
            </a>
            <a 
              href="#" 
              onClick={handlePrivacyPolicyClick}
              className="footer-link"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;