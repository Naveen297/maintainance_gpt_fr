// // ChatbotScreen/Sidebar.js
// import React from 'react';
// import { X, Loader, FileText, Image } from 'lucide-react';

// const Sidebar = ({ sidebarOpen, setSidebarOpen, selectedImage, loadingImage, isDark }) => {
//   return (
//     <div className={`fixed inset-y-0 right-0 w-96 z-50 transform transition-transform duration-300 ease-in-out ${
//       sidebarOpen ? 'translate-x-0' : 'translate-x-full'
//     } ${isDark ? 'bg-gray-900' : 'bg-white'} border-l ${
//       isDark ? 'border-gray-700' : 'border-gray-200'
//     }`}>
//       <div className="flex items-center justify-between p-4 border-b border-gray-700">
//         <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
//           Document Viewer
//         </h3>
//         <button
//           onClick={() => setSidebarOpen(false)}
//           className={`p-2 rounded-lg hover:bg-gray-700 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
//         >
//           <X className="w-5 h-5" />
//         </button>
//       </div>
      
//       {selectedImage && (
//         <div className="p-4">
//           <div className={`mb-4 p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
//             <div className="flex items-center mb-2 space-x-2">
//               {selectedImage.type === 'text' ? (
//                 <FileText className={`w-4 h-4 ${isDark ? 'text-red-400' : 'text-red-500'}`} />
//               ) : (
//                 <Image className={`w-4 h-4 ${isDark ? 'text-red-400' : 'text-red-500'}`} />
//               )}
//               <h4 className={`font-medium text-sm ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
//                 {selectedImage.source}
//               </h4>
//             </div>
//             <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
//               {selectedImage.type === 'text' ? 'Excel Document' : `Page ${selectedImage.pageNo}`}
//             </p>
//           </div>
          
//           {loadingImage ? (
//             <div className="flex items-center justify-center h-96">
//               <Loader className={`w-8 h-8 animate-spin ${isDark ? 'text-red-400' : 'text-red-500'}`} />
//             </div>
//           ) : selectedImage.type === 'text' ? (
//             // Display text content for Excel files
//             <div className={`p-4 rounded-lg border ${
//               isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
//             }`}>
//               <div className="flex items-center mb-3 space-x-2">
//                 <FileText className={`w-4 h-4 ${isDark ? 'text-red-400' : 'text-red-500'}`} />
//                 <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
//                   Content
//                 </span>
//               </div>
//               <div className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
//                 {selectedImage.textContent}
//               </div>
//             </div>
//           ) : (
//             // Display image for PDF files
//             <div className="relative">
//               <img
//                 src={`data:image/png;base64,${selectedImage.image}`}
//                 alt={`Page ${selectedImage.pageNo}`}
//                 className="w-full h-auto rounded-lg shadow-lg"
//               />
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sidebar;

// ChatbotScreen/Sidebar.js
import React, { useState } from 'react';
import { X, Loader, FileText, Image, ZoomIn, Maximize2 } from 'lucide-react';

const Sidebar = ({ sidebarOpen, setSidebarOpen, selectedImage, loadingImage, isDark }) => {
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const handleImageClick = () => {
    if (selectedImage && selectedImage.type === 'image') {
      setImageModalOpen(true);
    }
  };

  return (
    <>
      {/* Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-96 z-50 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : 'translate-x-full'
      } ${isDark ? 'bg-gray-900' : 'bg-white'} border-l ${
        isDark ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className={`flex items-center justify-between p-4 border-b ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            Document Viewer
          </h3>
          <button
            onClick={() => setSidebarOpen(false)}
            className={`p-2 rounded-lg transition-colors ${
              isDark ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {selectedImage && (
          <div className="p-4 overflow-y-auto h-[calc(100vh-73px)]">
            <div className={`mb-4 p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <div className="flex items-center mb-2 space-x-2">
                {selectedImage.type === 'text' ? (
                  <FileText className={`w-4 h-4 ${isDark ? 'text-red-400' : 'text-red-500'}`} />
                ) : (
                  <Image className={`w-4 h-4 ${isDark ? 'text-red-400' : 'text-red-500'}`} />
                )}
                <h4 className={`font-medium text-sm ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  {selectedImage.source}
                </h4>
              </div>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {selectedImage.type === 'text' ? 'Excel Document' : `Page ${selectedImage.pageNo}`}
              </p>
            </div>
            
            {loadingImage ? (
              <div className="flex items-center justify-center h-96">
                <Loader className={`w-8 h-8 animate-spin ${isDark ? 'text-red-400' : 'text-red-500'}`} />
              </div>
            ) : selectedImage.type === 'text' ? (
              // Display text content for Excel files
              <div className={`p-4 rounded-lg border ${
                isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center mb-3 space-x-2">
                  <FileText className={`w-4 h-4 ${isDark ? 'text-red-400' : 'text-red-500'}`} />
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                    Content
                  </span>
                </div>
                <div className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {selectedImage.textContent}
                </div>
              </div>
            ) : (
              // Display image for PDF files with click to zoom
              <div className="relative group">
                <div 
                  onClick={handleImageClick}
                  className="relative cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-[1.02]"
                >
                  <img
                    src={`data:image/png;base64,${selectedImage.image}`}
                    alt={`Page ${selectedImage.pageNo}`}
                    className="w-full h-auto"
                  />
                  {/* Zoom overlay hint */}
                  <div className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    isDark ? 'bg-black/40' : 'bg-black/30'
                  }`}>
                    <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                      isDark ? 'bg-gray-900/90' : 'bg-white/90'
                    }`}>
                      <Maximize2 className={`w-5 h-5 ${isDark ? 'text-red-400' : 'text-red-500'}`} />
                      <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                        Click to enlarge
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Image Modal */}
      {imageModalOpen && selectedImage && selectedImage.type === 'image' && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setImageModalOpen(false)}
        >
          <div 
            className="relative max-w-7xl max-h-[90vh] w-full animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setImageModalOpen(false)}
              className="absolute right-0 p-2 text-white transition-colors rounded-lg -top-12 bg-white/10 hover:bg-white/20"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Image info */}
            <div className="absolute left-0 flex items-center space-x-2 text-white -top-12">
              <Image className="w-5 h-5 text-red-400" />
              <span className="text-sm font-medium">{selectedImage.source}</span>
              <span className="text-sm text-gray-300">• Page {selectedImage.pageNo}</span>
            </div>

            {/* Image container */}
            <div className="relative overflow-hidden bg-white rounded-lg shadow-2xl">
              <img
                src={`data:image/png;base64,${selectedImage.image}`}
                alt={`Page ${selectedImage.pageNo}`}
                className="w-full h-auto max-h-[85vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Sidebar;