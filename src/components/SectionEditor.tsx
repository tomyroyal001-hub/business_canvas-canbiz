import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { CanvasSection, TemplateTheme } from '../types/canvas';
import { EditableSection } from './EditableSection';

interface SectionEditorProps {
  sections: CanvasSection[];
  onUpdateSection: (sectionId: string, updates: Partial<CanvasSection>) => void;
  onDeleteSection: (sectionId: string) => void;
  theme: TemplateTheme;
}

export const SectionEditor: React.FC<SectionEditorProps> = ({
  sections,
  onUpdateSection,
  onDeleteSection,
  theme
}) => {
  return (
    <div className="space-y-4 editor-panel">
      {/* Existing Sections */}
      <div className="space-y-4 section-content-area">
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-gray-200 rounded-xl overflow-hidden"
          >
            <EditableSection
              section={section}
              isEditMode={true}
              onUpdate={onUpdateSection}
              onDelete={onDeleteSection}
              isInEditor={true}
              theme={theme}
            />
          </motion.div>
        ))}
      </div>

      {/* Add Section Button */}
      {/* <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: sections.length * 0.1 + 0.2 }}
        onClick={onAddSection}
        className="w-full mt-3 p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all group"
      >
        <div className="flex flex-col items-center space-y-3">
          <div className="p-3 bg-gray-100 group-hover:bg-blue-100 rounded-full transition-colors">
            <Plus size={24} className="text-gray-600 group-hover:text-blue-600" />
          </div>
          <div className="text-center">
            <h3 className={`font-semibold text-gray-900 group-hover:text-blue-600 transition-colors ${theme.fonts.heading}`}>
              Add New Section
            </h3>
            <p className={`text-sm text-gray-500 mt-1 ${theme.fonts.body}`}>
              Click to add a new section to your canvas
            </p>
          </div>
        </div>
      </motion.button> */}
    </div>
  );
};