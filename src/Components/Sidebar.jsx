// ChatbotScreen/Sidebar.js
import React from 'react';
import { X, Loader, FileText, Image } from 'lucide-react';

const Sidebar = ({ sidebarOpen, setSidebarOpen, selectedImage, loadingImage, isDark }) => {
  return (
    <div className={`fixed inset-y-0 right-0 w-96 z-50 transform transition-transform duration-300 ease-in-out ${
      sidebarOpen ? 'translate-x-0' : 'translate-x-full'
    } ${isDark ? 'bg-gray-900' : 'bg-white'} border-l ${
      isDark ? 'border-gray-700' : 'border-gray-200'
    }`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Document Viewer
        </h3>
        <button
          onClick={() => setSidebarOpen(false)}
          className={`p-2 rounded-lg hover:bg-gray-700 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      {selectedImage && (
        <div className="p-4">
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
            // Display image for PDF files
            <div className="relative">
              <img
                src={`data:image/png;base64,${selectedImage.image}`}
                alt={`Page ${selectedImage.pageNo}`}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;

// // ChatbotScreen/Sidebar.js
// import React from 'react';
// import { X, Loader } from 'lucide-react';

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
//             <h4 className={`font-medium text-sm ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
//               {selectedImage.source}
//             </h4>
//             <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
//               Page {selectedImage.pageNo}
//             </p>
//           </div>
          
//           {loadingImage ? (
//             <div className="flex items-center justify-center h-96">
//               <Loader className={`w-8 h-8 animate-spin ${isDark ? 'text-red-400' : 'text-red-500'}`} />
//             </div>
//           ) : (
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