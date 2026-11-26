import { useScrollReveal } from '../animations/useScrollReveal'
import { usePageTitle } from '../hooks/usePageTitle'
import About from '../sections/About'
import Contact from '../sections/Contact'
import Education from '../sections/Education'
import Experience from '../sections/Experience'
import Hero from '../sections/Hero'
import Methodology from '../sections/Methodology'
import Projects from '../sections/Projects'
import Resume from '../sections/Resume'
import Skills from '../sections/Skills'
import Technologies from '../sections/Technologies'

export default function Home() {
  usePageTitle()
  useScrollReveal()
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Methodology />
      <Technologies />
      <Education />
      <Resume />
      <Contact />
    </>
  )
}
