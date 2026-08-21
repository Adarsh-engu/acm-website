import { Code, Users, Calendar, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const features = [
    {
      name: 'Workshops',
      description: 'Hands-on sessions on the latest technologies like AI, Web Dev, and Cloud.',
      icon: Code,
    },
    {
      name: 'Hackathons',
      description: 'Compete, collaborate, and build innovative solutions in our premier events.',
      icon: Lightbulb,
    },
    {
      name: 'Mentorship',
      description: 'Get guided by seniors and industry experts to navigate your tech career.',
      icon: Users,
    },
    {
      name: 'Community',
      description: 'Be part of a thriving ecosystem of like-minded tech enthusiasts.',
      icon: Calendar,
    },
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-display font-bold text-gray-900 sm:text-4xl">About Us</h2>
          <p className="mt-4 text-lg text-gray-600">
            The Association for Computing Machinery (ACM) Student Chapter at GRIET is dedicated to advancing computing as a science and a profession.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="w-12 h-12 rounded-lg bg-acm-light flex items-center justify-center mb-4">
                <feature.icon className="text-acm-blue" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.name}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
