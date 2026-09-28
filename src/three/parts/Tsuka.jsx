import { useMemo } from "react";
import { SILK, FUCHI_METAL } from "../materials/presets";
const L = 20.6;

export default function Tsuka() {
  const bands = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 12; i++) {
      const t = i / 11;
      arr.push({ y: -2.6 - t * 18.4, tilt: i % 2 ? -0.5 : 0.5 });
    }
    return arr;
  }, []);

  return (
    <group position={[0, -0.79, 0]} scale={[1, 1, 0.62]}>
      <mesh position={[0, -L / 2, 0]}>
        <cylinderGeometry args={[1.5, 1.42, L, 24]} />
        <meshStandardMaterial {...SILK} />
      </mesh>

      <mesh position={[0, -0.38, 0]}>
        <cylinderGeometry args={[1.66, 1.66, 0.78, 24]} />
        <meshStandardMaterial {...FUCHI_METAL} />
      </mesh>

      {bands.map((b, i) => (
        <mesh
          key={i}
          position={[0, b.y, 0]}
          rotation={[Math.PI / 2 + b.tilt, 0, 0]}
        >
          <torusGeometry args={[1.62, 0.15, 10, 40]} />
          <meshStandardMaterial {...SILK} />
        </mesh>
      ))}

      <mesh position={[0, -L - 0.5, 0]}>
        <cylinderGeometry args={[1.56, 1.4, 1.0, 24]} />
        <meshStandardMaterial {...FUCHI_METAL} />
      </mesh>
    </group>
  );
}
