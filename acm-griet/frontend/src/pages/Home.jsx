import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Gallery from '../components/sections/Gallery';
import JoinUs from '../components/sections/JoinUs';
import ScrollToTop from '../components/ui/ScrollToTop';

const Home = () => {
  return (
    <div className="min-h-screen bg-acm-pattern text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Gallery />
        <JoinUs />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Home;
