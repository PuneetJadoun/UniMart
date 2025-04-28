import React from 'react';
import './Categories.css'; 
import { Link, useNavigate } from 'react-router-dom';
import categories from './CategoriesList';

function Categories(props) { 
  const navigate = useNavigate();

  return (
    <div className='cat-container'>
      <div className='cat-box'>
        <span className='all-cat-h'>All Categories :-</span> 
        {categories && categories.length > 0 &&
          categories.map((item, index) => (
            <span 
              onClick={() => navigate('/category/' + item)} 
              key={index} 
              className='category'
            >
              {item}
            </span>
          ))
        }
      </div>
    </div>
  );
}

export default Categories;
