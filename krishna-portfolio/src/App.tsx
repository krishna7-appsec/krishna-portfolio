import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './routes/Home'

// Routes other than Home are code-split.
const Learn = lazy(() => import('./routes/Learn'))
const LearnNetworking = lazy(() => import('./routes/LearnNetworking'))
const LearnOwasp = lazy(() => import('./routes/LearnOwasp'))
const Labs = lazy(() => import('./routes/Labs'))
const Blog = lazy(() => import('./routes/Blog'))
const BlogPost = lazy(() => import('./routes/BlogPost'))
const ProjectDetails = lazy(() => import('./routes/ProjectDetails'))
const NotFound = lazy(() => import('./routes/NotFound'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="learn" element={<Learn />} />
        <Route path="learn/networking" element={<LearnNetworking />} />
        <Route path="learn/owasp" element={<LearnOwasp />} />
        <Route path="labs" element={<Labs />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="projects/:slug" element={<ProjectDetails />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
