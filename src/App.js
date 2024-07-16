import React, { useContext, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Home from './Pages/Home';
import CreatePage from './Pages/Create';
import { AuthContext } from './store/Context';
import ViewPost from '../src/Pages/ViewPost'


function App() {
  const { setUser } = useContext(AuthContext);



  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [setUser]);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/view/:id" element={<ViewPost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
