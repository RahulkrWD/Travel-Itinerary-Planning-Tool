import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { generateOTP, verifyOTP, signup, resetAuthState, clearError } from "../../redux/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaArrowLeft, FaKey, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Container, Form, Button, FloatingLabel, Alert } from 'react-bootstrap';
import '../../styles/Signup.css';

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, otpSent, otpVerified, token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);
  
  // Step transition logic
  useEffect(() => {
    if (otpSent && currentStep === 1) {
      setCurrentStep(2);
    }

    if (otpVerified && currentStep === 2) {
      setCurrentStep(3);
    }

    if (token) {
      navigate("/");
      localStorage.setItem("authToken", JSON.stringify(token));
    }
  }, [otpSent, otpVerified, token, currentStep, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Step 1: Send OTP
  const handleSendOTP = (e) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(generateOTP(formData.email));
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = (e) => {
    e.preventDefault();
    dispatch(clearError());
    if (!formData.otp || formData.otp.length !== 6) return;
    
    dispatch(verifyOTP({ 
      email: formData.email, 
      otp: formData.otp 
    }));
  };

  // Step 3: Final signup (after OTP verified)
  const handleFinalSignup = (e) => {
    e.preventDefault();
    dispatch(clearError());

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    dispatch(signup({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    }));
  };

  return (
    <div className="signup-page">
      <div className="background-image"></div>
      
      <Container className="signup-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="signup-card"
        >
          <div className="signup-header">
            <Link to="/" className="back-home">
              <FaArrowLeft className="me-2" />
              Back to Home
            </Link>
            <h2 className="text-center mb-4">Create Your Account</h2>
            
            {/* Progress Steps */}
            <div className="progress-steps">
              <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
                <div className="step-number">1</div>
                <div className="step-label">Basic Info</div>
              </div>
              <div className={`step-connector ${currentStep >= 2 ? 'active' : ''}`}></div>
              <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
                <div className="step-number">2</div>
                <div className="step-label">Verify Email</div>
              </div>
              <div className={`step-connector ${currentStep >= 3 ? 'active' : ''}`}></div>
              <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
                <div className="step-number">3</div>
                <div className="step-label">Set Password</div>
              </div>
            </div>
          </div>

          {error && (
            <Alert variant="danger" onClose={() => dispatch(clearError())} dismissible>
              {error}
            </Alert>
          )}

          <Form onSubmit={currentStep === 1 ? handleSendOTP : currentStep === 2 ? handleVerifyOTP : handleFinalSignup}>
            <div className="form-grid">
              {/* Step 1: Email */}
              {currentStep === 1 && (
                <>
                  <div className="form-group-wrapper">
                    <FaUser className="input-icon" />
                    <FloatingLabel controlId="name" label="Full Name">
                      <Form.Control
                        type="text"
                        placeholder="John Doe"
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        className="input-field"
                        required
                      />
                    </FloatingLabel>
                  </div>

                  <div className="form-group-wrapper">
                    <FaEnvelope className="input-icon" />
                    <FloatingLabel controlId="email" label="Email address">
                      <Form.Control
                        type="email"
                        placeholder="name@example.com"
                        name='email'
                        value={formData.email}
                        onChange={handleChange} 
                        className="input-field"
                        required
                      />
                    </FloatingLabel>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="action-button"
                  >
                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100 next-button"
                      disabled={loading || !formData.name || !formData.email}
                    >
                      {loading ? 'Sending...' : (
                        <>
                          Continue <FaArrowRight className="ms-2" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </>
              )}

              {/* Step 2: OTP Verification */}
              {currentStep === 2 && (
                <>
                  <div className="otp-notice">
                    We've sent a 6-digit code to <strong>{formData.email}</strong>
                  </div>

                  <div className="form-group-wrapper">
                    <FaKey className="input-icon" />
                    <FloatingLabel controlId="otp" label="Enter OTP">
                      <Form.Control
                        type="text"
                        placeholder="123456"
                        name='otp'
                        value={formData.otp}
                        onChange={handleChange}
                        className="input-field"
                        maxLength="6"
                        required
                      />
                    </FloatingLabel>
                  </div>

                  <div className="otp-actions">
                    <Button
                      variant="link"
                      className="resend-otp"
                      onClick={handleSendOTP}
                      disabled={loading}
                    >
                      Resend OTP
                    </Button>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="verify-button-wrapper"
                    >
                      <Button
                        variant="primary"
                        type="submit"
                        className="verify-button"
                        disabled={loading || !formData.otp || formData.otp.length < 6}
                      >
                        {loading ? 'Verifying...' : 'Verify'}
                      </Button>
                    </motion.div>
                  </div>
                </>
              )}

              {/* Step 3: Password Setup */}
              {currentStep === 3 && (
                <>
                  <div className="form-group-wrapper">
                    <FaLock className="input-icon" />
                    <FloatingLabel controlId="password" label="Password">
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name='password'
                        value={formData.password}
                        onChange={handleChange} 
                        className="input-field"
                        required
                      />
                    </FloatingLabel>
                  </div>

                  <div className="form-group-wrapper">
                    <FaLock className="input-icon" />
                    <FloatingLabel controlId="confirmPassword" label="Confirm Password">
                      <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        name='confirmPassword'
                        value={formData.confirmPassword}
                        onChange={handleChange} 
                        className="input-field"
                        required
                      />
                    </FloatingLabel>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="action-button"
                  >
                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100 signup-button"
                      disabled={loading || !formData.password || formData.password !== formData.confirmPassword}
                    >
                      {loading ? 'Creating Account...' : 'Complete Sign Up'}
                    </Button>
                  </motion.div>
                </>
              )}
            </div>
          </Form>

          <div className="signup-footer">
            <p className="text-center">
              Already have an account?{' '}
              <Link to="/Sign-In" className="login-link">
                Log in
              </Link>
            </p>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default SignupPage;