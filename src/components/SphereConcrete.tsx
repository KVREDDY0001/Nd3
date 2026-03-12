import { useRef, useState } from 'react'
import { Mesh, Vector3 } from 'three'
import { useFrame } from '@react-three/fiber'

interface SphereMarbleProps {
  position: [number, number, number]
  setBg?: (bg: 'exterior' | 'interior' | null) => void
}

export default function SphereMarble({ position, setBg }: SphereMarbleProps) {
  const mesh = useRef<Mesh>(null!)
  const [hovered, setHovered] = useState(false)
  // Reuse Vector3 to avoid allocations each frame
  const targetScaleVec = new Vector3()

  useFrame((_, delta) => {
    mesh.current.rotation.y -= 0.002
    mesh.current.rotation.x -= 0.0005
    // Smooth scale on hover — use Vector3 instead of plain object
    const s = hovered ? 1.08 : 1
    targetScaleVec.set(s, s, s)
    mesh.current.scale.lerp(targetScaleVec, delta * 4)
  })

  return (
    <mesh
      ref={mesh}
      position={position}
      onPointerEnter={() => {
        setHovered(true)
        document.body.style.cursor = 'none'
        setBg?.('interior')
      }}
      onPointerLeave={() => {
        setHovered(false)
        document.body.style.cursor = 'none'
        setBg?.(null)
      }}
      onClick={() => (window.location.href = '/interior')}
    >
      <sphereGeometry args={[0.9, 64, 64]} />
      <meshPhysicalMaterial
        color="#f97316"
        roughness={0.15}
        metalness={0.05}
        clearcoat={1}
        clearcoatRoughness={0.08}
        emissive={hovered ? '#2563eb' : '#3d1d00'}
        emissiveIntensity={hovered ? 0.4 : 0.1}
      />
    </mesh>
  )
}