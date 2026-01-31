import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Rocket, Trophy, Users, Lightbulb, Zap, Target } from 'lucide-react';
import { Badge } from './ui/Badge';
import { cn } from '../lib/utils';

const features = [
  {
    icon: Rocket,
    title: 'Innovation Hub',
    description:
      'Experience cutting-edge technology and innovative solutions crafted by brilliant minds of PSG Tech.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Trophy,
    title: 'Compete & Win',
    description:
      'Battle it out with the best in various technical and non-technical events. Exciting prizes await!',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    icon: Users,
    title: 'Network & Connect',
    description:
      'Build lasting connections with fellow students, industry experts, and tech enthusiasts.',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Lightbulb,
    title: 'Learn & Grow',
    description:
      'Workshops, seminars, and hands-on sessions to sharpen your skills and expand your knowledge.',
    gradient: 'from-amber-500 to-orange-500',
  },
];

const stats = [
  { value: '20+', label: 'Events', icon: Target },
  { value: '1000+', label: 'Participants', icon: Users },
  { value: '₹1L+', label: 'Prize Pool', icon: Trophy },
  { value: '3', label: 'Days', icon: Zap },
];

const WhyThiran = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-10 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="flex justify-center mb-4 sm:mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Badge variant="gradient">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              About Thiran
            </Badge>
          </motion.div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="text-white">Why </span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">THIRAN</span>
            <span className="text-white">?</span>
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
            Thiran, meaning{' '}
            <span className="text-purple-400 font-medium">"ability"</span> or{' '}
            <span className="text-pink-400 font-medium">"skill"</span> in Tamil,
            is PSG Tech's premier intra-college technical festival. Where passion
            meets opportunity.
          </p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-12 sm:mb-16 lg:mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-white/[0.08] backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 h-full relative overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-lg hover:shadow-purple-500/5">
                {/* Gradient overlay on hover */}
                <div
                  className={cn('absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500', feature.gradient)}
                />

                {/* Icon */}
                <div
                  className={cn('w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg', feature.gradient)}
                >
                  <feature.icon size={20} className="text-white sm:w-6 sm:h-6" />
                </div>

                {/* Content */}
                <h3 className="font-heading text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative corner */}
                <div
                  className={cn('absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-bl opacity-10 rounded-bl-3xl', feature.gradient)}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats section */}
        <motion.div
          className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-white/[0.08] backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/[0.08] mx-auto mb-3 sm:mb-4 flex items-center justify-center group-hover:bg-purple-500/10 transition-colors">
                  <stat.icon size={18} className="text-purple-400 sm:w-5 sm:h-5" />
                </div>
                <div className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1 sm:mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-500 uppercase tracking-wider text-xs sm:text-sm font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quote/Tagline */}
        <motion.div
          className="mt-10 sm:mt-16 lg:mt-20 text-center px-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <blockquote className="text-lg sm:text-2xl lg:text-3xl font-heading font-medium text-gray-300 italic">
            "Where{' '}
            <span className="text-purple-400 not-italic">innovation</span> meets{' '}
            <span className="text-pink-400 not-italic">competition</span>"
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyThiran;
