import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { gsap, ScrollTrigger, REDUCED } from "../utils/gsapSetup";
import Katana from "./Katana";
import Petals from "./Petals";
import { katanaState, katanaAPI } from "./katanaState";

const CAM_END = { x: 64, y: 16, z: 150, tx: 0, ty: 4, tz: 0 };

function Rig() {
  const camera = useThree((s) => s.camera);
  const look = useRef(new THREE.Vector3());

  useEffect(() => {
    const onMove = (e) => {
      katanaState.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      katanaState.mouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05);
    const c = katanaState.cam;
    const m = katanaState.mouse;
    const px = katanaState.parallax;
    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      c.x + m.x * 7 * px,
      3.2,
      d,
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      c.y + m.y * 4 * px,
      3.2,
      d,
    );
    camera.position.z = THREE.MathUtils.damp(camera.position.z, c.z, 3.2, d);
    look.current.set(c.tx, c.ty, c.tz);
    camera.lookAt(look.current);
  });

  useEffect(() => {
    if (REDUCED) {
      Object.assign(katanaState, { unsheath: 1, sayaLift: 1, baseY: 46 });
      Object.assign(katanaState.cam, CAM_END);
      return;
    }

    const tl = gsap
      .timeline({ paused: true })
      .to(katanaState, { baseY: 46, duration: 2.6, ease: "power2.inOut" }, 0.35)
      .to(
        katanaState,
        { unsheath: 1, duration: 1.7, ease: "power3.inOut" },
        0.35,
      )
      .to(katanaState, { wind: 2.4, duration: 0.45, ease: "power2.out" }, 0.75)
      .to(katanaState, { wind: 0, duration: 2.0, ease: "power1.in" }, 1.2)
      .to(katanaState, { sayaLift: 1, duration: 1.7, ease: "power2.in" }, 1.1)
      .to(
        katanaState.cam,
        { ...CAM_END, duration: 2.6, ease: "power2.inOut" },
        0.35,
      );

    katanaAPI.replay = () => tl.play();
    return () => {
      tl.kill();
      katanaAPI.replay = () => {};
    };
  }, []);

  return null;
}

function HeroScrollLink() {
  useEffect(() => {
    if (!document.querySelector("#hero")) return;
    const st = ScrollTrigger.create({
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        katanaState.heroScroll = self.progress;
      },
    });
    return () => st.kill();
  }, []);
  return null;
}

export default function KatanaScene({ active = true }) {
  return (
    <div className="fixed inset-0 z-0" aria-hidden>
      <Canvas
        dpr={[1, 2]}
        frameloop={active ? "always" : "never"}
        camera={{ position: [60, 20, 140], fov: 35, near: 0.5, far: 600 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#141210"]} />
        <fog attach="fog" args={["#141210", 180, 420]} />
        <ambientLight intensity={0.15} />
        <directionalLight
          position={[60, 80, 40]}
          intensity={1.6}
          color="#fff4e0"
        />
        <directionalLight
          position={[-80, 40, -60]}
          intensity={0.6}
          color="#7a8ba3"
        />
        <Suspense fallback={null}>
          <Katana />
          <Petals />
          <Environment preset="city" />
        </Suspense>
        <Rig />
        <HeroScrollLink />
      </Canvas>
    </div>
  );
}
