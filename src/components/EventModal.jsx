import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGoogleLogin } from '@react-oauth/google';
import { X, Users, Clock, Trophy, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/Button';

const EventModal = ({ event, onClose }) => {
  const [email, setEmail] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  // Email validation for @psgtech.ac.in
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@psgtech\.ac\.in$/;
    return regex.test(email);
  };

  // Google OAuth login
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await fetch(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        const data = await response.json();
        
        if (validateEmail(data.email)) {
          setUserInfo(data);
          setEmail(data.email);
          setError('');
        } else {
          setError('Please use your @psgtech.ac.in email to register');
          setUserInfo(null);
        }
      } catch (err) {
        setError('Failed to fetch user information');
      }
    },
    onError: () => {
      setError('Google login failed. Please try again.');
    },
  });

  const handleManualSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid @psgtech.ac.in email address');
      return;
    }

    setIsRegistering(true);
    setTimeout(() => {
      setIsRegistering(false);
      setSuccess(true);
    }, 1500);
  };

  const handleRegisterWithGoogle = () => {
    if (!userInfo) {
      googleLogin();
    } else {
      setIsRegistering(true);
      setTimeout(() => {
        setIsRegistering(false);
        setSuccess(true);
      }, 1500);
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Backdrop with blur */}
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal content */}
        <motion.div
          className="relative w-full max-w-lg sm:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-[#0f0f18]/95 backdrop-blur-xl border border-white/10"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Gradient header background */}
          <div
            className={`absolute top-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-br ${event.gradient || 'from-purple-500 to-pink-500'} opacity-20 rounded-t-2xl sm:rounded-t-3xl`}
          />

          <div className="relative p-4 sm:p-6 lg:p-8">
            {/* Close button */}
            <motion.button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 lg:top-6 lg:right-6 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={16} className="sm:w-5 sm:h-5" />
            </motion.button>

            {/* Event header */}
            <div className="flex items-start gap-3 sm:gap-4 lg:gap-5 mb-5 sm:mb-6 lg:mb-8 pr-8">
              <motion.div
                className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br ${event.gradient || 'from-purple-500 to-pink-500'} flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl shadow-2xl flex-shrink-0`}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', delay: 0.1 }}
              >
                {event.icon}
              </motion.div>
              <div className="flex-1 min-w-0">
                <motion.span
                  className="inline-block px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold mb-1.5 sm:mb-2"
                  style={{
                    background: `linear-gradient(135deg, ${event.color}30, ${event.color}10)`,
                    color: event.color,
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {event.category}
                </motion.span>
                <motion.h2
                  className="font-heading text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  {event.name}
                </motion.h2>
              </div>
            </div>

            {/* Description */}
            <motion.p
              className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed mb-5 sm:mb-6 lg:mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {event.description}
            </motion.p>

            {/* Event details cards */}
            <motion.div
              className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4 mb-5 sm:mb-6 lg:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl sm:rounded-2xl p-2.5 sm:p-3 lg:p-4 text-center">
                <Users size={16} className="text-purple-400 mx-auto mb-1.5 sm:mb-2 sm:w-5 sm:h-5" />
                <div className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Team Size</div>
                <div className="text-white font-semibold text-xs sm:text-sm">{event.participants}</div>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl sm:rounded-2xl p-2.5 sm:p-3 lg:p-4 text-center">
                <Clock size={16} className="text-pink-400 mx-auto mb-1.5 sm:mb-2 sm:w-5 sm:h-5" />
                <div className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Duration</div>
                <div className="text-white font-semibold text-xs sm:text-sm">{event.duration || '3 hours'}</div>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl sm:rounded-2xl p-2.5 sm:p-3 lg:p-4 text-center">
                <Trophy size={16} className="text-amber-400 mx-auto mb-1.5 sm:mb-2 sm:w-5 sm:h-5" />
                <div className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Prize Pool</div>
                <div className="text-amber-400 font-bold text-xs sm:text-sm">{event.prize}</div>
              </div>
            </motion.div>

            {/* Rules section */}
            <motion.div
              className="mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                <span className="w-1 h-6 rounded-full bg-gradient-to-b from-purple-500 to-pink-500" />
                Rules & Guidelines
              </h3>
              <ul className="space-y-2.5 sm:space-y-3">
                {event.rules.map((rule, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3 group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + index * 0.05 }}
                  >
                    <span
                      className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 text-[10px] sm:text-xs font-bold transition-all group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${event.color}40, ${event.color}20)`,
                        color: event.color,
                      }}
                    >
                      {index + 1}
                    </span>
                    <span className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors">
                      {rule}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Registration section */}
            <motion.div
              className="pt-5 sm:pt-6 border-t border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
                <span className="w-1 h-6 rounded-full bg-gradient-to-b from-purple-500 to-pink-500" />
                Register Now
              </h3>

              {success ? (
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.1 }}
                  >
                    <CheckCircle2 size={40} className="text-green-400" />
                  </motion.div>
                  <h4 className="font-heading text-2xl font-bold text-green-400 mb-2">
                    Registration Successful!
                  </h4>
                  <p className="text-gray-400">
                    You've been registered for {event.name}. Check your email for confirmation.
                  </p>
                </motion.div>
              ) : (
                <>
                  {/* Google OAuth Button */}
                  <Button
                    onClick={handleRegisterWithGoogle}
                    disabled={isRegistering}
                    variant="secondary"
                    size="lg"
                    className="w-full justify-center bg-white text-gray-900 hover:bg-gray-100 border-transparent"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    {userInfo ? `Register as ${userInfo.name}` : 'Continue with Google'}
                  </Button>

                  <div className="relative my-5 sm:my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-[#0f0f18] text-gray-600 text-xs sm:text-sm">or register with email</span>
                    </div>
                  </div>

                  {/* Manual email registration */}
                  <form onSubmit={handleManualSubmit}>
                    <div className="mb-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@psgtech.ac.in"
                        className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl py-3.5 sm:py-4 px-4 sm:px-5 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                      />
                    </div>

                    {error && (
                      <motion.div
                        className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <AlertCircle size={16} />
                        {error}
                      </motion.div>
                    )}

                    <Button
                      type="submit"
                      disabled={isRegistering}
                      variant="primary"
                      size="lg"
                      className="w-full justify-center"
                    >
                      {isRegistering ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          Registering...
                        </>
                      ) : (
                        'Register for Event'
                      )}
                    </Button>
                  </form>

                  <p className="text-gray-600 text-xs mt-4 text-center">
                    Only PSG Tech students with @psgtech.ac.in email can register
                  </p>
                </>
              )}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EventModal;
