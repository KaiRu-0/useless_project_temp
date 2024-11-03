import { Circle, MeshReflectorMaterial } from '@react-three/drei'

export default function Floor() {
  return (
    <Circle args={[1, 32]} receiveShadow scale={.6} rotation-x={-1.7} position-y={-.5  }>
      <MeshReflectorMaterial
        color={'#2f2e3b'}
        envMapIntensity={0}
        blur={[512, 512]}
        mixBlur={1}
        mixStrength={5}  // Increased mixStrength for more reflection
        mixContrast={1}
        resolution={1024}
        mirror={1}
        depthScale={1}
        minDepthThreshold={0.8}
        maxDepthThreshold={1}
        depthToBlurRatioBias={0.45}
        roughness={1}  // Reduced roughness for more reflection
      />
    </Circle>
  )
}
