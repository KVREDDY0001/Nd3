import { Environment } from '@react-three/drei'
import SphereConcrete from './SphereConcrete'
import SphereMarble from './SphereMarble'
import FloatingParticles from './FloatingParticles'

export default function Scene() {
  return (
    <>
      {/* Lighting — tuned for blue & orange palette */}
      <ambientLight intensity={0.3} color="#60a5fa" />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#f8fafc" />
      <directionalLight position={[-5, 2, -3]} intensity={0.4} color="#f97316" />
      <pointLight position={[-3, 0, 2]} intensity={0.6} color="#2563eb" distance={10} />
      <pointLight position={[3, 0, 2]} intensity={0.6} color="#f97316" distance={10} />

      {/* HDRI */}
      <Environment preset="night" />

      {/* Floating particles for cinematic depth */}
      <FloatingParticles />

      {/* Objects */}
      <SphereConcrete position={[-1.3, 0, 0]} />
      <SphereMarble position={[1.3, 0, 0]} />
    </>
  )
}