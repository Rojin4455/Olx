import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../store/Context';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { uploadBytes, ref, getDownloadURL, getStorage } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const db = getFirestore(firebase);
  const date = new Date();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image to upload.");
      return;
    }

    try {
      const auth = getAuth();
      const storage = getStorage();
      const ImagesRef = ref(storage, `images/${image.name}`);
      const metadata = {
        contentType: 'image/jpeg',
      };
      uploadBytes(ImagesRef, image, metadata).then((snapshot) => getDownloadURL(snapshot.ref).then((url) => {
        addDoc(collection(db, 'products'), {
          id: auth.currentUser.uid,
          name,
          category,
          price,
          img: url,
          userId: user.uid,
          createdAt: date.toDateString()
        });
        navigate('/', { replace: true });
      }));

    } catch (error) {
      console.error("Error uploading image or adding document: ", error);
      alert("Failed to upload and submit. Please try again.");
    }
  };

  return (
    <Fragment>
      <Header />
      <div className="create-container">
        <form className="create-form" onSubmit={handleSubmit}>
          <h2>Create a New Listing</h2>
          <label htmlFor="name">Name</label>
          <input
            className="input"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="category">Category</label>
          <input
            className="input"
            type="text"
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <label htmlFor="price">Price</label>
          <input
            className="input"
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <label htmlFor="image">Upload Image</label>
          <input
            className="input-file"
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
          {image && (
            <img
              alt="Preview"
              className="image-preview"
              src={URL.createObjectURL(image)}
            />
          )}
          <button type="submit" className="upload-btn">
            Upload and Submit
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Create;
