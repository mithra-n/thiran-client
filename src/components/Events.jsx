import { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Users, Clock, Trophy } from 'lucide-react';
import Scene3D from './Scene3D';
import { Badge } from './ui/Badge';
import { cn } from '../lib/utils';

// Event data
export const eventsData = [
  {
    id: 1,
    name: 'Code Sprint',
    category: 'Technical',
    icon: '💻',
    color: '#a855f7',
    gradient: 'from-purple-500 to-violet-600',
    position: 'left-top',
    participants: '2 per team',
    duration: '3 hours',
    rules: [
      'Duration: 3 hours',
      'Languages allowed: C, C++, Java, Python',
      'Internet access is not permitted',
      'Teams must bring their own laptops',
      'Plagiarism leads to disqualification',
    ],
    description:
      'Put your coding skills to the ultimate test! Solve algorithmic challenges and compete against the best coders of PSG Tech.',
    prize: '₹10,000',
  },
  {
    id: 2,
    name: 'RoboWars',
    category: 'Technical',
    icon: '🤖',
    color: '#ec4899',
    gradient: 'from-pink-500 to-rose-600',
    position: 'left-bottom',
    participants: '4 per team',
    duration: '2 hours',
    rules: [
      'Robot weight limit: 25kg',
      'Dimensions: 50cm x 50cm x 50cm max',
      'Remote controlled only',
      'No projectile weapons',
      'Safety gear mandatory',
    ],
    description:
      'Build, battle, and dominate! Design your ultimate fighting robot and enter the arena for an epic showdown.',
    prize: '₹25,000',
  },
  {
    id: 3,
    name: 'Hackathon',
    category: 'Technical',
    icon: '🔧',
    color: '#06b6d4',
    gradient: 'from-cyan-500 to-teal-600',
    position: 'right-top',
    participants: '3-4 per team',
    duration: '24 hours',
    rules: [
      'Duration: 24 hours',
      'Theme will be revealed at the start',
      'Use of open-source libraries allowed',
      'Must present a working prototype',
      'Judging based on innovation, feasibility, and presentation',
    ],
    description:
      'Innovate, create, and disrupt! 24 hours to build a solution that could change the world. Are you ready?',
    prize: '₹30,000',
  },
  {
    id: 4,
    name: 'Circuit Mania',
    category: 'Technical',
    icon: '⚡',
    color: '#f59e0b',
    gradient: 'from-amber-500 to-orange-600',
    position: 'right-bottom',
    participants: '2 per team',
    duration: '2 hours',
    rules: [
      'Components will be provided',
      'Duration: 2 hours',
      'No pre-built circuits allowed',
      'Documentation must be submitted',
      'Both analog and digital challenges',
    ],
    description:
      'Master the art of electronics! Design and build circuits to solve real-world problems in this electrifying challenge.',
    prize: '₹8,000',
  },
  {
    id: 5,
    name: 'Tech Quiz',
    category: 'Non-Technical',
    icon: '🧠',
    color: '#10b981',
    gradient: 'from-emerald-500 to-green-600',
    position: 'bottom',
    participants: '2 per team',
    duration: '1.5 hours',
    rules: [
      'Prelims: Written round',
      'Finals: Buzzer round',
      'Topics: Tech, Science, Current Affairs',
      'No electronic devices allowed',
      'Decision of quizmaster is final',
    ],
    description:
      'Test your knowledge across technology, science, and current affairs. Only the sharpest minds will prevail!',
    prize: '₹5,000',
  },
];

