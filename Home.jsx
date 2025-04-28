import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Categories from './categories';
import { FaHeart } from "react-icons/fa";
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [products, setproducts] = useState([]);
  const [refresh, setrefresh] = useState(false);
  const [likedproducts, setlikedproducts] = useState([]);
  const [cproducts, setcproducts] = useState([]);
  const [search, setsearch] = useState('');
  const [issearch, setissearch] = useState(false);

  useEffect(() => {
    const url = "http://localhost:3000/get-products";
    axios.get(url)
      .then((res) => {
        if (res.data.products) {
          setproducts(res.data.products);
        }
      })
      .catch((err) => {
        alert('Server err');
      });

    const url2 = "http://localhost:3000/liked-products";
    let data = { userId: localStorage.getItem('userId') }

    axios.post(url2, data)
      .then((res) => {
        if (res.data.products) {
          setlikedproducts(res.data.products);
        }
      })
      .catch((err) => {
        alert('Server err');
      });
  }, [refresh]);

  const handlesearch = (value) => {
    setsearch(value);
  }

  const handleClick = () => {
    const url = 'http://localhost:3000/search?search=' + search;
    axios.get(url)
      .then((res) => {
        setcproducts(res.data.products);
        setissearch(true);
      })
      .catch((err) => {
        alert('Server Err.');
      });
  }

  const handleCategory = (value) => {
    let filteredProducts = products.filter((item) => item.category == value);
    setcproducts(filteredProducts);
  }

  const handleLike = (productId, e) => {
    e.stopPropagation();
    let userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Please Login to like product');
      return;
    }
    const url = 'http://localhost:3000/like-product';
    const data = { userId, productId };
    axios.post(url, data)
      .then((res) => {
        if (res.data.message) {
          alert('Product Liked');
          setrefresh(!refresh);
        }
      })
      .catch((err) => {
        alert('Server err');
      });
  }

  const handleDisLike = (productId, e) => {
    e.stopPropagation();
    let userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Please Login to like product');
      return;
    }
    const url = 'http://localhost:3000/dislike-product';
    const data = { userId, productId };
    axios.post(url, data)
      .then((res) => {
        if (res.data.message) {
          alert('Product DisLiked');
          setrefresh(!refresh);
        }
      })
      .catch((err) => {
        alert('Server err');
      });
  }

  const handleProduct = (id) => {
    navigate('/product/' + id);
  }

  return (
    <div className="home-container">
      <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />
      <div className="home-products-container">
        <Categories handleCategory={handleCategory} />
        
        {issearch && cproducts && (
          <h5>
            SEARCH RESULTS
            <button className="home-clear-btn" onClick={() => setissearch(false)}>
              CLEAR
            </button>
          </h5>
        )}
        
        {issearch && cproducts && cproducts.length === 0 && <h5>No RESULTS FOUND</h5>}
        
        {issearch && (
          <div className="home-d-flex">
            {cproducts.map((item) => {
              return (
                <div key={item._id} className="home-product-card">
                  <div onClick={() => handleLike(item._id)} className="home-like-button-container">
                    <FaHeart className="home-like-icon" />
                  </div>
                  <div className="home-product-image-container">
                    <img className="home-product-image image-main" src={`http://localhost:3000/${item.pimage}`} alt={item.pname} />
                    {item.pimage2 && (
                      <img className="home-product-image image-secondary" src={`http://localhost:3000/${item.pimage2}`} alt={item.pname} />
                    )}
                  </div>
                  <div className="home-product-details">
                    <div className="home-product-name-category">
                      <span>{item.pname}</span>
                      <span className="home-product-category">{item.category}</span>
                    </div>
                    <div className="home-product-price">₹ {item.price}</div>
                    <div className="home-product-description">{item.pdesc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      
        {!issearch && (
          <div className="home-d-flex">
            {products.map((item) => {
              return (
                <div key={item._id} onClick={() => handleProduct(item._id)} className="home-product-card">
                  <div className="home-like-button-container">
                    {likedproducts.find((likedItem) => likedItem._id === item._id) ? (
                      <FaHeart onClick={(e) => handleDisLike(item._id, e)} className="home-like-icon red" />
                    ) : (
                      <FaHeart onClick={(e) => handleLike(item._id, e)} className="home-like-icon" />
                    )}
                  </div>
                  <div className="home-product-image-container">
                    <img className="home-product-image image-main" src={`http://localhost:3000/${item.pimage}`} alt={item.pname} />
                    {item.pimage2 && (
                      <img className="home-product-image image-secondary" src={`http://localhost:3000/${item.pimage2}`} alt={item.pname} />
                    )}
                  </div>
                  <div className="home-product-details">
                    <div className="home-product-name-category">
                      <span>{item.pname}</span>
                      <span className="home-product-category">{item.category}</span>
                    </div>
                    <div className="home-product-price">₹ {item.price}</div>
                    <div className="home-product-description">{item.pdesc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer /> {/* Add the Footer component here */}
    </div>
  );
}

export default Home;
