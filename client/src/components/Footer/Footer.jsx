// Footer.js

import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope} from "@fortawesome/free-solid-svg-icons";
import { faPhone} from "@fortawesome/free-solid-svg-icons";


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2>TECHXUS</h2>
        <p><FontAwesomeIcon icon={faEnvelope} /> muthigaerick@gmail.com</p>
       <p><FontAwesomeIcon icon={faPhone} /> 0112205506</p>
       {/* <a href="https://github.com/ErickMigwi"><FontAwesomeIcon icon={faGithub} />ErickMigwi</a> */}
        <p>&copy; 2023 Your Company. All rights reserved.</p>
        <p>
          Designed with ❤️ by{' '}
          <a href="https://github.com/ErickMigwi" target="_blank" rel="noopener noreferrer">
            Erick Migwi
          </a>
        </p>
        <div className="divider"></div>
        <div className="social-icons">
        
          {/* <a href="#" target="_blank" rel="noopener noreferrer">
        
            Social Media
          </a> */}
      
        </div>
      </div>
    </footer>
  );
}

export default Footer;
