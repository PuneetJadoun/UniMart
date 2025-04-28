import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Categories from './categories';
import { FaHeart } from "react-icons/fa";
import './LikedProducts.css';

function LikedProducts() {
  const navigate = useNavigate();
  
  const [products, setproducts] = useState([]);
  const [cproducts, setcproducts] = useState([]);
  const [search, setsearch] = useState('');
  
  useEffect(() => {
    const url = "http://localhost:3000/liked-products";
    let data = { userId: localStorage.getItem('userId') }
    axios.post(url, data)
      .then((res) => {
        if(res.data.products){
          setproducts(res.data.products);
        }
      })
      .catch((err) => {
        alert('Server err');
      });
  }, []);
  
  const handlesearch = (value) => {
    setsearch(value);
  }
  
  const handleClick = () => {
    let filteredProducts = products.filter((item) => {
      if (item.pname.toLowerCase().includes(search.toLowerCase()) ||
        item.pdesc.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())) {
        return item;
      }
    });
    setcproducts(filteredProducts);
  }
  
  const handleCategory = (value) => {
    let filteredProducts = products.filter((item, index) => {
      if (item.category == value) {
        return item;
      }
    });
    setcproducts(filteredProducts);
  }
  
  const handleLike = (productId) => {
    let userId = localStorage.getItem('userId');
    
    const url = 'http://localhost:3000/like-product';
    const data = {userId, productId};
    axios.post(url, data)
      .then((res) => {
        if(res.data.message){
          alert('Product Liked')
        }
      })
      .catch((err) => {
        alert('Server err');
      })
  }
  
  return (
    <div className="liked-products-container">
      <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />
      <Categories handleCategory={handleCategory} />
      
      <div className="liked-products-grid">
        {products && products.length > 0 ? (
          products.map((item) => (
            <div key={item._id} className="liked-card">
              <div onClick={() => handleLike(item._id)} className="liked-heart-container">
                <FaHeart className="liked-heart-icon" />
              </div>
              
              <div className="liked-image-container">
                <img 
                  className="liked-image" 
                  src={"http://localhost:3000/" + item.pimage} 
                  alt={item.pname}
                />
              </div>
              
              <div className="liked-details">
                <div className="liked-name-category">
                  <span>{item.pname}</span>
                  <span className="liked-category">{item.category}</span>
                </div>
                
                <h3 className="liked-price">₹{item.price}</h3>
                <p className="liked-description">{item.pdesc}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="liked-empty-state">
            <h3>No liked products found</h3>
            <p>You haven't liked any products yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LikedProducts;