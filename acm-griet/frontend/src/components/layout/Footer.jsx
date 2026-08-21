import { Globe, Mail, MessageSquare, Share2 } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-acm-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-bold text-acm-accent">ACM GRIET</h3>
            <p className="text-gray-400 max-w-xs">
              Empowering students to compute, create, and connect through technology and community.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-acm-accent transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-acm-accent transition-colors">About Us</a></li>
              <li><a href="#gallery" className="text-gray-400 hover:text-acm-accent transition-colors">Gallery</a></li>
              <li><a href="#join-us" className="text-gray-400 hover:text-acm-accent transition-colors">Join Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-acm-blue hover:text-white transition-all">
                <Globe size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-acm-blue hover:text-white transition-all">
                <MessageSquare size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-acm-blue hover:text-white transition-all">
                <Share2 size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-acm-blue hover:text-white transition-all">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} ACM GRIET Student Chapter. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
