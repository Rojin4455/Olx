import React, { useEffect, useContext, useState } from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/Context';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


function Posts() {
  const { firebase } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const [secondRow,setSecondRow] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore(firebase);
        const productsCollection = collection(db, 'products');
        const snapshot = await getDocs(productsCollection);
        const newProducts = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
        setProducts(newProducts);

      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    fetchData();
  }, [firebase]);
  console.log("second rowd",secondRow);

  useEffect(() => {
    setSecondRow(products.slice().reverse())

  },[products])
  if (products){
    // setSecondRow(products.slice().reverse())
  }

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map(product => (
            <div key={product.id} className="card" onClick={() =>{
              navigate(`/view/${product.id}`)
            }}>
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.img} alt={product.name} />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">

          {secondRow.map(product => (
            <div key={product.id} className="card" onClick={()=>{
              navigate(`/view/$product.id`)
            }}>
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.img} alt={product.name} />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
