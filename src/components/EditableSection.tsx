import React, { useState, useCallback, memo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Plus, Minus, Type, List, Save, X } from 'lucide-react';
import { CanvasSection, TemplateTheme } from '../types/canvas';

interface EditableSectionProps {
  section: CanvasSection;
  isEditMode: boolean;
  onUpdate: (sectionId: string, updates: Partial<CanvasSection>) => void;
  onDelete: (sectionId: string) => void;
  isInEditor?: boolean;
  theme: TemplateTheme;
}

const EditableSection: React.FC<EditableSectionProps> = memo(({
  section,
  isEditMode,
  onUpdate,
  onDelete,
  isInEditor = false,
  theme
}) => {
  const [isEditing, setIsEditing] = useState(isInEditor);
  const [editTitle, setEditTitle] = useState(section.title);
  const [editContent, setEditContent] = useState(
    Array.isArray(section.content) ? section.content : [section.content]
  );
  const [contentType, setContentType] = useState<'paragraph' | 'bullets'>(section.contentType);

  // Update local state when section changes (but not when editing)
  useEffect(() => {
    if (!isEditing || isInEditor) {
      setEditTitle(section.title);
      setEditContent(Array.isArray(section.content) ? section.content : [section.content]);
      setContentType(section.contentType);
    }
  }, [section, isEditing, isInEditor]);

  const startEditing = useCallback(() => {
    console.log('🔧 Starting edit for section:', section.id);
    setIsEditing(true);
  }, [section.id]);

  const deleteSection = useCallback(() => {
    console.log('🗑️ Delete clicked for section:', section.id);
    
    if (window.confirm(`Are you sure you want to delete "${section.title}"?`)) {
      console.log('✅ Confirmed delete, calling onDelete for:', section.id);
      onDelete(section.id);
    }
  }, [onDelete, section.id, section.title]);

  const handleSave = useCallback(() => {
    console.log('💾 Saving changes for section:', section.id);
    const filteredContent = editContent.filter(item => item.trim() !== '');
    const finalContent = contentType === 'paragraph' 
      ? filteredContent.join(' ') 
      : filteredContent.length > 0 ? filteredContent : ['Add content here...'];
    
    onUpdate(section.id, {
      title: editTitle.trim() || 'Untitled Section',
      content: finalContent,
      contentType
    });
    
    if (!isInEditor) {
      setIsEditing(false);
    }
  }, [section.id, editTitle, editContent, contentType, onUpdate, isInEditor]);

  const handleCancel = useCallback(() => {
    console.log('❌ Canceling edit for section:', section.id);
    setEditTitle(section.title);
    setEditContent(Array.isArray(section.content) ? section.content : [section.content]);
    setContentType(section.contentType);
    if (!isInEditor) {
      setIsEditing(false);
    }
  }, [section.title, section.content, section.contentType, isInEditor]);

  const addContentItem = useCallback(() => {
    console.log('➕ Adding content item');
    setEditContent(prev => [...prev, '']);
  }, []);

  const removeContentItem = useCallback((index: number) => {
    if (editContent.length > 1) {
      console.log('➖ Removing content item at index:', index);
      setEditContent(prev => prev.filter((_, i) => i !== index));
    }
  }, [editContent.length]);

  const updateContentItem = useCallback((index: number, value: string) => {
    setEditContent(prev => {
      const newContent = [...prev];
      newContent[index] = value;
      return newContent;
    });
  }, []);

  const handleColorChange = useCallback((color: string) => {
    console.log('🎨 Changing color to:', color);
    onUpdate(section.id, { color });
  }, [section.id, onUpdate]);

  const toggleContentType = useCallback((newType: 'paragraph' | 'bullets') => {
    console.log('🔄 Toggling content type to:', newType);
    setContentType(newType);
    
    if (newType === 'paragraph' && editContent.length > 1) {
      setEditContent([editContent.join(' ')]);
    } else if (newType === 'bullets' && editContent.length === 1) {
      const sentences = editContent[0].split(/[.!?]+/).filter(s => s.trim());
      setEditContent(sentences.length > 1 ? sentences.map(s => s.trim()) : editContent);
    }
  }, [editContent]);

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

  if (isInEditor || isEditing) {
    return (
      <div className={`${section.color} ${theme.sectionStyles.borderRadius} p-4 space-y-4`}>
        {/* Header with actions */}
        <div className="flex items-center justify-between">
          <h3 className={`font-semibold text-xs ${theme.fonts.heading}`}>
            {isInEditor ? 'Edit Section' : 'Editing'}
          </h3>
          <div className="flex space-x-1">
            {!isInEditor && (
              <>
                <button
                  onClick={handleSave}
                  className="p-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  title="Save changes"
                >
                  <Save size={12} />
                </button>
                <button
                  onClick={handleCancel}
                  className="p-1 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors"
                  title="Cancel"
                >
                  <X size={12} />
                </button>
              </>
            )}
            <button
              onClick={deleteSection}
              className="p-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              title="Delete section"
            >
              <Trash2 size={12} />
            </button>
          </div>
        </div>

        {/* Title input */}
        <div>
          <label className={`block text-xs font-medium mb-1 ${theme.colors.text} ${theme.fonts.body}`}>Section Title:</label>
          <input
            type="text" disabled
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className={`w-full p-2 border border-gray-300 rounded-lg font-semibold bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme.fonts.heading}`}
            placeholder="Section title"
          />
        </div>
        
        {/* Content type toggle */}
        {/* <div className="flex items-center space-x-2 p-1.5 bg-gray-50 rounded-lg">
          <span className={`text-sm font-medium ${theme.colors.text} ${theme.fonts.body}`}>Content Type:</span>
          <button
            onClick={() => toggleContentType('paragraph')}
            className={`flex items-center space-x-1 px-3 py-1 rounded-md transition-colors ${
              contentType === 'paragraph' 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            <Type size={14} />
            <span>Paragraph</span>
          </button>
          <button
            onClick={() => toggleContentType('bullets')}
            className={`flex items-center space-x-1 px-3 py-1 rounded-md transition-colors ${
              contentType === 'bullets' 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            <List size={14} />
            <span>Bullets</span>
          </button>
        </div> */}
        
        {/* Content editing */}
        {/* <div className="space-y-2">
          <label className={`block text-sm font-medium ${theme.colors.text} ${theme.fonts.body}`}>Content:</label>
          {contentType === 'paragraph' ? (
            <textarea
              value={editContent[0] || ''}
              onChange={(e) => setEditContent([e.target.value])}
              className={`w-full p-3 border border-gray-300 rounded-lg resize-none bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme.fonts.body}`}
              rows={4}
              placeholder="Enter your paragraph content here..."
            />
          ) : (
            <div className="max-h-25 section-content-area space-y-2">
              {editContent.map((item, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="text-blue-400 mt-2 flex-shrink-0">•</span>
                  <textarea
                    value={item}
                    onChange={(e) => updateContentItem(index, e.target.value)}
                    className={`flex-1 p-2 border border-gray-300 rounded-lg resize-none bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme.fonts.body}`}
                    rows={1}
                    placeholder="Bullet point content"
                  />
                  {editContent.length > 1 && (
                    <button
                      onClick={() => removeContentItem(index)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-1 flex-shrink-0"
                      title="Remove item"
                    >
                      <Minus size={14} />
                    </button>
                  )}
                </div>
              ))}
              
              <button
                onClick={addContentItem}
                className="flex items-center space-x-1 text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors w-full justify-center border border-dashed border-blue-300 text-sm"
              >
                <Plus size={14} />
                <span>Add bullet point</span>
              </button>
            </div>
          )}
        </div> */}

        {/* Color selection */}
        <div className="space-y-2">
          <label className={`block text-sm font-medium ${theme.colors.text} ${theme.fonts.body}`}>Background Color:</label>
          <div className="grid grid-cols-5 gap-2">
            {theme.sectionColors.map((color, index) => (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                className={`p-2 rounded-lg border-2 transition-all ${color} ${
                  section.color === color 
                    ? 'border-blue-500 ring-2 ring-blue-200' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                title={`Color ${index + 1}`}
              >
                <div className="w-full h-3 rounded"></div>
              </button>
            ))}
          </div>
        </div>

        {/* Save button for editor mode */}
        {isInEditor && (
          <button
            onClick={handleSave}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Save Changes
          </button>
        )}
      </div>
    );
  }

  return (
    <motion.div
      layout
      className={`${section.color} ${theme.sectionStyles.borderRadius} p-4 relative group ${theme.sectionStyles.shadow} ${theme.sectionStyles.borderWidth} ${theme.sectionStyles.borderStyle} transition-all h-full w-full flex flex-col`}
      initial={false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Edit button for non-editor mode */}
      {isEditMode && !isInEditor && (
        <div className="absolute top-3 right-3 flex space-x-2 z-50">
          <button
            onClick={startEditing}
            className="p-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105"
            title="Edit content"
          >
            <Edit2 size={16} />
          </button>
        </div>
      )}

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
});

EditableSection.displayName = 'EditableSection';

export { EditableSection };