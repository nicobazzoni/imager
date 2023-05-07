import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FirebaseAuth from "./components/FirebaseAuth";
import Home from "./components/Home";
import Header from "./components/Header";
import { AuthProvider } from "./contexts/AuthContext";
import LoginWithGoogle from "./components/FirebaseAuth";

import SignUp from "./components/SignUp";
import MyCanvas from "./components/MyCanvas";

function App() {
  const [images, setImages] = useState([]);

  const handleUpload = (urls) => {
    setImages(urls.map((url) => ({ url })));
  };

  return (
   
      <div className="h-screen">
        <BrowserRouter>
   
          <Routes>
            <Route className='h-screen' path="/" element={<MyCanvas/>} />
          
          
          
           
           
          </Routes>
        </BrowserRouter>
      </div>
   
  );
}

export default App;
