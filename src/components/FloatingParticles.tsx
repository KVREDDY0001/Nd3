import { useRef, useMemo } from 'react'
import { Points, BufferAttribute } from 'three'
import { useFrame } from '@react-three/fiber'

export default function FloatingParticles() {
  const points = useRef<Points>(null!)
  const count = 200

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return pos
  }, [])

  useFrame((state) => {
    if (!points.current) return
    const time = state.clock.elapsedTime
    const posAttr = points.current.geometry.getAttribute('position') as BufferAttribute
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      posAttr.array[i3 + 1] += Math.sin(time * 0.3 + i * 0.1) * 0.0008
      posAttr.array[i3] += Math.cos(time * 0.2 + i * 0.05) * 0.0003
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
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