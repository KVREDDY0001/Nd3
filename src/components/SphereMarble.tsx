import { useRef, useState } from 'react'
import { Mesh } from 'three'
import { useFrame } from '@react-three/fiber'

export default function SphereMarble({ position }: { position: [number, number, number] }) {
  const mesh = useRef<Mesh>(null!)
  const [hovered, setHovered] = useState(false)

  useFrame(() => {
    mesh.current.rotation.y -= 0.001
  })

  return (
    <mesh
      ref={mesh}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={() => window.location.href = '/interior'}
    >
      <sphereGeometry args={[0.9, 64, 64]} />
      <meshPhysicalMaterial
        color="#e6e6e6"
        roughness={0.2}
        metalness={0}
        clearcoat={1}
        clearcoatRoughness={0.1}
        emissive={hovered ? '#222222' : '#000000'}
      />
    </mesh>
  )
}
