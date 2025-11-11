import { Loader2 } from 'lucide-react';

// ==================== LOADER COMPONENTS ====================

// Simple Spinner Loader
export function SpinnerLoader({ size = 'md', color = 'gray' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };
  
  const colors = {
    gray: 'text-gray-900',
    white: 'text-white'
  };
  
  return (
    <Loader2 className={`${sizes[size]} ${colors[color]} animate-spin`} />
  );
}

// Full Page Loader
export function FullPageLoader({ message = 'Loading...' }) {
  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        <SpinnerLoader size="xl" />
        <p className="mt-4 text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  );
}

// Inline Loader (for buttons, sections, etc.)
export function InlineLoader({ message }) {
  return (
    <div className="flex items-center justify-center space-x-3 py-8">
      <SpinnerLoader size="md" />
      {message && <span className="text-gray-600">{message}</span>}
    </div>
  );
}

// Skeleton Loader (for content loading)
export function SkeletonLoader() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  );
}

// Card Skeleton Loader
export function CardSkeletonLoader() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse">
      <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
}
