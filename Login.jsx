import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from 'framer-motion';
import './Login.css';
import Loginimg from "../assets/Loginimg.jpg";


// import { GoogleLogin } from '@react-oauth/google';
// import jwtDecode from "jwt-decode";


function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleApi = () => {
    setIsLoading(true);
    setError('');
    const url = 'http://localhost:3000/login';
    const data = { username, password };

    axios.post(url, data)
      .then((res) => {
        setIsLoading(false);
        if (res.data.message) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userId', res.data.userId);
          localStorage.setItem('userName', res.data.username);
          navigate('/');
        } else {
          setError('Invalid credentials');
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setError('Server error, please try again later');
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
        <div className='login-container'>
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
              Unlock the Best<br />Campus Marketplace!
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
                  placeholder="Enter your username"
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
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  className='form-control'
                  type="password"
                  placeholder="Enter your password"
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
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <motion.button 
                  className='login-btn'
                  onClick={handleApi}
                  disabled={isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </motion.button>

                
                
                <div className="signup-prompt">
                  New to our platform?{' '}
                  <motion.div whileHover={{ color: '#056733' }}>
                    <Link className='signup-link' to="/signup">
                      Create an account
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
            <h3>Find What You Need</h3>
            <p>The smartest way to buy, sell and rent on campus</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Login;