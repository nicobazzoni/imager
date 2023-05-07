import React from "react";
import { useAuth } from "../contexts/AuthContext";
import ImageUpload from "./ImageUpload";
import MyCanvas from "./MyCanvas";


const Home = () => {
  const { currentUser } = useAuth();
  console.log(currentUser, 'hello;');

  return (
    <div>
      <h1>Welcome, {currentUser.displayName}!</h1>
   
      <div className="h-screen bg-white">
     <ImageUpload />
      </div>
      <div>
      
      </div>
    </div>
  );
};

export default Home;

