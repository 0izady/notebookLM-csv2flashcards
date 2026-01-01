import { useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import HeroSection from '../components/HeroSection.jsx';

function LandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main>
          <HeroSection />
        </main>
      </div>
    </>
  )
}

export default LandingPage
