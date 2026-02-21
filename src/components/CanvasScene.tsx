'use client'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import SphereConcrete from './SphereConcrete'
import SphereMarble from './SphereMarble'

interface CanvasSceneProps {
  setBg: (bg: 'exterior' | 'interior' | null) => void
}

export default function CanvasScene({ setBg }: CanvasSceneProps) {
  return (
    <Canvas 
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      style={{ width: '100%', height: '100%', background: '#0a0a0a' }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: false }}
    >
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1.5} 
        castShadow
      />
      <pointLight position={[-10, -10, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[0, 5, 3]} intensity={0.6} color="#e8e8e8" />
      
      {/* Environment - studio preset only */}
      <Environment preset="studio" />

      {/* Spheres */}
      <SphereConcrete position={[-1.8, 0, 0]} setBg={setBg} />
      <SphereMarble position={[1.8, 0, 0]} setBg={setBg} />
    </Canvas>
  )
}