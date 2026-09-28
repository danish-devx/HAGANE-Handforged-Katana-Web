import { useMemo } from "react";
import { createBladeGeometry, BLADE_CONFIG } from "../geometry/bladeGeometry";
import { HABAKI_COPPER } from "../materials/presets";
export default function Habaki() {
  const geometry = useMemo(
    () =>
      createBladeGeometry({
        ...BLADE_CONFIG,
        length: 5.2,
        segments: 8,
        kissakiLength: 0.01,
        curve: 0.02,
        curveExponent: 1,
      }),
    [],
  );
  return (
    <mesh
      geometry={geometry}
      scale={[1.16, 1, 1.2]}
      position={[0, 0.02, -0.07]}
    >
      <meshStandardMaterial {...HABAKI_COPPER} />
    </mesh>
  );
}
