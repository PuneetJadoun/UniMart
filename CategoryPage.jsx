import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Categories from './categories';
import {FaHeart} from "react-icons/fa";
import './CategoryPage.css';

function CategoryPage() {
  const navigate = useNavigate();
  const param  = useParams();
  
  const [products, setproducts] = useState([]);
  const [refresh, setrefresh] = useState(false);
  const [likedproducts, setlikedproducts] = useState([]);
  const [cproducts, setcproducts] = useState([]);
  const [search, setsearch] = useState('');
  const [issearch, setissearch] = useState(false);

  useEffect(() => {
    const url = `http://localhost:3000/get-products?catName=${encodeURIComponent(param.catName)}`;

    axios.get(url)
        .then((res) => {
            if(res.data.products){
              setproducts(res.data.products);
            }
        })
        .catch((err) => {
            alert('Server err');
        });

         const url2 = "http://localhost:3000/liked-products";
                let data  = { userId: localStorage.getItem('userId')}
        
                axios.post(url2, data)
                .then((res) => {
                    if(res.data.products){
                      setlikedproducts(res.data.products);
                    }
                })
                .catch((err) => {
                    alert('Server err');
         });

    }, [param, refresh]);

    const handlesearch = (value) =>{
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
    let filteredProducts = products.filter((item, index) => {
        if (item.category == value) {
            return item;
        }
    });
    setcproducts(filteredProducts);
  }

  const handleLike = (productId, e) =>{
    e.stopPropagation();
    let userId = localStorage.getItem('userId');
    if(!userId){
      alert('Please Login to like product');
      return;
    }
    const url = 'http://localhost:3000/like-product';
    const data = {userId, productId};
    axios.post(url, data)
        .then((res)=>{
          if(res.data.message){
            alert('Product Liked')
            setrefresh(!refresh);
          }
        })
        .catch((err)=>{
          alert('Server err');
        })
  }

  const handleDisLike = (productId, e) =>{
    e.stopPropagation();
    let userId = localStorage.getItem('userId');
    if(!userId){
      alert('Please Login to like product');
      return;
    }
    const url = 'http://localhost:3000/dislike-product';
    const data = {userId, productId};
    axios.post(url, data)
        .then((res)=>{
          if(res.data.message){
            alert('Product DisLiked')
            setrefresh(!refresh);
          }
        })
        .catch((err)=>{
          alert('Server err');
        })
  }

  const handleProduct = (id) =>{
    navigate('/product/'+ id);
  }

  return(
    <div className="products-container">
        <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />
        <Categories handleCategory={handleCategory}/>
        
        {issearch && cproducts &&
          <h5> SEARCH RESULTS 
              <button className="clear-btn" onClick={()=>{
                 setissearch(false)
              }}> CLEAR </button>
          </h5>
        } 
        {issearch && cproducts && cproducts.length == 0 && <h5 className="empty-state">No RESULTS FOUND</h5>}
        
        {issearch && 
          <div className="products-grid">
            {cproducts && cproducts.length > 0 && 
             cproducts.map((item, index) => {
              return (
                <div key={item._id} className="product-card" onClick={() => handleProduct(item._id)}>
                  <div className="product-image-container">
                    <img className="product-image" src={"http://localhost:3000/" + item.pimage} alt={item.pname} />
                    <div className="like-button-container">
                      {likedproducts.find((likedItem) => likedItem._id == item._id) ? 
                        <FaHeart onClick={(e) => handleDisLike(item._id, e)} className="like-icon" /> :
                        <FaHeart onClick={(e) => handleLike(item._id, e)} className="icons" />
                      }
                    </div>
                  </div>
                  <div className="product-details">
                    <div className="product-name-category">
                      <span>{item.pname}</span>
                      <span className="product-category">{item.category}</span>
                    </div>
                    <div className="product-price">Rs. {item.price}</div>
                    <div className="product-description">{item.pdesc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        }

        {!issearch && 
          <div className="products-grid">
            {products && products.length > 0 ? 
              products.map((item, index) => {
                return (
                  <div key={item._id} className="product-card" onClick={() => handleProduct(item._id)}>
                    <div className="product-image-container">
                      <img className="product-image" src={"http://localhost:3000/" + item.pimage} alt={item.pname} />
                      <div className="like-button-container">
                        {likedproducts.find((likedItem) => likedItem._id == item._id) ? 
                          <FaHeart onClick={(e) => handleDisLike(item._id, e)} className="like-icon" /> :
                          <FaHeart onClick={(e) => handleLike(item._id, e)} className="icons" />
                        }
                      </div>
                    </div>
                    <div className="product-details">
                      <div className="product-name-category">
                        <span>{item.pname}</span>
                        <span className="product-category">{item.category}</span>
                      </div>
                      <div className="product-price">Rs. {item.price}</div>
                      <div className="product-description">{item.pdesc}</div>
                    </div>
                  </div>
                );
              }) : 
              <div className="empty-state">No products found</div>
            }
          </div>
        }
    </div>
  );
}

export default CategoryPage;