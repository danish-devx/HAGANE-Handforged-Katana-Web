import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Blade from "./parts/Blade";
import Habaki from "./parts/Habaki";
import Tsuba from "./parts/Tsuba";
import Tsuka from "./parts/Tsuka";
import Saya from "./parts/Saya";
import AnatomyLabels from "./AnatomyLabels";
import { katanaState } from "./katanaState";
import { REDUCED } from "../utils/gsapSetup";

const DRAW_DISTANCE = 73.8;
const SAYA_LIFT_Y = 52;
const SAYA_LIFT_X = 26;
const SAYA_TILT = 0.5;

export default function Katana(props) {
  const rootRef = useRef(null);
  const swordRef = useRef(null);
  const sayaRef = useRef(null);

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;

    if (rootRef.current) {
      if (!REDUCED) {
        rootRef.current.position.y =
          katanaState.baseY + Math.sin(t * 0.55) * 1.1;
        rootRef.current.rotation.z = Math.sin(t * 0.4) * 0.012;
      } else {
        rootRef.current.position.y = katanaState.baseY;
      }
      const targetY =
        katanaState.heroScroll * 0.85 +
        katanaState.anatomyRot +
        katanaState.mouse.x * 0.14 * katanaState.parallax;
      rootRef.current.rotation.y = THREE.MathUtils.damp(
        rootRef.current.rotation.y,
        targetY,
        3,
        d,
      );
    }
    if (swordRef.current) {
      swordRef.current.position.y = katanaState.unsheath * -DRAW_DISTANCE;
    }
    if (sayaRef.current) {
      sayaRef.current.position.y = katanaState.sayaLift * SAYA_LIFT_Y;
      sayaRef.current.position.x = katanaState.sayaLift * SAYA_LIFT_X;
      sayaRef.current.rotation.z = katanaState.sayaLift * SAYA_TILT;
    }
  });

  return (
    <group ref={rootRef} {...props}>
      <Saya ref={sayaRef} />
      <group ref={swordRef}>
        <Blade />
        <Habaki />
        <Tsuba />
        <Tsuka />
        <AnatomyLabels />
      </group>
    </group>
  );
}
