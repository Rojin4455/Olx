import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FirebaseContext } from '../../store/Context';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import './View.css';

function View() {
  const { id } = useParams();
  const { firebase } = useContext(FirebaseContext);
  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore(firebase);
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ ...docSnap.data(), id: docSnap.id });
          console.log('ggggggggg',docSnap.data());
          console.log('ppppppppp',docSnap.data().userId);
          
          const getUser = doc(db,'users',docSnap.data().userId)
          console.log('userrrrrrrrr');
          const docUser = await getDoc(getUser);
          console.log('dddddd',docUser)
          console.log("TTTTTTTTTTTTTTTTTT");
          if (docUser.exists()) {
            setSeller(docUser.data());
            console.log(docUser.data());
          } else {
            console.log('No such user document!');
          }

        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };
    fetchData();
  }, [id, firebase]);

  if (!product) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="view-parent">
      <div className="image-show">
        <img src={product.img} alt={product.name} />
      </div>
      <div className="right-section">
        <div className="product-details">
          <p className="price">&#x20B9; {product.price}</p>
          <h1 className="name">{product.name}</h1>
          <p className="category">{product.category}</p>
          <p className="created-at">{product.createdAt}</p>
        </div>
        <div className="contact-details">
          <h2>Seller Details</h2>
          <p>Name: <strong>PR Akash</strong></p>
          <p>Phone: <strong>9833553244</strong></p>
        </div>
        <button 
            className="chat-button" 
            onClick={() => {
              // Implement chat initiation logic here
              console.log('Chat with user:', seller.name);
            }}
          >
            Chat with User
          </button>
      </div>

    </div>
  );
}

export default View;
