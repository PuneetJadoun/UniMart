import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import Categories from './categories';
import {FaHeart} from "react-icons/fa";
import './MyProduct.css';

function MyProducts() {
  const navigate = useNavigate();
  
  const [products, setproducts] = useState([]);
  const [cproducts, setcproducts] = useState([]);
  const [search, setsearch] = useState('');
  const [refresh, setrefresh] = useState(false);

  useEffect(() => {
    const url = "http://localhost:3000/my-products";
    let data  = { userId: localStorage.getItem('userId')}
    axios.post(url, data)
        .then((res) => {
            if(res.data.products){
              setproducts(res.data.products);
            }
        })
        .catch((err) => {
            alert('Server err');
        });
    }, [refresh]);

    const handlesearch = (value) =>{
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

  const handleLike = (productId) =>{
    let userId = localStorage.getItem('userId');

    const url = 'http://localhost:3000/like-product';
    const data = {userId, productId};
    axios.post(url, data)
        .then((res)=>{
          if(res.data.message){
            alert('Product Liked')
          }
        })
        .catch((err)=>{
          alert('Server err');
        })
  }

  const handleDel = (pid) => {
    if(!localStorage.getItem('userId')){
      alert('Login First')
      return;
    }
    const url = 'http://localhost:3000/delete-product';
    const data = {pid,
      userId: localStorage.getItem('userId')
    }
    axios.post(url, data)
        .then((res)=>{
          if(res.data.message){
            alert('Product Deleted')
            setrefresh(!refresh);
          }
        })
        .catch((err)=>{
          alert('Server err');
    })
  }
  return (

    <div className="products-container">
    <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />
    <Categories handleCategory={handleCategory} />
    
    <div className="products-grid">
      {products && products.length > 0 ? (
        products.map((item) => (
          <div key={item._id} className="product-card">
            <div onClick={() => handleLike(item._id)} className="like-button-container">
              <FaHeart className="like-icon" />
            </div>
            
            <div className="product-image-container">
              <img 
                className="product-image" 
                src={"http://localhost:3000/" + item.pimage} 
                alt={item.pname}
              />
            </div>
            
            <div className="product-details">
              <div className="product-name-category">
                <span>{item.pname}</span>
                <span className="product-category">{item.category}</span>
              </div>
              
              <h3 className="product-price">₹{item.price}</h3>
              <p className="product-description">{item.pdesc}</p>
              
              <div className="product-actions">
                <Link to={`/edit-product/${item._id}`} className="edit-link">
                  Edit Product
                </Link>
                <button onClick={() => handleDel(item._id)} className="delete-button">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="empty-state">
          <h3>No products found</h3>
          <p>You haven't added any products yet.</p>
        </div>
      )}
    </div>
  </div>
  )
}

export default MyProducts;

























