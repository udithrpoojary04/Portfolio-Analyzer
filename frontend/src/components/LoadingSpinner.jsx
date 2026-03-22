import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ size = 'md', color = 'primary' }) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  const colorClasses = {
    primary: 'text-primary-500',
    emerald: 'text-emerald-500',
    white: 'text-white',
  };

  return (
    <div className="flex items-center justify-center">
      <Loader2 className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin`} />
    </div>
  );
};

export default LoadingSpinner;
