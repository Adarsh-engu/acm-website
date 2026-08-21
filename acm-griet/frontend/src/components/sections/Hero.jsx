import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-acm-accent font-semibold tracking-wider uppercase text-sm mb-4 block">
            Welcome to
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
            ACM GRIET <br />
            <span className="text-acm-accent">Student Chapter</span>
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-10 drop-shadow">
            Empowering students to compute, create, and connect. Join the largest computer science community on campus.
          </p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#join-us"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#join-us')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 text-lg font-medium rounded-full text-white bg-acm-blue hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all"
            >
              Join Now
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 text-lg font-medium rounded-full text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 shadow-sm transition-all"
            >
              Learn More
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
