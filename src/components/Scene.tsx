import { Environment } from '@react-three/drei'
import SphereConcrete from './SphereConcrete'
import SphereMarble from './SphereMarble'

export default function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />

      {/* HDRI */}
      <Environment preset="city" />

      {/* Objects */}
      <SphereConcrete position={[-1.3, 0, 0]} />
      <SphereMarble position={[1.3, 0, 0]} />
    </>
  )
}
