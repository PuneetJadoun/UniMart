import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './AddProduct.css';

function AddProduct() {
  const navigate = useNavigate();
  const [pname, setpname] = useState('');
  const [pdesc, setpdesc] = useState('');
  const [price, setprice] = useState('');
  const [category, setcategory] = useState('');
  const [pimage, setpimage] = useState(null);
  const [pimage2, setpimage2] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, []);

  const handleApi = () => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      alert("User is not logged in. Please login first.");
      navigate('/login');
      return;
    }

    const formData = new FormData();
    formData.append('pname', pname);
    formData.append('pdesc', pdesc);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('pimage', pimage);
    formData.append('pimage2', pimage2);
    formData.append('userId', userId);

    const url = 'http://localhost:3000/add-product';
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
  };

  return (
    <div className="ProductPageContainer">
      <div className="AddProductContainer">
        <div className="AddProductCard">
          <div className="AddProductHeader">
            <h2 className="AddProductTitle">ADD PRODUCT</h2>
          </div>
          <div className="AddProductBody">
            <form>
              <div className="row mb-2">
                <div className="col-md-12">
                  <label className="form-label fw-bold mb-1">Product Name</label>
                  <input
                    className="form-control GreenBorder"
                    type="text"
                    placeholder="Enter product name"
                    value={pname}
                    onChange={(e) => { setpname(e.target.value) }}
                  />
                </div>
              </div>

              <div className="row mb-2">
                <div className="col-md-12">
                  <label className="form-label fw-bold mb-1">Product Description</label>
                  <textarea
                    className="form-control GreenBorder"
                    rows="2"
                    placeholder="Enter detailed product description"
                    value={pdesc}
                    onChange={(e) => { setpdesc(e.target.value) }}
                  ></textarea>
                </div>
              </div>

              <div className="row mb-2">
                <div className="col-md-6">
                  <label className="form-label fw-bold mb-1">Product Price</label>
                  <div className="input-group GreenInputGroup">
                    <span className="input-group-text">₹</span>
                    <input
                      className="form-control GreenInputRoundedRight"
                      type="text"
                      placeholder="Enter price"
                      value={price}
                      onChange={(e) => { setprice(e.target.value) }}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold mb-1">Product Category</label>
                  <select
                    className="form-select GreenSelect"
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

              <div className="row mb-2">
                <div className="col-md-6">
                  <label className="form-label fw-bold mb-1">Primary Image</label>
                  <div className="input-group mb-1">
                    <input 
                      className="form-control GreenBorder"
                      type="file"
                      onChange={(e) => { setpimage(e.target.files[0]) }}
                    />
                  </div>
                  <small className="SmallNote">Upload main product image</small>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold mb-1">Secondary Image</label>
                  <div className="input-group mb-1">
                    <input 
                      className="form-control GreenBorder"
                      type="file"
                      onChange={(e) => { setpimage2(e.target.files[0]) }}
                    />
                  </div>
                  <small className="SmallNote">Upload additional view</small>
                </div>
              </div>

              <div className="d-grid gap-2 col-md-2 mx-auto mt-3">
                <button 
                  type="button" 
                  className="btn SubmitButton"
                  onClick={handleApi}
                >
                  SUBMIT PRODUCT
                </button>
              </div>
            </form>
          </div>
          <div className="card-footer ReturnLink">
            <a href="/">← Return to Product Listing</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
