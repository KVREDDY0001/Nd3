import { useRef, useMemo } from 'react'
import { Points } from 'three'
import { useFrame } from '@react-three/fiber'

export default function FloatingParticles() {
  const points = useRef<Points>(null!)
  const count = 200

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 12
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return pos
  }, [])

  useFrame((state) => {
    if (!points.current) return
    const time = state.clock.elapsedTime
    // Access the attribute directly from geometry
    const posAttr = points.current.geometry.attributes.position
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      ;(posAttr.array as Float32Array)[i3 + 1] += Math.sin(time * 0.3 + i * 0.1) * 0.0008
      ;(posAttr.array as Float32Array)[i3]     += Math.cos(time * 0.2 + i * 0.05) * 0.0003
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#60a5fa"
        size={0.015}
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}