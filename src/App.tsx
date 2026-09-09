import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

export default function App() {
  return (
    <div className="min-h-screen bg-midnight-950 text-gray-200 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <CTA />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
