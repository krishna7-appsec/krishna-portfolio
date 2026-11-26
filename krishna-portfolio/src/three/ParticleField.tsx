import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { BufferAttribute, BufferGeometry, type Points } from 'three'
import { seededPoints } from './geometry'

/** A sparse, slowly drifting cloud of particles behind the sphere. */
export default function ParticleField() {
  const ref = useRef<Points | null>(null)
  const geometry = useMemo(() => new BufferGeometry().setAttribute('position', new BufferAttribute(seededPoints(120, 9, 7), 3)), [])
  useEffect(() => () => geometry.dispose(), [geometry])
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02
  })
  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial color="#929CAA" size={0.025} sizeAttenuation transparent opacity={0.55} />
    </points>
  )
}
