import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Html,
  PerspectiveCamera,
  shaderMaterial,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";
import vertex from "./shaders/vertex.glsl";
import fragment from "./shaders/fragment.glsl";

import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { Text } from "@react-three/drei";
import Floor from "./Reflector";
import { useCourseStore } from "../../hooks/courseStore";

function ScrollPlane({ positionX, margin }) {
  const meshRef = useRef();
  const materialRef = useRef();
  const textRef = useRef();
  const buttonRef = useRef();

  const { size } = useThree();
  const [scrollPosition, setScrollPosition] = useState(0);

  const [currentScroll, setCurrentScroll] = useState(0);
  const [targetScroll, setTargetScroll] = useState(0);
  const scrollSpeed = 0.05;

  useEffect(() => {
    const handleScroll = (e) => {
      setTargetScroll((prev) => prev + e.deltaY);
    };

    const handleTouchMove = (e) => {
      setTargetScroll((prev) => prev + e.touches[0].clientY);
    };

    window.addEventListener("wheel", handleScroll);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  useFrame((rootState) => {
    setCurrentScroll((prev) => lerp(prev, targetScroll, scrollSpeed));

    const scrollDirection = targetScroll > currentScroll ? 1 : -1;
    if (materialRef.current) {
      materialRef.current.uniforms.direction.value = scrollDirection;
    }

    
    const wholeHeight = 6 * margin;

    const positionXValue =
      ((positionX * margin + currentScroll * 0.001 + wholeHeight * 50) %
        wholeHeight) -
      2 * margin;

    setScrollPosition(positionXValue);

    if (meshRef.current) {
      meshRef.current.position.x = positionXValue;
    }

    if (textRef.current) {
      textRef.current.position.x = positionXValue;
    }

    if (materialRef.current) {
      materialRef.current.uniforms.time.value += 0.01;
      materialRef.current.uniforms.uResolution.value.set(
        size.width,
        size.height
      );
    }
  });

  function lerp(start, end, t) {
    return start * (1 - t) + end * t;
  }

  const { course } = useCourseStore();

  const images = useTexture([
    "1.jpeg",
    "2.jpeg",
    "3.jpeg",
    "4.jpeg",
    "5.jpeg",
    "6.jpeg",
  ]);

  useEffect(() => {
    console.log(course);
  }, [course]);

  return (
    <>
      {Array.isArray(course) && course.length > 0 ? (
        course.map((item, index) => (
          <React.Fragment key={index}>
            <Text
              ref={textRef}
              fontSize={0.07}
              font="/noh.ttf"
              position={[0, index * -margin, 0]}
            >
              {item.name}
            </Text>
            <mesh ref={meshRef} position={[0, 0, 0]}>
              <planeGeometry args={[1.2, 0.7, 10, 10]} />
              <shaderMaterial
                ref={materialRef}
                vertexShader={vertex}
                fragmentShader={fragment}
                uniforms={{
                  time: { value: 0 },
                  matcaps: { value: images[0] },
                  tate: { value: images[index % images.length] },
                  direction: { value: 0 },
                  uResolution: {
                    value: new THREE.Vector2(size.width, size.height),
                  },
                }}
              />
            </mesh>
            <Html ref={buttonRef} position={[scrollPosition, -0.1, 0]}>
              <button
                style={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  padding: "10px 20px",
                  fontSize: "16px",
                  backgroundColor: "#000",
                  color: "#fff",
                  border: "none",
                  width: "max-content",
                  borderRadius: "15px",
                  cursor: "pointer",
                  fontFamily: "noh",
                }}
                onClick={() => alert("Button clicked!")}
              >
                Learn more
              </button>
            </Html>
          </React.Fragment>
        ))
      ) : (
        <Text
          ref={textRef}
          fontSize={0.07}
          font="/noh.ttf"
          position={[positionX, 0, 0]}
        >
          No courses available
        </Text>
      )}
    </>
  );
}

function Scene() {
  const groupRef = useRef();
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const margin = isMobile ? 1 : 1.4;

  return (
    <group ref={groupRef} position={[0, -0.1, 0]}>
      {new Array(6).fill().map((_, i) => (
        <ScrollPlane key={i} positionX={i} margin={margin} />
      ))}
    </group>
  );
}

export default function Slider() {
  const { size } = useThree();

  const textScale = size.width / 10000;

  let widthScale = size.width / 1000;
  let heightScale = size.height / 1000;

  return (
    <>
      <Scene />
      <Text
        color={"#fff"}
        fontSize={0.8 * textScale}
        maxWidth={1 * widthScale}
        position={[0, 0.4, 0]}
        font="/noh.ttf"
      >
        Enrolled Classes
      </Text>
      <EffectComposer>
        <Noise opacity={0.1} />
        <ambientLight intensity={0.5} />
        <pointLight position={[1, 1, 0]} intensity={0.5} />
        <pointLight position={[-1, 1, 0]} intensity={0.5} />
        <Floor />
      </EffectComposer>
    </>
  );
}
