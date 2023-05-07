import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { firestore, storage } from "../firebase";

const ImageUpload = () => {
  const { currentUser } = useAuth();
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([]);

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Check if user is authenticated
    if (!currentUser) {
      setError("You must be logged in to upload an image.");
      return;
    }

    // Upload image to storage
    const storageRef = storage.ref();
    const imageRef = storageRef.child(`images/${image.name}`);
    await imageRef.put(image);

    // Get image URL from storage
    const url = await imageRef.getDownloadURL();
    setImageUrl(url);

    // Add message to Firestore
    const messagesRef = firestore.collection("messages");
    await messagesRef.add({
      user: currentUser.displayName,
      message: message,
      imageUrl: url,
      createdAt: new Date(),
    });

    // Reset form
    setMessage("");
    setImage(null); 
    setError("");
  };

  useEffect(() => {
    const unsubscribe = firestore.collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setMessages(data);
      });
  
    // Cleanup function
    return unsubscribe;
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <input type="text" value={message} onChange={handleMessageChange} />
        <button type="submit">Upload</button>
      </form>
      {imageUrl && (
        <div className="mt-8">  
            <h2>Uploaded image:</h2>
            <img src={imageUrl} alt="Uploaded" />
        </div>
      )}
      {messages.map((message) => (
        <div key={message.id}>
          <p>User: {message.user}</p>
          <p>Message: {message.message}</p>
          <img src={message.imageUrl} alt="Uploaded" />
        </div>
      ))}
   </div>

    
  );
 
};

export default ImageUpload;
