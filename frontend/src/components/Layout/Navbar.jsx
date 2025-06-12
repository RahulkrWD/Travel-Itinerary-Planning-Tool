import { useState, useEffect } from 'react';
import { 
  FaConciergeBell, 
  FaDollarSign, 
  FaSignInAlt, 
  FaUserPlus, 
  FaUserCircle,
  FaMapMarkedAlt,
  FaSuitcase,
  FaSignOutAlt,
} from 'react-icons/fa';
import { BiTrip } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/AuthSlice';
import styles from './styles/Navbar.module.css';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`}>
      <div className={styles.container}>
        <Link to="/" className={`${styles.navbarBrand}`}>
          <BiTrip className={styles.brandIcon} />
          <span className={styles.brandName}>Triplt</span>
        </Link>

        {/* Mobile menu toggle */}
        <button 
          className={`${styles.navbarToggler} ${mobileMenuOpen ? styles.navbarTogglerActive : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
        >
          <span className={styles.togglerIcon}></span>
        </button>

        {/* Main navigation */}
        <div className={`${styles.navbarCollapse} ${mobileMenuOpen ? styles.navbarCollapseActive : ''}`}>
          <ul className={styles.navbarNav}>
            {/* Left-aligned navigation items */}
            <div className={styles.navLeft}>
              <li className={styles.navItem}>
                <Link className={styles.navLink} to="/how-it-works">
                  <FaConciergeBell className={styles.navIcon} />
                  How It Works
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link className={styles.navLink} to="/pricing">
                  <FaDollarSign className={styles.navIcon} />
                  Pricing
                </Link>
              </li>
              {token && (
                <>
                  <li className={styles.navItem}>
                    <Link className={styles.navLink} to="/my-trips">
                      <FaMapMarkedAlt className={styles.navIcon} />
                      My Trips
                    </Link>
                  </li>
                  <li className={styles.navItem}>
                    <Link className={styles.navLink} to="/planner">
                      <FaSuitcase className={styles.navIcon} />
                      Planner
                    </Link>
                  </li>
                </>
              )}
            </div>

            {/* Right-aligned navigation items */}
            <div className={styles.navRight}>
              {!token ? (
                <>
                  <li className={styles.navItem}>
                    <Link className={styles.navLink} to="/Sign-In">
                      <FaSignInAlt className={styles.navIcon} />
                      Sign In
                    </Link>
                  </li>
                  <li className={styles.navItem}>
                    <Link className={`${styles.signUpButton} text-decoration-none`} to="/Sign-Up">
                      <FaUserPlus className={styles.navIcon} />
                      Sign Up - It's Free!
                    </Link>
                  </li>
                </>
              ) : (
                <>
                   <li className={styles.navItem}>
                    <Link className={styles.navLink} to="/profile">
                      <FaUserCircle className={styles.navIcon} />
                      Profile
                    </Link>
                  </li>
                  <button 
                          className={styles.logoutBtn} 
                          onClick={handleLogout}
                        >
                          <FaSignOutAlt className={styles.dropdownIcon} />
                          Logout
                  </button>

                </>
              )}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;