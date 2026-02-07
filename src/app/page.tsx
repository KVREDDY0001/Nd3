'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Scene from '@/components/Scene'

export default function Home() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 40 }}
      gl={{ antialias: true }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}
