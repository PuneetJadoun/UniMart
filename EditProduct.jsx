
import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from "axios";
import './Edit.css';

function EditProduct() {
  const p = useParams();
  const navigate = useNavigate();
  const [pname, setpname] = useState('');
  const [pdesc, setpdesc] = useState('');
  const [price, setprice] = useState('');
  const [category, setcategory] = useState('');
  const [pimage, setpimage] = useState(null);
  const [pimage2, setpimage2] = useState(null);
  const [poldimage, setpoldimage] = useState(null);
  const [poldimage2, setpoldimage2] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    const url = "http://localhost:3000/get-product/" + p.productId;
    axios.get(url)
      .then((res) => {
        if (res.data.product) {
          setpname(res.data.product.pname);
          setpdesc(res.data.product.pdesc);
          setprice(res.data.product.price);
          setcategory(res.data.product.category);
          setpoldimage(res.data.product.pimage);
          setpoldimage2(res.data.product.pimage2);
        }
      })
      .catch((err) => {
        alert('Server err');
      });
  }, []);

  const handleApi = () => {
    const formData = new FormData();
    formData.append('pid', p.productId);
    formData.append('pname', pname);
    formData.append('pdesc', pdesc);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('pimage', pimage);
    formData.append('pimage2', pimage2);

    const url = 'http://localhost:3000/edit-product';
    axios.post(url, formData)
      .then((res) => {
        if (res.data.message) {
          alert(res.data.message);
          navigate('/');
        }
      })
      .catch((err) => {
        alert('server err');
      });
  }

  return (
    <div className="product-page-container">
      <div className="edit-container">
        <div className="edit-card">
          <div className="edit-card-header">
            <h2>EDIT PRODUCT</h2>
          </div>
          <div className="edit-card-body">
            <form>
              <div className="form-group">
                <label className="form-label">Product Name</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter product name"
                  value={pname}
                  onChange={(e) => { setpname(e.target.value) }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Product Description</label>
                <textarea
                  className="form-control"
                  rows="2"
                  placeholder="Enter detailed product description"
                  value={pdesc}
                  onChange={(e) => { setpdesc(e.target.value) }}
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group half">
                  <label className="form-label">Product Price</label>
                  <div className="price-input-group">
                    <span className="price-symbol">₹</span>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter price"
                      value={price}
                      onChange={(e) => { setprice(e.target.value) }}
                    />
                  </div>
                </div>
                
                <div className="form-group half">
                  <label className="form-label">Product Category</label>
                  <select
                    className="form-select"
                    value={category}
                    onChange={(e) => { setcategory(e.target.value) }}
                  >
                    <option value="">Select category</option>
                    <option>Electronics & Gadgets</option>
                    <option>Sports & Fitness</option>
                    <option>Hostel & Room Essentials</option>
                    <option>Books & Study Materials</option>
                    <option>Rent Items</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group half">
                  <label className="form-label">Primary Image</label>
                  <input
                    className="form-control"
                    type="file"
                    onChange={(e) => { setpimage(e.target.files[0]) }}
                  />
                  <div className="image-preview">
                    {poldimage && (
                      <img src={'http://localhost:3000/' + poldimage} alt="Primary product image" />
                    )}
                    <small className="helper-text">Current primary image</small>
                  </div>
                </div>
                
                <div className="form-group half">
                  <label className="form-label">Secondary Image</label>
                  <input
                    className="form-control"
                    type="file"
                    onChange={(e) => { setpimage2(e.target.files[0]) }}
                  />
                  <div className="image-preview">
                    {poldimage2 && (
                      <img src={'http://localhost:3000/' + poldimage2} alt="Secondary product image" />
                    )}
                    <small className="helper-text">Current secondary image</small>
                  </div>
                </div>
              </div>

              <div className="button-container">
                <button
                  type="button"
                  className="submit-button"
                  onClick={handleApi}
                >
                  UPDATE PRODUCT
                </button>
                <Link to="/" className="cancel-link">
                  ← Return to Product Listing
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;