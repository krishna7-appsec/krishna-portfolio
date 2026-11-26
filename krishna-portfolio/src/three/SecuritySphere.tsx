import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { BufferAttribute, BufferGeometry, MathUtils, type Group } from 'three'
import { fibonacciSphere, nearbyPairs, pairsToSegments } from './geometry'

const NODE_COUNT = 70
const RADIUS = 1.4

function toGeometry(positions: Float32Array): BufferGeometry {
  return new BufferGeometry().setAttribute('position', new BufferAttribute(positions, 3))
}

/** Interconnected-node sphere inside a wireframe shell. Spins slowly and tilts toward the pointer. */
export default function SecuritySphere() {
  const tilt = useRef<Group | null>(null)
  const spin = useRef<Group | null>(null)

  const { nodes, lines } = useMemo(() => {
    const points = fibonacciSphere(NODE_COUNT, RADIUS)
    const pairs = nearbyPairs(points, 0.75, 160)
    return { nodes: toGeometry(points), lines: toGeometry(pairsToSegments(points, pairs)) }
  }, [])

  useEffect(() => () => {
    nodes.dispose()
    lines.dispose()
  }, [nodes, lines])

  useFrame((state, delta) => {
    if (spin.current) spin.current.rotation.y += delta * 0.18
    if (tilt.current) {
      tilt.current.rotation.y = MathUtils.damp(tilt.current.rotation.y, state.pointer.x * 0.5, 3, delta)
      tilt.current.rotation.x = MathUtils.damp(tilt.current.rotation.x, -state.pointer.y * 0.3, 3, delta)
    }
  })

  return (
    <group ref={tilt}>
      <group ref={spin}>
        <mesh>
          <icosahedronGeometry args={[RADIUS + 0.35, 1]} />
          <meshBasicMaterial color="#00B8FF" wireframe transparent opacity={0.16} />
        </mesh>
        <lineSegments geometry={lines}>
          <lineBasicMaterial color="#00F5A0" transparent opacity={0.35} />
        </lineSegments>
        <points geometry={nodes}>
          <pointsMaterial color="#00F5A0" size={0.06} sizeAttenuation />
        </points>
      </group>
    </group>
  )
}
