import { useRef, useState } from 'react'
import { Mesh } from 'three'
import { useFrame } from '@react-three/fiber'

export default function SphereConcrete({ position }: { position: [number, number, number] }) {
  const mesh = useRef<Mesh>(null!)
  const [hovered, setHovered] = useState(false)

  useFrame((_, delta) => {
    mesh.current.rotation.y += 0.002
    mesh.current.rotation.x += 0.0005
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
      onClick={() => window.location.href = '/exterior'}
    >
      <sphereGeometry args={[0.9, 64, 64]} />
      <meshStandardMaterial
        color="#1a3a6b"
        roughness={0.7}
        metalness={0.15}
        emissive={hovered ? '#f97316' : '#0a1628'}
        emissiveIntensity={hovered ? 0.4 : 0.1}
      />
    </mesh>
  )
}