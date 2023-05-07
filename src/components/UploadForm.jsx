import { useRef, useState } from 'react';
import { useFirestore } from 'reactfire';
import { Canvas } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import * as THREE from 'three';

function MyCanvas() {
  const firestore = useFirestore();
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const fileInput = useRef(null);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const storageRef = firestore.storage().ref();
    const fileRef = storageRef.child(file.name);
    const uploadTask = fileRef.put(file);

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadProgress(progress);
    }, (error) => {
      setError(error);
    }, () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        setImageUrl(downloadURL);
      });
    });
  };

  return (
    <div>
      {error && <p>Error: {error.message}</p>}
      <input type="file" onChange={handleFileInputChange} ref={fileInput} />
      {uploadProgress > 0 && uploadProgress < 100 && <p>Upload progress: {uploadProgress}%</p>}
      {imageUrl &&
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Box>
            <meshStandardMaterial attach="material" map={new THREE.TextureLoader().load(imageUrl)} />
          </Box>
        </Canvas>
      }
    </div>
  );
}

export default MyCanvas;
