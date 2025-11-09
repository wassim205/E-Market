import { useState } from 'react';
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

// ==================== DEMO COMPONENT ====================

// export default function MinimalistComponents() {
    // const [showFullLoader, setShowFullLoader] = useState(false);
    
  
//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="mb-12">
//           <h1 className="text-3xl font-light text-gray-900 mb-2">
//             Components Library
//           </h1>
//           <p className="text-gray-600">Loaders and Toast Notifications</p>
//         </div>
        
//         {/* Loaders Section */}
//         <section className="mb-16">
//           <h2 className="text-2xl font-light text-gray-900 mb-6">Loaders</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Spinner Loaders */}
//             <div className="bg-white border border-gray-200 rounded-lg p-6">
//               <h3 className="font-medium text-gray-900 mb-4">Spinner Loaders</h3>
//               <div className="flex items-center space-x-8">
//                 <div className="text-center">
//                   <SpinnerLoader size="sm" />
//                   <p className="text-xs text-gray-500 mt-2">Small</p>
//                 </div>
//                 <div className="text-center">
//                   <SpinnerLoader size="md" />
//                   <p className="text-xs text-gray-500 mt-2">Medium</p>
//                 </div>
//                 <div className="text-center">
//                   <SpinnerLoader size="lg" />
//                   <p className="text-xs text-gray-500 mt-2">Large</p>
//                 </div>
//                 <div className="text-center">
//                   <SpinnerLoader size="xl" />
//                   <p className="text-xs text-gray-500 mt-2">XLarge</p>
//                 </div>
//               </div>
//             </div>
            
//             {/* Inline Loader */}
//             <div className="bg-white border border-gray-200 rounded-lg p-6">
//               <h3 className="font-medium text-gray-900 mb-4">Inline Loader</h3>
//               <InlineLoader message="Loading content..." />
//             </div>
            
//             {/* Skeleton Loader */}
//             <div className="bg-white border border-gray-200 rounded-lg p-6">
//               <h3 className="font-medium text-gray-900 mb-4">Skeleton Loader</h3>
//               <SkeletonLoader />
//             </div>
            
//             {/* Card Skeleton */}
//             <div className="bg-white border border-gray-200 rounded-lg p-6">
//               <h3 className="font-medium text-gray-900 mb-4">Card Skeleton</h3>
//               <CardSkeletonLoader />
//             </div>
            
//             {/* Full Page Loader Demo */}
//             <div className="bg-white border border-gray-200 rounded-lg p-6">
//               <h3 className="font-medium text-gray-900 mb-4">Full Page Loader</h3>
//               <button 
//                 onClick={() => {
//                   setShowFullLoader(true);
//                   setTimeout(() => setShowFullLoader(false), 3000);
//                 }}
//                 className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-all text-sm font-medium"
//               >
//                 Show Full Page Loader
//               </button>
//               <p className="text-xs text-gray-500 mt-2">Will auto-close in 3 seconds</p>
//             </div>
            
//             {/* Button with Loader */}
//             <div className="bg-white border border-gray-200 rounded-lg p-6">
//               <h3 className="font-medium text-gray-900 mb-4">Button with Loader</h3>
//               <button className="bg-gray-900 text-white px-6 py-2 rounded-lg flex items-center space-x-2">
//                 <SpinnerLoader size="sm" color="white" />
//                 <span className="text-sm font-medium">Processing...</span>
//               </button>
//             </div>
//           </div>
//         </section>
        
//         {/* Toast Notifications Section */}
//         <section>
//           <h2 className="text-2xl font-light text-gray-900 mb-6">Toast Notifications</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//             <button 
//               onClick={() => addToast('success', 'Operation completed successfully!')}
//               className="bg-green-100 border border-green-200 text-green-900 px-6 py-3 rounded-lg hover:bg-green-200 transition-all font-medium"
//             >
//               Show Success
//             </button>
//             <button 
//               onClick={() => addToast('error', 'Something went wrong. Please try again.')}
//               className="bg-red-100 border border-red-200 text-red-900 px-6 py-3 rounded-lg hover:bg-red-200 transition-all font-medium"
//             >
//               Show Error
//             </button>
//             <button 
//               onClick={() => addToast('warning', 'Warning: Your session will expire soon.')}
//               className="bg-yellow-100 border border-yellow-200 text-yellow-900 px-6 py-3 rounded-lg hover:bg-yellow-200 transition-all font-medium"
//             >
//               Show Warning
//             </button>
//             <button 
//               onClick={() => addToast('info', 'New features are now available!')}
//               className="bg-blue-100 border border-blue-200 text-blue-900 px-6 py-3 rounded-lg hover:bg-blue-200 transition-all font-medium"
//             >
//               Show Info
//             </button>
//           </div>
          
//           {/* Static Toast Examples */}
//           <div className="bg-white border border-gray-200 rounded-lg p-6">
//             <h3 className="font-medium text-gray-900 mb-4">Toast Examples (Static)</h3>
//             <div className="space-y-3">
//               <Toast type="success" message="Product added to cart successfully!" autoClose={false} />
//               <Toast type="error" message="Failed to process payment. Please check your card details." autoClose={false} />
//               <Toast type="warning" message="Low stock: Only 3 items remaining." autoClose={false} />
//               <Toast type="info" message="Your order has been shipped and is on the way." autoClose={false} />
//             </div>
//           </div>
//         </section>
//       </div>
      
//       {/* Toast Container */}
//       <ToastContainer toasts={toasts} removeToast={removeToast} />
      
//       {/* Full Page Loader */}
//       {showFullLoader && <FullPageLoader message="Processing your request..." />}
//     </div>
//   );
// }