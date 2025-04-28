import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import './ProductDetails.css';
import io from 'socket.io-client';

function ProductDetail() {
  const [product, setproduct] = useState();
  const [user, setuser] = useState();
  const [loading, setLoading] = useState(true);
  const [msg, setmsg] = useState('');
  const [msgs, setmsgs] = useState([]);
  const p = useParams();
  const socketRef = useRef(); 

  useEffect(() => {
    socketRef.current = io("http://localhost:3000");

    socketRef.current.on("connect", () => {
      console.log('Socket connected:', socketRef.current.id);
    });

    socketRef.current.on('getMsg', (data) => {
      const productId = localStorage.getItem('productId');
      if (productId) {
        const _data = data.filter((item) => item.productId === productId);
        console.log("Filtered messages:", _data);
        setmsgs(_data);
      }
    });

    socketRef.current.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const handleSend = () => {
    if (!msg.trim()) {
      alert("Message cannot be empty");
      return;
    }
    if (socketRef.current && socketRef.current.connected) {
      const data = { 
        username: localStorage.getItem('userName'), 
        msg, 
        productId: localStorage.getItem('productId') 
      };
      socketRef.current.emit('sendMsg', data);
      setmsg(''); 
    } else {
      alert("Socket is not connected");
    }
  };

  useEffect(() => {
    setLoading(true);
    const url = "http://localhost:3000/get-product/" + p.productId;
    axios.get(url)
      .then((res) => {
        if (res.data.product) {
          setproduct(res.data.product);
          localStorage.setItem('productId', res.data.product._id);
        }
        setLoading(false);
      })
      .catch(() => {
        alert('Server error');
        setLoading(false);
      });
  }, [p.productId]);

  const handleContact = (addedBy) => {
    const url = 'http://localhost:3000/get-user/' + addedBy;
    axios.get(url)
      .then((res) => {
        if (res.data.user) {
          setuser(res.data.user);
        }
      })
      .catch(() => {
        alert('Server Error');
      });
  };

  return (
    <>
      <Header />
      <div className="ProductDetailContainer">
        <h2 className="ProductDetailHeader">Product Details</h2>
        
        {loading ? (
          <div className="LoadingContainer">Loading product details...</div>
        ) : product ? (
          <div className="ProductDetailContent">
            <div className="ProductImagesContainer">
              <img
                className="ProductImage"
                src={'http://localhost:3000/' + product.pimage}
                alt={product.pname || "Product Image"}
              />
              {product.pimage2 && (
                <img
                  className="ProductImage"
                  src={'http://localhost:3000/' + product.pimage2}
                  alt={product.pname ? `${product.pname} - Additional View` : "Product Image"}
                />
              )}
            </div>
            
            <div className="ProductInfoContainer">
              <div className="ProductInfo">
                <h5 className="ProductInfoLabel">Name:</h5>
                <p className="ProductInfoValue">{product.pname}</p>
              </div>
              <div className="ProductInfo">
                <h5 className="ProductInfoLabel">Price:</h5>
                <p className="ProductInfoValue">Rs. {product.price} /-</p>
              </div>
              <div className="ProductInfo">
                <h5 className="ProductInfoLabel">Category:</h5>
                <p className="ProductInfoValue">{product.category}</p>
              </div>
              <div className="ProductInfo">
                <h5 className="ProductInfoLabel">Description:</h5>
                <p className="ProductInfoValue">{product.pdesc}</p>
              </div>
              
              {product.addedBy && (
                <button
                  className="ContactDetailsButton"
                  onClick={() => handleContact(product.addedBy)}
                >
                  Show Contact Details
                </button>
              )}
              
              {user && (
                <div className="UserInfoContainer">
                  <h4 className="UserInfo">Username: {user.username}</h4>
                  <h4 className="UserInfo">Mobile: {user.mobile}</h4>
                  <h4 className="UserInfo">Email: {user.email}</h4>
                </div>
              )}
            </div>

            <div className="ChatSection">
              <h3 className="ChatHeader">Product Discussion</h3>
              <div className="ChatMessages">
                {msgs && msgs.length > 0 ? (
                  msgs.map((item, index) => (
                    <div 
                      key={item._id || index} 
                      className={`ChatMessage ${item.username === localStorage.getItem('userName') ? 'SentMessage' : 'ReceivedMessage'}`}
                    >
                      <div className="MessageUsername">{item.username}</div>
                      <div className="MessageContent">{item.msg}</div>
                    </div>
                  ))
                ) : (
                  <div className="NoMessages">No messages yet. Be the first to start a conversation!</div>
                )}
              </div>
              <div className="ChatInputContainer">
                <input 
                  value={msg} 
                  onChange={(e) => setmsg(e.target.value)} 
                  className="ChatInput" 
                  type="text" 
                  placeholder="Type your message..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button onClick={handleSend} className="SendButton">Send</button>
              </div>
            </div>
            
          </div>
        ) : (
          <div className="ErrorContainer">Product not found</div>
        )}
      </div>
    </>
  );
}

export default ProductDetail;