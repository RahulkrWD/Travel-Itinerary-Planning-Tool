import React from 'react';
import styles from './styles/Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt,
  faCalendarAlt,
  faUsers,
  faQuestionCircle,
  faEnvelope,
  faMobileAlt,
} from '@fortawesome/free-solid-svg-icons';
import { 
  faTwitter, 
  faFacebook, 
  faInstagram,
  faLinkedin
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        {/* Main Footer Content */}
        <div className={styles.footerMain}>
          {/* Quick Links */}
          <div className={styles.footerSection}>
            <h5 className={styles.sectionTitle}>Quick Links</h5>
            <ul className={styles.footerLinks}>
              <li>
                <a href="#" className={styles.footerLink}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.linkIcon} />
                  My Itineraries
                </a>
              </li>
              <li>
                <a href="#" className={styles.footerLink}>
                  <FontAwesomeIcon icon={faCalendarAlt} className={styles.linkIcon} />
                  Trip Planner
                </a>
              </li>
              <li>
                <a href="#" className={styles.footerLink}>
                  <FontAwesomeIcon icon={faUsers} className={styles.linkIcon} />
                  Collaborate
                </a>
              </li>
              <li>
                <a href="#" className={styles.footerLink}>
                  <FontAwesomeIcon icon={faQuestionCircle} className={styles.linkIcon} />
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Company Info */}
          <div className={styles.footerSection}>
            <h5 className={styles.sectionTitle}>Company</h5>
            <ul className={styles.footerLinks}>
              <li><a href="#" className={styles.footerLink}>About Us</a></li>
              <li><a href="#" className={styles.footerLink}>Careers</a></li>
              <li><a href="#" className={styles.footerLink}>Travel Blog</a></li>
              <li><a href="#" className={styles.footerLink}>Press</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className={styles.footerSection}>
            <h5 className={styles.sectionTitle}>Legal</h5>
            <ul className={styles.footerLinks}>
              <li>
                <a href="#" className={styles.footerLink}>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className={styles.footerLink}>
                  Terms of Service
                </a>
              </li>
              <li><a href="#" className={styles.footerLink}>Cookie Policy</a></li>
              <li><a href="#" className={styles.footerLink}>GDPR Compliance</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className={styles.footerSection}>
            <h5 className={styles.sectionTitle}>Contact Us</h5>
            <div className={styles.contactInfo}>
              <a href="mailto:support@travelapp.com" className={styles.contactLink}>
                <FontAwesomeIcon icon={faEnvelope} className={styles.contactIcon} />
                support@travelapp.com
              </a>
              <a href="tel:+18005551234" className={styles.contactLink}>
                <FontAwesomeIcon icon={faMobileAlt} className={styles.contactIcon} />
                +1 (800) 555-1234
              </a>
            </div>
            <div className={styles.socialLinks}>
              <a href="#" aria-label="Twitter" className={styles.socialLink}>
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" aria-label="Facebook" className={styles.socialLink}>
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="#" aria-label="Instagram" className={styles.socialLink}>
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" aria-label="LinkedIn" className={styles.socialLink}>
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {currentYear} TravelEase. All rights reserved.
          </p>
         
        </div>
      </div>
    </footer>
  );
};

export default Footer;