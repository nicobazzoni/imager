import React, { useRef } from "react";
import { Box, useTexture } from "@react-three/drei";

const MyBox = ({ image }) => {
  const mesh = useRef(null);
  const texture = useTexture(image);
  return (
    <Box ref={mesh} args={[1, 1, 1]}>
      <meshBasicMaterial attach="material" map={texture} />
    </Box>
  );
};

export default MyBox;

