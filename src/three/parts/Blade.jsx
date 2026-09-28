import { useMemo } from "react";
import { createBladeGeometry, BLADE_CONFIG } from "../geometry/bladeGeometry";
import HamonMaterial from "../materials/HamonMaterial";

export default function Blade() {
  const geometry = useMemo(() => createBladeGeometry(BLADE_CONFIG), []);
  return (
    <mesh geometry={geometry}>
      <HamonMaterial />
    </mesh>
  );
}
