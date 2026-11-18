"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Brand gradient (matches NavBar/Footer accent strip: purple-600 -> fuchsia-500 -> cyan-400)
const RING_COLORS = ["#9333ea", "#d946ef", "#22d3ee"] as const;

/**
 * Abstract "orbital rings" logo motif: 3 concentric/overlapping toruses
 * rotating slowly on independent axes, plus a glowing core sphere.
 * The whole group tilts subtly to follow the pointer for a parallax feel.
 */
export default function SIRings() {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.22;
      ring1Ref.current.rotation.y += delta * 0.12;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x -= delta * 0.16;
      ring2Ref.current.rotation.z += delta * 0.2;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y += delta * 0.26;
      ring3Ref.current.rotation.z -= delta * 0.1;
    }

    // Subtle parallax: ease the whole group toward the pointer position
    // rather than snapping, so it reads as "reacting" rather than "tracking".
    if (groupRef.current) {
      const { x, y } = state.pointer;
      const targetRotationY = x * 0.3;
      const targetRotationX = -y * 0.2;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotationY,
        0.04,
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotationX,
        0.04,
      );
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.6, 0.08, 16, 100]} />
        <meshStandardMaterial
          color={RING_COLORS[0]}
          emissive={RING_COLORS[0]}
          emissiveIntensity={0.5}
          roughness={0.35}
          metalness={0.6}
        />
      </mesh>

      <mesh ref={ring2Ref} rotation={[Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[1.15, 0.065, 16, 100]} />
        <meshStandardMaterial
          color={RING_COLORS[1]}
          emissive={RING_COLORS[1]}
          emissiveIntensity={0.5}
          roughness={0.35}
          metalness={0.6}
        />
      </mesh>

      <mesh ref={ring3Ref} rotation={[-Math.PI / 5, Math.PI / 3, 0]}>
        <torusGeometry args={[0.75, 0.05, 16, 100]} />
        <meshStandardMaterial
          color={RING_COLORS[2]}
          emissive={RING_COLORS[2]}
          emissiveIntensity={0.5}
          roughness={0.35}
          metalness={0.6}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#9333ea"
          emissiveIntensity={1.1}
          roughness={0.25}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}
