import { useMemo } from "react";
import * as THREE from "three";

const NOISE = `
  float hHash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float hNoise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hHash(i), hHash(i + vec2(1.0, 0.0)), u.x),
      mix(hHash(i + vec2(0.0, 1.0)), hHash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }
  
  float hamonLine(float t) {
    return 0.34
      + sin(t * 34.0) * 0.028
      + sin(t * 71.0 + 2.1) * 0.015
      + hNoise(vec2(t * 16.0, 4.2)) * 0.045;
  }
`;

export default function HamonMaterial() {
  const material = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: "#9ba3ab",
      metalness: 0.92,
      roughness: 0.3,
      envMapIntensity: 1.4,
    });
    mat.defines = { USE_UV: "" };

    mat.onBeforeCompile = (shader) => {
      shader.fragmentShader = shader.fragmentShader
        .replace("#include <common>", `#include <common>\n${NOISE}`)
        .replace(
          "#include <color_fragment>",
          `#include <color_fragment>
        {
          float line = hamonLine(vUv.y);
          float d = vUv.x - line;
          float cloud = hNoise(vec2(vUv.y * 55.0, vUv.x * 22.0));
          float yakiba = 1.0 - smoothstep(-0.03, 0.02, d + (cloud - 0.5) * 0.05);
          float rim = exp(-pow(d * 26.0, 2.0));
          float nie = step(0.88, hNoise(vec2(vUv.y * 150.0, vUv.x * 60.0))) * yakiba;
          float grain = hNoise(vec2(vUv.x * 42.0, vUv.y * 3.0)) * 0.05;

          vec3 mist = vec3(0.90, 0.92, 0.95) * (0.85 + cloud * 0.18);
          diffuseColor.rgb = mix(diffuseColor.rgb, mist, yakiba * 0.42);
          diffuseColor.rgb += vec3(0.09) * rim;
          diffuseColor.rgb += vec3(0.22) * nie;
          diffuseColor.rgb *= 1.0 - grain;
        }`,
        );
    };
    return mat;
  }, []);

  return <primitive object={material} attach="material" />;
}
