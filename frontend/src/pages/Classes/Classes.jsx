import { Canvas } from "@react-three/fiber";
import {
  Environment,
  PerspectiveCamera,
  shaderMaterial,
  useTexture,
} from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";
import Slider from "./Slider";
import './classes.scss';

const Classes = () => {
  return (
    <>
      <Suspense>
        <Canvas
          gl={{ 
            antialias: true, 
            toneMapping: THREE.ACESFilmicToneMapping, 
            outputEncoding: THREE.sRGBEncoding 
          }}
          onCreated={({ gl }) => {
            // gl.setClearColor(new THREE.Color('#070410'));
          }}
        >
          <PerspectiveCamera
            makeDefault
            position={[0, 0, 1]}
            fov={70}
            near={0.01}
            far={10}
          />
          {/* <Environment preset="city" /> */}
          <Slider />
   </Canvas>
      </Suspense>
    </>
  );
};

export default Classes;
