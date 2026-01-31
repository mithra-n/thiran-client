import { motion } from 'framer-motion';
import { Sparkles, Mail, MapPin, Phone, Instagram, Twitter, Linkedin, Youtube, ArrowUpRight } from 'lucide-react';
import { Button } from './ui/Button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Quick Links',
      links: [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Events', href: '#events' },
        { name: 'Register', href: '#events' },
      ],
    },
    {
      title: 'Events',
      links: [
        { name: 'Code Sprint', href: '#events' },
        { name: 'RoboWars', href: '#events' },
        { name: 'Hackathon', href: '#events' },
        { name: 'Tech Quiz', href: '#events' },
      ],
    },
    {
      title: 'Contact',
      links: [
        { name: 'thiran@psgtech.ac.in', href: 'mailto:thiran@psgtech.ac.in', icon: Mail },
        { name: 'PSG Tech, Coimbatore', href: '#', icon: MapPin },
        { name: '+91 98765 43210', href: 'tel:+919876543210', icon: Phone },
      ],
    },
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer id="contact" className="section relative pb-6 sm:pb-8 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] lg:w-[800px] h-[200px] sm:h-[300px] lg:h-[400px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top section with CTA */}
        <motion.div
          className="bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent border border-white/[0.08] backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 mb-10 sm:mb-12 lg:mb-16 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative z-10">
            <motion.div
              className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg shadow-purple-500/30"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Sparkles size={24} className="text-white sm:w-7 sm:h-7" />
            </motion.div>
            <h3 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              Ready to Make Your Mark?
            </h3>
            <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
              Join hundreds of students competing for glory at Thiran 2026. Don't miss your chance to showcase your skills!
            </p>
            <Button variant="primary" size="lg" className="group">
              <span>Register Now</span>
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Button>
          </div>
        </motion.div>

        {/* Main footer content */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
          {/* Brand section */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-2">
            <motion.a
              href="#home"
              className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
              </div>
              <div className="font-display text-xl sm:text-2xl font-bold">
                <span className="text-white">THIRAN</span>
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">'26</span>
              </div>
            </motion.a>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-4 sm:mb-6 max-w-sm">
              PSG College of Technology's premier intra-college technical festival. Where innovation meets competition.
            </p>
            <div className="flex gap-2 sm:gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links sections */}
          {footerLinks.map((section, index) => (
            <div key={index} className="col-span-1">
              <h4 className="font-heading font-semibold text-white text-sm sm:text-base mb-3 sm:mb-4">{section.title}</h4>
              <ul className="space-y-2 sm:space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 sm:gap-2 group"
                    >
                      {link.icon && <link.icon size={12} className="text-purple-400 sm:w-[14px] sm:h-[14px]" />}
                      <span className="group-hover:translate-x-0.5 transition-transform">{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 sm:pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
            © {currentYear} Thiran 2026. PSG College of Technology. All rights reserved.
          </p>
          <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Code of Conduct</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
