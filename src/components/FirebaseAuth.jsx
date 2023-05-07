import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {provider} from "../firebase";
import { auth } from "../firebase";
import { storage } from "../firebase";


const FirebaseAuth = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  async function loginWithGoogle() {
    try {
      await auth.signInWithPopup(provider);
      navigate("/");
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  }

  return (
    <div className="flex justify-center mt-8">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={loginWithGoogle}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default FirebaseAuth;
