import { useRef, useState } from 'react'
import { Mesh } from 'three'
import { useFrame } from '@react-three/fiber'

export default function SphereConcrete({ position }: { position: [number, number, number] }) {
  const mesh = useRef<Mesh>(null!)
  const [hovered, setHovered] = useState(false)

  useFrame(() => {
    mesh.current.rotation.y += 0.001
  })

  return (
    <mesh
      ref={mesh}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={() => window.location.href = '/exterior'}
    >
      <sphereGeometry args={[0.9, 64, 64]} />
      <meshStandardMaterial
        color="#3a3a3a"
        roughness={0.85}
        metalness={0.05}
        emissive={hovered ? '#111111' : '#000000'}
      />
    </mesh>
  )
}
