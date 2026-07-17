import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Text, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function ServiceSphere({ position, name, cpu, isAlert }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      const scale = isAlert
        ? 1 + Math.sin(state.clock.elapsedTime * 4) * 0.08
        : 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.03;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <Float speed={isAlert ? 3 : 1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group position={position}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[0.8, 64, 64]} />
          <MeshDistortMaterial
            color={isAlert ? "#ef4444" : "#22c55e"}
            emissive={isAlert ? "#ef4444" : "#16a34a"}
            emissiveIntensity={isAlert ? 0.8 : 0.4}
            distort={isAlert ? 0.4 : 0.15}
            speed={isAlert ? 3 : 1}
            roughness={0}
            metalness={0.1}
          />
        </mesh>

        {isAlert && (
          <mesh>
            <sphereGeometry args={[1.1, 32, 32]} />
            <meshBasicMaterial color="#ef4444" transparent opacity={0.08} wireframe />
          </mesh>
        )}

        <Text position={[0, -1.3, 0]} fontSize={0.25} color="white" anchorX="center" anchorY="middle">
          {name}
        </Text>
        <Text position={[0, -1.7, 0]} fontSize={0.2} color={isAlert ? "#f87171" : "#86efac"} anchorX="center" anchorY="middle">
          {cpu}% CPU
        </Text>
      </group>
    </Float>
  );
}

function ConnectionLine({ start, end }) {
  const points = [
    new THREE.Vector3(...start),
    new THREE.Vector3(...end),
  ];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#334155" transparent opacity={0.4} />
    </line>
  );
}

export default function ServiceGraph3D({ metrics }) {
  const services = Object.values(metrics);

  const positions = [
    [-3, 0, 0],
    [0, 1.5, 0],
    [3, 0, 0],
  ];

  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-gray-800 bg-gray-900/50">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />

        {services.map((metric, i) => (
          <ServiceSphere
            key={metric.service}
            position={positions[i] || [0, 0, 0]}
            name={metric.service}
            cpu={metric.cpu}
            isAlert={metric.cpu > 80}
          />
        ))}

        {services.length >= 3 && (
          <>
            <ConnectionLine start={positions[0]} end={positions[1]} />
            <ConnectionLine start={positions[1]} end={positions[2]} />
            <ConnectionLine start={positions[0]} end={positions[2]} />
          </>
        )}

        <OrbitControls enableZoom={true} enablePan={false} minDistance={5} maxDistance={12} />
      </Canvas>
    </div>
  );
}