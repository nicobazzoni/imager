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
    <AuthProvider>
      <div className="h-screen">
        <BrowserRouter>
          <header>
            <h1 className="text-2xl font-bold text-center mb-8">My App</h1>
            <Header />
          </header>
          <Routes>
            <Route className='h-screen' path="/" element={<Home />} />
            <Route path="/login" element={<FirebaseAuth />} />
          
            <Route path="/signup" element ={<SignUp />} />
            <Route path="/canvas" element ={<MyCanvas/>} />
           
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
