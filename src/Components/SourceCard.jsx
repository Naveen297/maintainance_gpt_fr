// ChatbotScreen/SourceCard.js
import React from 'react';
import { FileText, ExternalLink } from 'lucide-react';

const SourceCard = ({ source, pageNo, score, text, onClick, isDark }) => {
  // Handle cases where source might have text field (from Excel files) or pageNo (from PDFs)
  const displayTitle = text || source;
  const displaySubtext = pageNo ? `Page ${pageNo}` : 'Excel Document';
  const canPreview = !!pageNo; // Only PDF sources with pageNo can be previewed
  
  return (
    <div 
      onClick={() => canPreview && onClick(source, pageNo)}
      className={`group p-3 rounded-lg border transition-all duration-200 ${
        canPreview 
          ? `cursor-pointer hover:scale-[1.02] ${
              isDark 
                ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 hover:border-red-500/30' 
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-red-400/30'
            }`
          : `cursor-default ${
              isDark 
                ? 'bg-gray-800/30 border-gray-700' 
                : 'bg-gray-50 border-gray-200'
            }`
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start flex-1 min-w-0 space-x-2">
          <FileText className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
            isDark ? 'text-red-400' : 'text-red-500'
          }`} />
          <div className="flex-1 min-w-0">
            {/* Show text content for Excel files, source path for PDFs */}
            <p className={`text-sm font-medium ${
              isDark ? 'text-gray-200' : 'text-gray-800'
            }`} title={displayTitle}>
              {text ? (
                <span className="block">
                  {text.length > 80 ? `${text.substring(0, 80)}...` : text}
                </span>
              ) : (
                <span className="block truncate">
                  {source}
                </span>
              )}
            </p>
            <p className={`text-xs ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {displaySubtext} • Score: {(score * 100).toFixed(1)}%
            </p>
          </div>
        </div>
        {canPreview && (
          <ExternalLink className={`w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`} />
        )}
        {!canPreview && (
          <span className={`text-xs px-2 py-1 rounded ${
            isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'
          }`}>
            Text Only
          </span>
        )}
      </div>
    </div>
  );
};

export default SourceCard;