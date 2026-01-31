import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron, MeshDistortMaterial, Float, Torus, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// 3D VR Object that responds to cursor movement
const VRObject = ({ mousePosition }) => {
  const meshRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (meshRef.current) {
      // Calculate target rotation based on mouse position
      targetRotation.current.x = ((mousePosition.y - 50) / 50) * 0.5;
      targetRotation.current.y = ((mousePosition.x - 50) / 50) * 0.5;

      // Smooth interpolation
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotation.current.x,
        0.05
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotation.current.y + state.clock.elapsedTime * 0.15,
        0.05
      );
    }

    // Animate rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = state.clock.elapsedTime * 0.3;
      ring1Ref.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = state.clock.elapsedTime * 0.4;
      ring2Ref.current.rotation.x = state.clock.elapsedTime * -0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={meshRef}>
        {/* Main icosahedron */}
        <Icosahedron args={[1.2, 4]}>
          <MeshDistortMaterial
            color="#a855f7"
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.15}
            metalness={0.9}
            emissive="#ec4899"
            emissiveIntensity={0.2}
          />
        </Icosahedron>

        {/* Inner glowing core */}
        <Sphere args={[0.6, 32, 32]}>
          <meshBasicMaterial
            color="#ec4899"
            transparent
            opacity={0.3}
          />
        </Sphere>

        {/* Animated rings */}
        <group ref={ring1Ref}>
          <Torus args={[1.8, 0.02, 16, 100]}>
            <meshBasicMaterial color="#a855f7" transparent opacity={0.6} />
          </Torus>
        </group>

        <group ref={ring2Ref}>
          <Torus args={[2.0, 0.015, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
            <meshBasicMaterial color="#ec4899" transparent opacity={0.4} />
          </Torus>
        </group>

        {/* Outer glow ring */}
        <Torus args={[2.2, 0.01, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.3} />
        </Torus>

        {/* Floating particles around the object */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 1.6;
          return (
            <Sphere
              key={i}
              args={[0.03, 8, 8]}
              position={[
                Math.cos(angle) * radius,
                Math.sin(angle * 2) * 0.3,
                Math.sin(angle) * radius,
              ]}
            >
              <meshBasicMaterial color={i % 2 === 0 ? '#a855f7' : '#ec4899'} />
            </Sphere>
          );
        })}
      </group>
    </Float>
  );
};

const Scene = ({ mousePosition }) => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#a855f7" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#ec4899" />
      <pointLight position={[0, 10, 0]} intensity={0.5} color="#06b6d4" />
      <spotLight
        position={[0, 10, 5]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        color="#ffffff"
      />
      <VRObject mousePosition={mousePosition} />
    </>
  );
};

export default Scene;
