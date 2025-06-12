import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaArrowLeft, FaUserPlus, FaKey } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Container, Form, Button, FloatingLabel, Alert } from 'react-bootstrap';
import { login, clearError } from '../../redux/AuthSlice';
import '../../styles/Login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token, user } = useSelector((state) => state.auth);

  // Redirect if already logged in
  useEffect(() => {
    if (token) {
      navigate('/');
      localStorage.setItem("authToken", JSON.stringify(token));
    }
  }, [token, navigate, user]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearError());
    
    if (!email || !password) {
      dispatch(clearError());
      return;
    }

    dispatch(login({ email, password }));

    // Save email to localStorage if "Remember me" is checked
    if (rememberMe) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
  };
  // Load remembered email on component mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="login-page">
      <div className="background-image"></div>
      
      <Container className="login-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="login-card"
        >
          <div className="login-header">
            <Link to="/" className="back-home">
              <FaArrowLeft className="me-2" />
              Back to Home
            </Link>
            <h2 className="text-center mb-4">Welcome Back</h2>
          </div>

          {error && (
            <Alert variant="danger" onClose={() => dispatch(clearError())} dismissible>
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <div className="form-group-wrapper">
              <FaEnvelope className="input-icon" />
              <FloatingLabel controlId="email" label="Email address" className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  required
                />
              </FloatingLabel>
            </div>

            <div className="form-group-wrapper">
              <FaLock className="input-icon" />
              <FloatingLabel controlId="password" label="Password" className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  required
                />
              </FloatingLabel>
            </div>

            <div className="d-flex justify-content-between mb-4">
              <Form.Check 
                type="checkbox" 
                label="Remember me" 
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <Link to="/forgot-password" className="forgot-password">
                <FaKey className="me-1" />
                Forgot Password?
              </Link>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="primary"
                type="submit"
                className="w-100 login-button"
                disabled={loading || !email || !password}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </motion.div>
          </Form>

          <div className="login-footer mt-4">
            <p className="text-center">
              Don't have an account?{' '}
              <Link to="/Sign-Up" className="create-account">
                <FaUserPlus className="me-1" />
                Create one
              </Link>
            </p>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default LoginPage;