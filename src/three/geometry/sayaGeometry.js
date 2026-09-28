import * as THREE from "three";
import { soriOffset } from "./curveUtils";

export const SAYA_CONFIG = {
  length: 72.5,
  mouthWidth: 3.9,
  mouthThickness: 1.8,
  tipWidth: 2.6,
  tipThickness: 1.0,
  curve: 1.6,
  curveExponent: 1.7,
  segments: 64,
  radialSegments: 28,
};

export function createSayaGeometry(config = SAYA_CONFIG) {
  const {
    length,
    mouthWidth,
    mouthThickness,
    tipWidth,
    tipThickness,
    curve,
    curveExponent,
    segments,
    radialSegments,
  } = config;

  const lerp = (a, b, k) => a + (b - a) * k;
  const positions = [],
    uvs = [],
    indices = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    let rx = lerp(mouthWidth, tipWidth, t) / 2;
    let rz = lerp(mouthThickness, tipThickness, t) / 2;
    const z0 = soriOffset(t, curve, curveExponent);
    if (i === segments) {
      rx *= 0.14;
      rz *= 0.14;
    }

    for (let j = 0; j <= radialSegments; j++) {
      const a = (j / radialSegments) * Math.PI * 2;
      positions.push(Math.cos(a) * rx, t * length, Math.sin(a) * rz + z0);
      uvs.push(j / radialSegments, t);
    }
  }

  const row = radialSegments + 1;
  for (let i = 0; i < segments; i++) {
    for (let j = 0; j < radialSegments; j++) {
      const A = i * row + j;
      indices.push(A, A + row, A + row + 1, A, A + row + 1, A + 1);
    }
  }
  const capCenter = positions.length / 3;
  positions.push(0, length, soriOffset(1, curve, curveExponent));
  uvs.push(0.5, 1);
  for (let j = 0; j < radialSegments; j++) {
    const A = segments * row + j;
    indices.push(capCenter, A + 1, A);
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  g.setIndex(indices);
  g.computeVertexNormals();
  return g;
}
