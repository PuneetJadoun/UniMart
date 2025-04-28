import React, { useState, useEffect } from 'react';
import Header from './Header';
import axios from 'axios';
import './MyProfile.css';

function MyProfile() {
    const [user, setUser] = useState({});

    useEffect(() => {
        let url = 'http://localhost:3000/my-profile/' + localStorage.getItem('userId');
        axios.get(url)
            .then((res) => {
                if (res.data.user) {
                    setUser(res.data.user);
                }
            })
            .catch((err) => {
                alert('Server Err.');
            });
    }, []);

    return (
        <div>
            <Header />
            <div className='profile-container'>  
                <h5 className='profile-title'>USER PROFILE</h5>

                <table className="profile-table">
                    <thead>
                        <tr>
                            <th>USERNAME</th>
                            <th>EMAIL ID</th>
                            <th>MOBILE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.username ? (
                            <tr>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.mobile}</td>
                            </tr>
                        ) : (
                            <tr>
                                <td colSpan="3" className="loading-row">Loading...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MyProfile;