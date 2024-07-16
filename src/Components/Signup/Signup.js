import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { firebase } = useContext(FirebaseContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const db = getFirestore(firebase);
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        updateProfile(result.user, { displayName: username });
      })
      .then(() => {
        addDoc(collection(db, 'users'), {
          id: auth.currentUser.uid,
          username: username,
          mobile: phone,
        });
      })
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error signing up:', error);
      });
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <img src={Logo} alt="Logo" className="logo" />
        <form onSubmit={handleSubmit} className="signup-form">
          <label htmlFor="username">Username</label>
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            name="name"
          />
          <label htmlFor="email">Email</label>
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
          />
          <label htmlFor="phone">Phone</label>
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
            name="phone"
          />
          <label htmlFor="password">Password</label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
          />
          <button type="submit" className="signup-button">Signup</button>
        </form>
        <Link to="/login" className="login-link">Login</Link>
      </div>
    </div>
  );
}
