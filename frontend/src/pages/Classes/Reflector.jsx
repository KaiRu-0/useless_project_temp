import { Circle, MeshReflectorMaterial } from '@react-three/drei'

export default function Floor() {
  return (
    <mesh receiveShadow rotation-x={-Math.PI / 2} position-y={-0.5}>
      <planeGeometry args={[10, 10]} />
      <MeshReflectorMaterial
        color={'#2f2e3b'}
        envMapIntensity={1}
        blur={[512, 512]}
        mixBlur={1}
        mixStrength={5}  // Increased mixStrength for more reflection
        mixContrast={1}
        resolution={512}
        mirror={1}
        depthScale={1}
        minDepthThreshold={1.8}
        maxDepthThreshold={1}
        depthToBlurRatioBias={1.45}
        roughness={0.5}  // Reduced roughness for more reflection
      />
    </mesh>
  )
}
