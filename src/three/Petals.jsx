import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { katanaState } from "./katanaState";
import { REDUCED } from "../utils/gsapSetup";
function petalShape() {
  const s = new THREE.Shape();
  s.moveTo(0, -0.55);
  s.bezierCurveTo(0.42, -0.42, 0.5, 0.1, 0.3, 0.45);
  s.lineTo(0, 0.26);
  s.lineTo(-0.3, 0.45);
  s.bezierCurveTo(-0.5, 0.1, -0.42, -0.42, 0, -0.55);
  return s;
}

export default function Petals({ count }) {
  if (REDUCED) return null;
  const n =
    count ??
    (typeof window !== "undefined" && window.innerWidth < 768 ? 90 : 240);
  const mesh = useRef(null);
  const windSm = useRef(0);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const petals = useMemo(
    () =>
      Array.from({ length: n }, () => ({
        x: (Math.random() - 0.5) * 160,
        y: Math.random() * 140 - 60,
        z: (Math.random() - 0.5) * 80 - 15,
        fall: 3.5 + Math.random() * 4.5,
        phase: Math.random() * Math.PI * 2,
        swayFreq: 0.5 + Math.random() * 0.9,
        rx: Math.random() * Math.PI * 2,
        ry: Math.random() * Math.PI * 2,
        rz: Math.random() * Math.PI * 2,
        rsx: (Math.random() - 0.5) * 2.2,
        rsy: (Math.random() - 0.5) * 2.2,
        rsz: (Math.random() - 0.5) * 1.4,
        scale: 0.5 + Math.random() * 0.7,
      })),
    [n],
  );

  useEffect(() => {
    mesh.current?.instanceMatrix?.setUsage(THREE.DynamicDrawUsage);
  }, []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    windSm.current = THREE.MathUtils.damp(
      windSm.current,
      katanaState.wind + (katanaState.windImpulse || 0),
      2.2,
      dt,
    );
    const wind = windSm.current;

    for (let i = 0; i < petals.length; i++) {
      const p = petals[i];
      p.y -= p.fall * dt * (1 + wind * 0.7);
      p.x += (Math.sin(t * p.swayFreq + p.phase) * 0.5 + wind * 2.0) * dt;
      p.z += Math.cos(t * p.swayFreq * 0.8 + p.phase) * 0.35 * dt;
      const flut = 1 + wind * 2.5;
      p.rx += dt * p.rsx * flut;
      p.ry += dt * p.rsy * flut;
      p.rz += dt * p.rsz * flut;

      if (p.y < -70) {
        p.y = 80;
        p.x = (Math.random() - 0.5) * 160;
      }
      if (p.x > 95) p.x = -95;
      if (p.x < -95) p.x = 95;

      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(p.rx, p.ry, p.rz);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, n]} frustumCulled={false}>
      <shapeGeometry args={[petalShape(), 6]} />
      <meshStandardMaterial
        color="#F2C4CE"
        roughness={0.55}
        metalness={0}
        side={THREE.DoubleSide}
        transparent
        opacity={0.92}
        emissive="#F2C4CE"
        emissiveIntensity={0.12}
      />
    </instancedMesh>
  );
}
