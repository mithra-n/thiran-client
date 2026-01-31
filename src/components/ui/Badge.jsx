import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const Badge = forwardRef(({ className, variant = 'default', ...props }, ref) => {
  const variants = {
    default: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    secondary: 'bg-gray-500/10 text-gray-300 border-gray-500/20',
    success: 'bg-green-500/10 text-green-300 border-green-500/20',
    destructive: 'bg-red-500/10 text-red-300 border-red-500/20',
    outline: 'bg-transparent text-gray-300 border-white/20',
    gradient: 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border-white/10',
  };

  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors',
        variants[variant],
        className
      )}
      {...props}
    />
  );
});

Badge.displayName = 'Badge';

export { Badge };
