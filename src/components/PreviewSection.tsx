import React from 'react';
import { motion } from 'framer-motion';
import { Move } from 'lucide-react';
import { CanvasSection, TemplateTheme } from '../types/canvas';

interface PreviewSectionProps {
  section: CanvasSection;
  theme: TemplateTheme;
}

export const PreviewSection: React.FC<PreviewSectionProps> = ({ section, theme }) => {
  const renderContent = () => {
    if (section.contentType === 'paragraph') {
      return (
        <div className={`text-sm leading-relaxed break-words ${section.textColor || theme.colors.text} ${theme.fonts.body}`}>
          <div className={`text-sm leading-relaxed break-words ${theme.colors.sectionText} ${theme.fonts.body}`}>
            {typeof section.content === 'string' ? section.content : section.content.join(' ')}
          </div>
        </div>
      );
    } else {
      const contentArray = Array.isArray(section.content) ? section.content : [section.content];
      return (
        <div className="space-y-1.0">
          {contentArray.map((item, index) => (
            <div key={index} className={`text-sm leading-relaxed break-words flex items-start ${theme.fonts.body}`}>
              <span className={`mr-2 flex-shrink-0 ${theme.colors.primary}`}>•</span>
              <span className={theme.colors.sectionText}>{item}</span>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <motion.div
      layout
      className={`${section.color} ${theme.sectionStyles.borderRadius} p-4 relative group ${theme.sectionStyles.shadow} ${theme.sectionStyles.borderWidth} ${theme.sectionStyles.borderStyle} transition-all h-full w-full flex flex-col cursor-move`}
      initial={false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Drag handle indicator */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="p-2 bg-gray-600 text-white rounded-lg shadow-lg">
          <Move size={14} />
        </div>
      </div>

      <div className="h-full flex flex-col min-h-0">
        <h3 className={`text-lg font-bold mb-2 leading-tight flex-shrink-0 ${section.titleColor || theme.colors.titleText} ${theme.fonts.heading}`}>
          <h3 className={`text-lg font-bold mb-2 leading-tight flex-shrink-0 ${theme.colors.sectionTitle} ${theme.fonts.heading}`}>
            {section.title}
          </h3>
        </h3>
        <div className="flex-1 min-h-0 section-content-area">
          {renderContent()}
        </div>
      </div>
    </motion.div>
  );
};