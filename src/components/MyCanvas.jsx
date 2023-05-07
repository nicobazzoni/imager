import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box, Text, FlyControls, Environment, Stars } from "@react-three/drei";
import * as THREE from "three";
import { useDrag } from '@use-gesture/react'



function MyCanvas() {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userMessages, setUserMessages] = useState(JSON.parse(localStorage.getItem("userMessages")) || []);
  const [positions, setPositions] = useState([]);



  const handleSubmit = (e) => {
    e.preventDefault();
    const messageInput = e.target.elements.message;
    const imageInput = e.target.elements.image;

    // create new message object
    const newMessage = {
      id: Math.random().toString(36).substring(7),
      message: message,
      image: URL.createObjectURL(image)
    };

    // add new message to state and clear form inputs
    setUserMessages([...userMessages, newMessage]);
    setMessage("");
    setImage(null);
  };

  useEffect(() => {
    localStorage.setItem("userMessages", JSON.stringify(userMessages));
  }, [userMessages]);

  useEffect(() => {
    setPositions(userMessages.map(() => [Math.random() * 10, Math.random() * 10, Math.random() * 10]));
  }, [userMessages]);

  const handleDelete = (id) => {
    const updatedMessages = userMessages.filter((message) => message.id !== id);
    setUserMessages(updatedMessages);
  };

 
 
    


  return (
    <div className="flex flex-col h-screen space-x-2 p-2">
      <header className="p-4 bg-stone-900 font-mono text-white font-bold text-lg">
        Upload your message and image
      </header>
      <form className="p-4 flex m-2 flex-col space-x-2" onSubmit={handleSubmit}>
        <label className="mb-4 flex  p-2 m-2 space-x-2 font-mono">
          Message: </label>
          <textarea
            name="message"
            className="p-2 border font-mono border-gray-400 rounded-md mt-2"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
       
        <label className="mb-4 p-2 font-mono rounded-full">
          Image:
          <input
            type="file"
            name="image"
            className="mt-2 p-2 "
            required
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>
        <button
          type="submit"
          className= "text-black bg-slate-200 px-4 py-2 rounded-full self-start"
        >
          Submit
        </button>
      </form>
      <div className="flex-1">
        <Canvas
          camera={{ position: [0, 0, 10] }}
          style={{ background: 'black' }}
        >
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <FlyControls movementSpeed={6} rollSpeed={0.5} dragToLook={true} />
          {userMessages.map(({ id, message, image }, index) => (
  <Box
    key={id}
    args={[1, 1, 1]}
    position={positions[index]}
    rotation={[0, 0, 0]}
   
  >
    <meshBasicMaterial
      attach="material"
      map={image && new THREE.TextureLoader().load(image)}
    />
    <Text
      position={[0, -1, 0.6]}
      fontSize={0.15}
      color="white"
      anchorX="center"
      anchorY="middle"
      rotateOnAxis={[0, 0, 1]}
      font="Orbitron-Bold.ttf"
    >
      {message}
    </Text>
    <Text
    position={[0, -1.5, 0.9]}
    fontSize={0.20}
    color="white"
    anchorX="center"
    anchorY="middle"
    rotateOnAxis={[0, 0, 1]}
    onClick={() => handleDelete(id)}
    font="Orbitron-Bold.ttf"
  >
   x
  </Text>
  </Box>
))}

           
        </Canvas>
        </div>
    </div>
    );
}

export default MyCanvas;