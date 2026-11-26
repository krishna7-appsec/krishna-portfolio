import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'
import ScrollManager from './ScrollManager'
import SkipLink from './SkipLink'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <SkipLink />
      <ScrollManager />
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Suspense fallback={<p role="status" className="px-8 py-24 text-muted">Loading…</p>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
