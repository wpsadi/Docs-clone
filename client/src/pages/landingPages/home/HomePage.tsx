
import Hero from "./Hero"
import Features from "./Features"
import NewsLetter from "./NewsLetter"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
        <Navbar/>
      <main className="flex-1">
        <Hero/>
        <Features/>
        <NewsLetter/>
      </main>
     <Footer/>
    </div>
  )
}