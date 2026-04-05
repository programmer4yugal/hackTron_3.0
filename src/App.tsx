import {
  Navbar,
  Hero,
  Features,
  Pricing,
  FAQ,
  Footer,
} from './components'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <Features />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

export default App
