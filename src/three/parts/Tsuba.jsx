import { useMemo } from "react";
import * as THREE from "three";
import { IRON, NAKAGO } from "../materials/presets";
function mokkoShape() {
  const s = new THREE.Shape();
  const R = 3.6,
    LOBES = 4,
    WOBBLE = 0.13;
  for (let i = 0; i <= 72; i++) {
    const a = (i / 72) * Math.PI * 2;
    const r = R * (1 + WOBBLE * Math.cos(LOBES * a));
    i === 0
      ? s.moveTo(Math.cos(a) * r, Math.sin(a) * r)
      : s.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  s.closePath();

  const slot = new THREE.Path();
  slot.absellipse(0, 0, 0.6, 0.38, 0, Math.PI * 2, false, 0);
  s.holes.push(slot);
  return s;
}

export default function Tsuba() {
  const geometry = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(mokkoShape(), {
      depth: 0.55,
      bevelEnabled: true,
      bevelThickness: 0.12,
      bevelSize: 0.1,
      bevelSegments: 2,
      curveSegments: 48,
    });
    g.rotateX(Math.PI / 2);
    g.computeVertexNormals();
    return g;
  }, []);

  return (
    <group position={[0, -0.55, 0]}>
      <mesh geometry={geometry}>
        <meshStandardMaterial {...IRON} />
      </mesh>

      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 1.6, 16]} />
        <meshStandardMaterial {...NAKAGO} />
      </mesh>
    </group>
  );
}
