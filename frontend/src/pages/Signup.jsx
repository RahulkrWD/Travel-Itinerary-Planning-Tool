// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaUser, FaEnvelope, FaLock, FaArrowLeft, FaKey, FaCheck } from 'react-icons/fa';
// import { motion } from 'framer-motion';
// import { Container, Form, Button, FloatingLabel, Alert } from 'react-bootstrap';
// import '../styles/Signup.css';

// const SignupPage = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [verified, setVerified] = useState(false);

//   const handleSendOtp = () => {
//     if (!email) {
//       setError('Please enter your email first');
//       return;
//     }
//     // Simulate OTP sending
//     setLoading(true);
//     setTimeout(() => {
//       setOtpSent(true);
//       setLoading(false);
//       setError('');
//     }, 1500);
//   };

//   const handleVerifyOtp = () => {
//     if (!otp) {
//       setError('Please enter the OTP');
//       return;
//     }
//     // Simulate OTP verification
//     setLoading(true);
//     setTimeout(() => {
//       setVerified(true);
//       setLoading(false);
//       setError('');
//     }, 1000);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!verified) {
//       setError('Please verify your email first');
//       return;
//     }
//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }
//     // Submit form
//     setLoading(true);
//     setTimeout(() => {
//       console.log('Signup successful');
//       setLoading(false);
//     }, 2000);
//   };

//   return (
//     <div className="signup-page">
//       {/* Blurred background image */}
//       <div className="background-image"></div>
      
//       <Container className="signup-container">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="signup-card"
//         >
//           <div className="signup-header">
//             <Link to="/" className="back-home">
//               <FaArrowLeft className="me-2" />
//               Back to Home
//             </Link>
//             <h2 className="text-center mb-4">Create Your Account</h2>
//           </div>

//           {error && (
//             <Alert variant="danger" onClose={() => setError('')} dismissible>
//               {error}
//             </Alert>
//           )}

//           <Form onSubmit={handleSubmit}>
//             {/* Name Field */}
//             <div className="form-group-wrapper">
//               <FaUser className="input-icon" />
//               <FloatingLabel controlId="name" label="Full Name" className="mb-3">
//                 <Form.Control
//                   type="text"
//                   placeholder="John Doe"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="input-field"
//                   required
//                 />
//               </FloatingLabel>
//             </div>

//             {/* Email Field */}
//             <div className="form-group-wrapper">
//               <FaEnvelope className="input-icon" />
//               <FloatingLabel controlId="email" label="Email address" className="mb-3">
//                 <Form.Control
//                   type="email"
//                   placeholder="name@example.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="input-field"
//                   required
//                   disabled={otpSent}
//                 />
//               </FloatingLabel>
//             </div>

//             {/* OTP Verification Section */}
//             {otpSent && (
//               <div className="otp-section mb-3">
//                 <div className="form-group-wrapper">
//                   <FaKey className="input-icon" />
//                   <FloatingLabel controlId="otp" label="Enter OTP">
//                     <Form.Control
//                       type="text"
//                       placeholder="123456"
//                       value={otp}
//                       onChange={(e) => setOtp(e.target.value)}
//                       className="input-field"
//                       disabled={verified}
//                     />
//                   </FloatingLabel>
//                 </div>
//                 {!verified ? (
//                   <Button
//                     variant="outline-primary"
//                     className="w-100 verify-button"
//                     onClick={handleVerifyOtp}
//                     disabled={loading}
//                   >
//                     {loading ? 'Verifying...' : 'Verify OTP'}
//                   </Button>
//                 ) : (
//                   <div className="verified-badge">
//                     <FaCheck className="me-2" />
//                     Email Verified
//                   </div>
//                 )}
//               </div>
//             )}

//             {verified && (
//               <>
//                 <div className="form-group-wrapper">
//                   <FaLock className="input-icon" />
//                   <FloatingLabel controlId="password" label="Password" className="mb-3">
//                     <Form.Control
//                       type="password"
//                       placeholder="Password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       className="input-field"
//                       required
//                     />
//                   </FloatingLabel>
//                 </div>
//               </>
//             )}
//             {!otpSent && (
//               <motion.div
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="mb-4"
//               >
//                 <Button
//                   variant="outline-primary"
//                   className="w-100 send-otp-button"
//                   onClick={handleSendOtp}
//                   disabled={loading}
//                 >
//                   {loading ? 'Sending...' : 'Send OTP'}
//                 </Button>
//               </motion.div>
//             )}

//             {/* Submit Button (only show after verification) */}
//             {verified && (
//               <motion.div
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 <Button
//                   variant="primary"
//                   type="submit"
//                   className="w-100 signup-button"
//                   disabled={loading}
//                 >
//                   {loading ? 'Creating Account...' : 'Sign Up'}
//                 </Button>
//               </motion.div>
//             )}
//           </Form>

//           <div className="signup-footer mt-4">
//             <p className="text-center">
//               Already have an account?{' '}
//               <Link to="/Sign-In" className="login-link">
//                 Log in
//               </Link>
//             </p>
//           </div>
//         </motion.div>
//       </Container>
//     </div>
//   );
// };

// export default SignupPage;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaArrowLeft, FaKey, FaCheck, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Container, Form, Button, FloatingLabel, Alert } from 'react-bootstrap';
import '../styles/Signup.css';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: Name/Email, 2: OTP, 3: Password

  const handleSendOtp = () => {
    if (!email) {
      setError('Please enter your email first');
      return;
    }
    if (!name) {
      setError('Please enter your name first');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setCurrentStep(2);
      setLoading(false);
      setError('');
    }, 1500);
  };

  const handleVerifyOtp = () => {
    if (!otp) {
      setError('Please enter the OTP');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setVerified(true);
      setCurrentStep(3);
      setLoading(false);
      setError('');
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      console.log('Signup successful');
      setLoading(false);
    }, 2000);
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
            <Alert variant="danger" onClose={() => setError('')} dismissible>
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <div className="form-grid">
              {/* Step 1: Name and Email */}
              {currentStep === 1 && (
                <>
                  <div className="form-group-wrapper">
                    <FaUser className="input-icon" />
                    <FloatingLabel controlId="name" label="Full Name">
                      <Form.Control
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                      className="w-100 next-button"
                      onClick={handleSendOtp}
                      disabled={loading || !name || !email}
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
                    We've sent a 6-digit code to <strong>{email}</strong>
                  </div>

                  <div className="form-group-wrapper">
                    <FaKey className="input-icon" />
                    <FloatingLabel controlId="otp" label="Enter OTP">
                      <Form.Control
                        type="text"
                        placeholder="123456"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="input-field"
                        maxLength="6"
                      />
                    </FloatingLabel>
                  </div>

                  <div className="otp-actions">
                    <Button
                      variant="link"
                      className="resend-otp"
                      onClick={handleSendOtp}
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
                        className="verify-button"
                        onClick={handleVerifyOtp}
                        disabled={loading || !otp || otp.length < 6}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-field"
                        required
                      />
                    </FloatingLabel>
                    <div className="password-hints">
                      <span className={password.length >= 8 ? 'valid' : ''}>• 8+ characters</span>
                      <span className={/[A-Z]/.test(password) ? 'valid' : ''}>• Uppercase</span>
                      <span className={/\d/.test(password) ? 'valid' : ''}>• Number</span>
                    </div>
                  </div>

                  <div className="form-group-wrapper">
                    <FaLock className="input-icon" />
                    <FloatingLabel controlId="confirmPassword" label="Confirm Password">
                      <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                      disabled={loading || !password || password !== confirmPassword}
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