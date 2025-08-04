import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Type, Plus, Minus, Save } from 'lucide-react';
import { TemplateTheme } from '../types/canvas';

interface CanvasTitleEditorProps {
  title: string;
  subheadings: string[];
  onTitleChange: (title: string) => void;
  onSubheadingsChange: (subheadings: string[]) => void;
  theme: TemplateTheme;
}

export const CanvasTitleEditor: React.FC<CanvasTitleEditorProps> = ({
  title,
  subheadings,
  onTitleChange,
  onSubheadingsChange,
  theme
}) => {
  const [editTitle, setEditTitle] = useState(title);
  const [editSubheadings, setEditSubheadings] = useState(subheadings);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onTitleChange(editTitle);
    onSubheadingsChange(editSubheadings.filter(sub => sub.trim() !== ''));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(title);
    setEditSubheadings(subheadings);
    setIsEditing(false);
  };

  const addSubheading = () => {
    if (editSubheadings.length < 1) {
      setEditSubheadings([...editSubheadings, '']);
    }
  };

  const removeSubheading = (index: number) => {
    setEditSubheadings(editSubheadings.filter((_, i) => i !== index));
  };

  const updateSubheading = (index: number, value: string) => {
    const newSubheadings = [...editSubheadings];
    newSubheadings[index] = value;
    setEditSubheadings(newSubheadings);
  };

  if (isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-50 rounded-xl p-4 space-y-4 border border-blue-200"
      >
        <div className="flex items-center justify-between">
          <h3 className={`font-semibold text-blue-900 flex items-center ${theme.fonts.heading}`}>
            <Type size={18} className="mr-2" />
            Edit Canvas Title
          </h3>
          <button
            onClick={handleSave}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            title="Save changes"
          >
            <Save size={16} />
          </button>
        </div>

        {/* Title Input */}
        <div>
          <label className={`block text-sm font-medium text-blue-800 mb-2 ${theme.fonts.body}`}>Canvas Title:</label>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className={`w-full p-2 border border-gray-300 rounded-lg font-semibold bg-white text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme.fonts.title}`}
            placeholder="Enter canvas title"
          />
        </div>

        {/* Subheadings */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className={`block text-sm font-medium text-blue-800 ${theme.fonts.body}`}>Subheadings:</label>
            {editSubheadings.length < 1 && (
              <button
                onClick={addSubheading}
                className="flex items-center space-x-1 text-blue-600 hover:bg-blue-100 px-2 py-1 rounded-md transition-colors text-sm"
              >
                <Plus size={14} />
                <span>Add</span>
              </button>
            )}
          </div>
          
          <div className="space-y-2">
            {editSubheadings.map((subheading, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={subheading}
                  onChange={(e) => updateSubheading(index, e.target.value)}
                  className={`flex-1 p-1 border border-blue-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${theme.fonts.heading}`}
                  placeholder={`Subheading ${index + 1}`}
                />
                <button
                  onClick={() => removeSubheading(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove subheading"
                >
                  <Minus size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2 border-t border-blue-200">
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
          >
            Save Changes
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-medium text-sm"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-blue-300 transition-colors cursor-pointer"
      onClick={() => setIsEditing(true)}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className={`font-semibold text-gray-900 flex items-center ${theme.fonts.heading}`}>
          <Type size={18} className="mr-2 text-blue-600" />
          Canvas Title
        </h3>
        <div className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
          Click to edit
        </div>
      </div>
      
      <div className="space-y-2">
        <div className={`text-lg font-bold text-gray-900 ${theme.fonts.title}`}>
          {title}
        </div>
        {subheadings.length > 0 && (
          <div className="space-y-1">
            {subheadings.map((subheading, index) => (
              <div key={index} className={`text-sm font-medium text-gray-600 ${theme.fonts.heading}`}>
                {subheading}
              </div>
            ))}
          </div>
        )}
        {subheadings.length === 0 && (
          <div className={`text-sm text-gray-400 italic ${theme.fonts.body}`}>
            No subheadings added
          </div>
        )}
      </div>
    </motion.div>
  );
};