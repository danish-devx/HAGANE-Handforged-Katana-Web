import { forwardRef, useMemo } from "react";
import * as THREE from "three";
import { createSayaGeometry, SAYA_CONFIG } from "../geometry/sayaGeometry";
import { LACQUER } from "../materials/presets";
const Saya = forwardRef(function Saya(props, ref) {
  const geometry = useMemo(() => createSayaGeometry(SAYA_CONFIG), []);

  return (
    <group ref={ref} {...props}>
      <mesh geometry={geometry}>
        <meshPhysicalMaterial {...LACQUER} side={THREE.DoubleSide} />
      </mesh>

      <mesh
        position={[0, 0.4, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[1.78, 0.82, 1]}
      >
        <circleGeometry args={[1, 32]} />
        <meshStandardMaterial color="#080706" roughness={0.9} metalness={0.1} />
      </mesh>
    </group>
  );
});

export default Saya;
