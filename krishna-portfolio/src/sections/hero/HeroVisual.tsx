import { Suspense, lazy, useRef, useState } from 'react'
import ErrorBoundary from '../../components/ErrorBoundary'
import { useInView } from '../../hooks/useInView'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { hasWebGL, prefersSaveData, shouldRender3D } from '../../lib/capabilities'
import StaticShield from './StaticShield'

// The whole 3D stack (three.js and react-three-fiber) lives in this lazy chunk.
const Scene = lazy(() => import('../../three/Scene'))

export default function HeroVisual() {
  const ref = useRef<HTMLDivElement | null>(null)
  const reduced = useReducedMotion()
  const isWide = useMediaQuery('(min-width: 768px)')
  const [webgl] = useState(() => hasWebGL())
  const [saveData] = useState(() => prefersSaveData())
  const inView = useInView(ref)
  const use3D = shouldRender3D({ reducedMotion: reduced, isWide, hasWebGL: webgl, saveData })

  return (
    <div ref={ref} className="h-full w-full">
      {use3D ? (
        <ErrorBoundary fallback={<StaticShield />}>
          <Suspense fallback={<StaticShield />}>
            <Scene active={inView} />
          </Suspense>
        </ErrorBoundary>
      ) : (
        <StaticShield />
      )}
    </div>
  )
}
