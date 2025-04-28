import React from 'react';
import { FaInstagram, FaTwitter, FaEnvelope, FaPhone } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-copyright">
          © All Rights Reserved UniMart {currentYear}
        </div>
        <div className="footer-links">
          <a href="/contact" className="footer-link">Contact Us</a>
          <div className="footer-social">
            <a href="https://instagram.com/unimart" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
              <FaInstagram />
            </a>
            <a href="https://twitter.com/unimart" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
              <FaTwitter />
            </a>
            <a href="mailto:contact@unimart.com" className="footer-social-icon">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;