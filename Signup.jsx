import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from 'framer-motion';
import './SignUp.css';
import Loginimg from "../assets/Loginimg.jpg";

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleApi = () => {
    setIsLoading(true);
    setError('');
    const url = 'http://localhost:3000/signup';
    const data = { username, password, mobile, email };
    
    axios.post(url, data)
      .then((res) => {
        setIsLoading(false);
        if (res.data.message) {
          alert('Signed Up Successfully');
        }
      })
      .catch(() => {
        setIsLoading(false);
        setError('Server error');
      });
  };

  return (
    <div className="signup-page">
      <motion.div 
        className='both-container'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className='login-container signup-container'>
          <motion.div 
            className="login-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <motion.h2 
              className='login-title'
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Join UniMart<br />Sign Up Today!
            </motion.h2>
            
            <div className="login-form">
              <motion.div 
                className="form-group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  className='form-control'
                  type="text"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </motion.div>
              
              <motion.div 
                className="form-group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <label htmlFor="mobile">Mobile</label>
                <input
                  id="mobile"
                  className='form-control'
                  type="text"
                  placeholder="Enter your mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </motion.div>
              
              <motion.div 
                className="form-group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  className='form-control'
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </motion.div>
              
              <motion.div 
                className="form-group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  className='form-control'
                  type="password"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </motion.div>
              
              {error && (
                <motion.div 
                  className="error-message"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {error}
                </motion.div>
              )}
              
              <motion.div 
                className="form-actions"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <motion.button 
                  className='login-btn signup-btn'
                  onClick={handleApi}
                  disabled={isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isLoading ? 'Creating Account...' : 'SIGN UP'}
                </motion.button>
                
                <div className="signup-prompt">
                  Already have an account?{' '}
                  <motion.div whileHover={{ color: '#056733' }} style={{ display: 'inline' }}>
                    <Link className='signup-link' to="/login">
                      Login here
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className='image-container'
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <img src={Loginimg} alt="Campus marketplace" className="login-image" />
          <div className="image-overlay">
            <h3>Start Selling & Buying</h3>
            <p>Join the campus community marketplace today</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Signup;
