import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductIntro } from './components/ProductIntro';
import { Features } from './components/Features';
import { Architecture } from './components/Architecture';
import { OpenSource } from './components/OpenSource';
import { ConversionCTA } from './components/ConversionCTA';
import { Footer } from './components/Footer';

function App() {
  useEffect(() => {
    // Check local storage for theme preference, otherwise default to dark mode
    const storedTheme = localStorage.getItem('theme');
    
    if (storedTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      if (!storedTheme) localStorage.setItem('theme', 'dark');
    }
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-50 font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800 transition-colors duration-300">
      <Navbar />
      <main>
        <Hero />
        <ProductIntro />
        <Features />
        <Architecture />
        <OpenSource />
        <ConversionCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
