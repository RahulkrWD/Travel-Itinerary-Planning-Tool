import { useState, useEffect } from 'react';
import { FaConciergeBell, FaDollarSign, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { BiTrip } from 'react-icons/bi';
import styles from './styles/Navbar.module.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`}>
      <div className={styles.container}>
        <a className={`${styles.navbarBrand} m-3`} href="#">
          <BiTrip className={styles.brandIcon} />
          Triplt
        </a>

        <button 
          className={`${styles.navbarToggler} ${mobileMenuOpen ? styles.navbarTogglerActive : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
        >
          <span className={styles.togglerIcon}></span>
        </button>

        <div className={`${styles.navbarCollapse} ${mobileMenuOpen ? styles.navbarCollapseActive : ''}`}>
          <ul className={styles.navbarNav}>
            <div className={styles.navLeft}>
              <li className={styles.navItem}>
                <a className={styles.navLink} href="#">
                  <FaConciergeBell className={styles.navIcon} />
                  How It Works
                </a>
              </li>
              <li className={styles.navItem}>
                <a className={styles.navLink} href="#">
                  <FaDollarSign className={styles.navIcon} />
                  Pricing
                </a>
              </li>
            </div>

            <div className={styles.navRight}>
              <li className={styles.navItem}>
                <Link className={styles.navLink} to="/Sign-In">
                  <FaSignInAlt className={styles.navIcon} />
                  Sign In
                </Link>
              </li>
              <li className={styles.navItem}>
                <button className={styles.signUpButton}>
                  <Link className='text-decoration-none text-light' to="/Sign-Up">
                  <FaUserPlus className={styles.navIcon} />
                  Sign Up - It's Free!
                  </Link>
                 
                </button>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;