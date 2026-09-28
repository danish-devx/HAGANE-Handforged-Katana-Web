import * as THREE from "three";
import { soriOffset } from "./curveUtils";

export const BLADE_CONFIG = {
  length: 70,
  baseWidth: 3.1,
  tipWidth: 2.1,
  baseThickness: 0.72,
  tipThickness: 0.5,
  curve: 1.6,
  curveExponent: 1.7,
  segments: 120,
  muneRatio: 0.16,
  kissakiLength: 3.6,
};

const lerp = (a, b, k) => a + (b - a) * k;
const smooth = (k) => k * k * (3 - 2 * k);
function crossSection(width, thickness, muneRatio) {
  const w = width / 2;
  const muneHalf = (width * muneRatio) / 2;
  const shinogiZ = -thickness * 0.34;
  const edgeZ = -thickness * 0.84;
  return [
    [-muneHalf, 0, 1],
    [muneHalf, 0, 1],
    [w, shinogiZ, 1],
    [0, edgeZ, 0],
    [-w, shinogiZ, 1],
  ];
}
const STRIPS = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 0],
];

export function createBladeGeometry(config = BLADE_CONFIG) {
  const {
    length,
    baseWidth,
    tipWidth,
    baseThickness,
    tipThickness,
    curve,
    curveExponent,
    segments,
    muneRatio,
    kissakiLength,
  } = config;

  const tKissaki = 1 - kissakiLength / length;
  const rings = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const width = lerp(baseWidth, tipWidth, t);
    const thickness = lerp(baseThickness, tipThickness, t);
    let corners = crossSection(width, thickness, muneRatio);
    if (t > tKissaki) {
      const k = smooth((t - tKissaki) / (1 - tKissaki));
      corners = corners.map(([x, z, u]) => [
        lerp(x, 0, k),
        lerp(z, -0.05, k),
        u,
      ]);
    }
    rings.push({ corners, sori: soriOffset(t, curve, curveExponent), t });
  }
  const positions = [],
    uvs = [],
    indices = [];
  let v = 0;
  for (const [a, b] of STRIPS) {
    for (let i = 0; i <= segments; i++) {
      const { corners, sori, t } = rings[i];
      for (const c of [a, b]) {
        const [x, z, u] = corners[c];
        positions.push(x, t * length, z + sori);
        uvs.push(u, t);
      }
    }
    for (let i = 0; i < segments; i++) {
      const A = v + i * 2;
      indices.push(A, A + 1, A + 3, A, A + 3, A + 2);
    }
    v += (segments + 1) * 2;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}
