import { Canvas } from '@react-three/fiber'
import ParticleField from './ParticleField'
import SecuritySphere from './SecuritySphere'

/** The hero's WebGL scene. `active` pauses rendering entirely when the hero is off screen. */
export default function Scene({ active }: { active: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5.2], fov: 45 }}
      frameloop={active ? 'always' : 'never'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      aria-hidden="true"
    >
      <SecuritySphere />
      <ParticleField />
    </Canvas>
  )
}