const EventCard = ({ event, onClick, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onClick(event)}
      className="group cursor-pointer relative"
    >
      <div className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-white/[0.08] backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6 h-full relative overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-lg hover:shadow-purple-500/5">
        {/* Gradient overlay on hover */}
        <div
          className={cn('absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-all duration-500', event.gradient)}
        />

        {/* Top row - Icon and Arrow */}
        <div className="flex items-start justify-between mb-3 sm:mb-4 relative z-10">
          <motion.div
            className={cn('w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br flex items-center justify-center text-xl sm:text-2xl shadow-lg', event.gradient)}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            {event.icon}
          </motion.div>
          <motion.div
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
          >
            <ArrowUpRight size={16} className="text-white sm:w-[18px] sm:h-[18px]" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold"
              style={{
                background: `linear-gradient(135deg, ${event.color}20, ${event.color}10)`,
                color: event.color,
              }}
            >
              {event.category}
            </span>
          </div>

          <h3 className="font-heading text-base sm:text-lg lg:text-xl font-bold text-white mb-1.5 sm:mb-2">
            {event.name}
          </h3>

          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-3 sm:mb-4">
            {event.description}
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 pt-3 sm:pt-4 border-t border-white/5">
            <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-gray-500">
              <Users size={10} className="sm:w-3 sm:h-3" />
              <span>{event.participants}</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-gray-500">
              <Clock size={10} className="sm:w-3 sm:h-3" />
              <span>{event.duration}</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs ml-auto">
              <Trophy size={10} className="text-amber-500 sm:w-3 sm:h-3" />
              <span className="font-semibold text-amber-400">{event.prize}</span>
            </div>
          </div>
        </div>

        {/* Decorative corner gradient */}
        <div
          className={cn('absolute -top-16 -right-16 sm:-top-20 sm:-right-20 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br opacity-5 blur-2xl group-hover:opacity-20 transition-opacity duration-500', event.gradient)}
        />
      </div>
    </motion.div>
  );
};

const Events = ({ onEventClick, mousePosition }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const leftEvents = eventsData.filter(
    (e) => e.position === 'left-top' || e.position === 'left-bottom'
  );
  const rightEvents = eventsData.filter(
    (e) => e.position === 'right-top' || e.position === 'right-bottom'
  );
  const bottomEvent = eventsData.find((e) => e.position === 'bottom');

  return (
    <section
      ref={sectionRef}
      id="events"
      className="section relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] lg:w-[1000px] h-[600px] sm:h-[800px] lg:h-[1000px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-10 sm:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex justify-center mb-4 sm:mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Badge variant="gradient">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
              Explore Events
            </Badge>
          </motion.div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="text-white">Choose Your </span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">Arena</span>
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Showcase your skills, compete with the best, and win exciting prizes!
          </p>
        </motion.div>

        {/* Events layout with 3D object in center */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-start">
          {/* Left column - 2 events */}
          <div className="space-y-4 sm:space-y-6">
            {leftEvents.map((event, idx) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={onEventClick}
                index={idx}
              />
            ))}
          </div>

          {/* Center - 3D VR Object */}
          <motion.div
            className="h-[300px] sm:h-[350px] lg:h-[500px] relative order-first md:order-first lg:order-none col-span-1 md:col-span-2 lg:col-span-1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                className="absolute w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(168,85,247,0.3) 0%, rgba(236,72,153,0.2) 50%, transparent 70%)',
                  filter: 'blur(40px)',
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>

            <Suspense
              fallback={
                <div className="h-full flex items-center justify-center">
                  <div className="relative">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-purple-500/20 rounded-full" />
                    <div className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                </div>
              }
            >
              <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <Scene3D mousePosition={mousePosition} />
              </Canvas>
            </Suspense>

            {/* Interaction hint */}
            <motion.div
              className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <p className="text-[10px] sm:text-xs text-gray-500 flex items-center gap-1.5 sm:gap-2">
                <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-gray-600 flex items-center justify-center">
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-gray-500 animate-ping" />
                </span>
                Move cursor to interact
              </p>
            </motion.div>
          </motion.div>

          {/* Right column - 2 events */}
          <div className="space-y-4 sm:space-y-6">
            {rightEvents.map((event, idx) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={onEventClick}
                index={idx + 2}
              />
            ))}
          </div>
        </div>

        {/* Bottom event - Full width featured */}
        {bottomEvent && (
          <motion.div
            className="mt-8 sm:mt-10 lg:mt-12 max-w-xl lg:max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            <div className="text-center mb-3 sm:mb-4">
              <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">Featured Event</span>
            </div>
            <EventCard event={bottomEvent} onClick={onEventClick} index={4} />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Events;
