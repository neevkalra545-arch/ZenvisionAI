import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, Torus, Ring } from '@react-three/drei';
import * as THREE from 'three';

function SatelliteCore() {
  const groupRef = useRef<THREE.Group>(null);
  const ringsRef = useRef<THREE.Group>(null);
  const scanLinesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }

    if (ringsRef.current) {
      ringsRef.current.rotation.z += 0.003;
      ringsRef.current.rotation.x += 0.001;
    }

    if (scanLinesRef.current) {
      scanLinesRef.current.rotation.z -= 0.005;
    }
  });

  const scanLines = useMemo(() => {
    const lines: { radius: number; opacity: number }[] = [];
    for (let i = 0; i < 8; i++) {
      lines.push({
        radius: 0.8 + i * 0.15,
        opacity: 0.8 - i * 0.08,
      });
    }
    return lines;
  }, []);

  const particles = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i < 100; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 1.5 + Math.random() * 0.5;
      pts.push([
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi),
      ]);
    }
    return pts;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Core Sphere */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <Sphere args={[0.5, 64, 64]}>
          <meshStandardMaterial
            color="#00D4FF"
            metalness={0.9}
            roughness={0.1}
            emissive="#00D4FF"
            emissiveIntensity={0.3}
          />
        </Sphere>
      </Float>

      {/* Inner Glow */}
      <Sphere args={[0.55, 32, 32]}>
        <meshBasicMaterial
          color="#00D4FF"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Outer Glow */}
      <Sphere args={[0.7, 32, 32]}>
        <meshBasicMaterial
          color="#00F5D4"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Rotating Rings */}
      <group ref={ringsRef}>
        <Torus args={[0.9, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial
            color="#00D4FF"
            emissive="#00D4FF"
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </Torus>

        <Torus args={[1.1, 0.015, 16, 100]} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <meshStandardMaterial
            color="#00F5D4"
            emissive="#00F5D4"
            emissiveIntensity={0.4}
            transparent
            opacity={0.6}
          />
        </Torus>

        <Torus args={[1.3, 0.01, 16, 100]} rotation={[Math.PI / 4, Math.PI / 3, Math.PI / 6]}>
          <meshStandardMaterial
            color="#7B68EE"
            emissive="#7B68EE"
            emissiveIntensity={0.3}
            transparent
            opacity={0.4}
          />
        </Torus>
      </group>

      {/* Scan Lines */}
      <group ref={scanLinesRef}>
        {scanLines.map((line, i) => (
          <Ring
            key={i}
            args={[line.radius - 0.01, line.radius, 64]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <meshBasicMaterial
              color="#00D4FF"
              transparent
              opacity={line.opacity * 0.15}
              side={THREE.DoubleSide}
            />
          </Ring>
        ))}
      </group>

      {/* Floating Particles */}
      {particles.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.01, 8, 8]} />
          <meshBasicMaterial
            color="#00F5D4"
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}

      {/* Wireframe Sphere */}
      <Sphere args={[0.6, 16, 16]}>
        <meshBasicMaterial
          color="#00D4FF"
          wireframe
          transparent
          opacity={0.15}
        />
      </Sphere>

      {/* Data Points */}
      <DataOrbit />
    </group>
  );
}

function DataOrbit() {
  const pointsRef = useRef<THREE.Group>(null);
  const pointsCount = 12;

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group ref={pointsRef}>
      {Array.from({ length: pointsCount }).map((_, i) => {
        const angle = (i / pointsCount) * Math.PI * 2;
        const radius = 1.5;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle * 2) * 0.3,
              Math.sin(angle) * radius,
            ]}
          >
            <octahedronGeometry args={[0.03]} />
            <meshStandardMaterial
              color="#00F5D4"
              emissive="#00F5D4"
              emissiveIntensity={0.8}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function MouseTracker() {
  const { viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const x = (state.mouse.x * viewport.width) / 2;
      const y = (state.mouse.y * viewport.height) / 2;
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, x * 0.1, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, y * 0.1, 0.05);
    }
  });

  return <group ref={groupRef} />;
}

export function SatelliteScanner() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00D4FF" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00F5D4" />
        <spotLight
          position={[0, 5, 5]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          color="#7B68EE"
        />

        <MouseTracker />
        <SatelliteCore />

        {/* Fog for depth */}
        <fog attach="fog" args={['#060816', 3, 8]} />
      </Canvas>
    </div>
  );
}
