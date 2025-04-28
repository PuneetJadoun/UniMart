import React, { useState } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';

function Header(props) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <div className='header-container'>
      <div className='header'>
        <Link className="links" to="/"> HOME </Link>
        
        <button className="menu-icon" onClick={toggleMenu}>
          ☰
        </button>
        
        <div className="search-container">
          <input
            className='search'
            type='text'
            placeholder='Search Items Here... '
            value={props && props.search}
            onChange={(e) => props.handlesearch && props.handlesearch(e.target.value)}
          />
          <button 
            className='search-btn' 
            onClick={() => props.handleClick && props.handleClick()}
          > 
            SEARCH 
          </button>
        </div>
      </div>
      
      <div className={`nav-buttons ${menuOpen ? 'active' : ''}`}>
        {isLoggedIn && (
          <Link to="/add-product" className='decoration'> 
            <button className='logout-btn'>ADD PRODUCT</button>
          </Link>
        )}
        
        {isLoggedIn && (
          <Link to="/liked-products" className='decoration'> 
            <button className='logout-btn'>FAVOURITES</button>
          </Link>
        )}
        
        {isLoggedIn && (
          <Link to="/my-products" className='decoration'> 
            <button className='logout-btn'>MY PRODUCTS</button>
          </Link>
        )}
        
        {!isLoggedIn ? (
          <Link to="/login" className='decoration'> 
            <button className='logout-btn'>LOGIN</button>
          </Link>
        ) : (
          <button className='logout-btn' onClick={handleLogout}>LOGOUT</button>
        )}
        
        <Link to="/my-profile" className='decoration'> 
          <button className='logout-btn'>PROFILE</button>
        </Link>
      </div>
    </div>
  );
}

export default Header;