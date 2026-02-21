import { useRef, useState } from 'react'
import { Mesh } from 'three'
import { useFrame } from '@react-three/fiber'

export default function SphereMarble({ position }: { position: [number, number, number] }) {
  const mesh = useRef<Mesh>(null!)
  const [hovered, setHovered] = useState(false)

  useFrame((_, delta) => {
    mesh.current.rotation.y -= 0.002
    mesh.current.rotation.x -= 0.0005
    // Smooth scale on hover
    const targetScale = hovered ? 1.08 : 1
    mesh.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale } as any, delta * 4)
  })

  return (
    <mesh
      ref={mesh}
      position={position}
      onPointerEnter={() => {
        setHovered(true)
        document.body.style.cursor = 'none'
      }}
      onPointerLeave={() => {
        setHovered(false)
        document.body.style.cursor = 'none'
      }}
      onClick={() => window.location.href = '/interior'}
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