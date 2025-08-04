import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { CanvasTemplate } from '../types/canvas';

interface TemplateSelectorProps {
  templates: CanvasTemplate[];
  onSelectTemplate: (template: CanvasTemplate) => void;
}

interface LayoutGroup {
  layoutName: string;
  description: string;
  templates: CanvasTemplate[];
  currentThemeIndex: number;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  templates,
  onSelectTemplate
}) => {
  // Group templates by layout
  const layoutGroups: LayoutGroup[] = [
    {
      layoutName: 'Classic Business Canvas',
      description: 'Traditional 9-block business model structure',
      templates: templates.filter(t => t.id.includes('classic-business')),
      currentThemeIndex: 0
    },
    {
      layoutName: 'Corporate Executive',
      description: 'Professional layout for executive presentations',
      templates: templates.filter(t => t.id.includes('corporate-executive')),
      currentThemeIndex: 0
    },
    {
      layoutName: 'Creative Agency',
      description: 'Dynamic asymmetric layout for creative industries',
      templates: templates.filter(t => t.id.includes('creative-agency')),
      currentThemeIndex: 0
    },
    {
      layoutName: 'Minimal Grid',
      description: 'Clean, structured grid approach',
      templates: templates.filter(t => t.id.includes('minimal-grid')),
      currentThemeIndex: 0
    },
    {
      layoutName: 'Tech Innovation',
      description: 'Futuristic modular layout for tech companies',
      templates: templates.filter(t => t.id.includes('tech-innovation')),
      currentThemeIndex: 0
    },
    {
      layoutName: 'Startup Lean Canvas',
      description: 'Problem-solution focused lean methodology',
      templates: templates.filter(t => t.id.includes('startup-lean')),
      currentThemeIndex: 0
    },
    {
      layoutName: 'Nature Strategy Canvas',
      description: 'A canvas for earth-inspired business strategy',
      templates: templates.filter(t => t.id.includes('nature-strategy')),
      currentThemeIndex: 0
    }
  ];

  const [groups, setGroups] = useState<LayoutGroup[]>(layoutGroups);

  const handleThemeChange = (groupIndex: number, direction: 'prev' | 'next') => {
    setGroups(prevGroups => {
      const newGroups = [...prevGroups];
      const group = newGroups[groupIndex];
      
      if (direction === 'next') {
        group.currentThemeIndex = (group.currentThemeIndex + 1) % group.templates.length;
      } else {
        group.currentThemeIndex = group.currentThemeIndex === 0 
          ? group.templates.length - 1 
          : group.currentThemeIndex - 1;
      }
      
      return newGroups;
    });
  };

  const getThemeColorFromTemplate = (template: CanvasTemplate): string => {
    const themeColors: Record<string, string> = {
      'blue': 'from-blue-500 to-blue-600',
      'green': 'from-green-500 to-green-600',
      'purple': 'from-purple-500 to-purple-600',
      'gray': 'from-gray-500 to-gray-600',
      'navy': 'from-slate-600 to-blue-700',
      'warm': 'from-orange-500 to-red-500',
      'cool': 'from-teal-500 to-cyan-500',
      'vibrant': 'from-pink-500 to-purple-500',
      'white': 'from-gray-300 to-gray-400',
      'beige': 'from-amber-400 to-orange-400',
      'dark': 'from-gray-800 to-black',
      'neon': 'from-green-400 to-lime-400',
      'bright': 'from-blue-400 to-green-400',
      'energetic': 'from-red-400 to-orange-400',
      'fresh': 'from-green-400 to-teal-400'
    };

    for (const [key, gradient] of Object.entries(themeColors)) {
      if (template.id.includes(key)) {
        return gradient;
      }
    }
    return 'from-blue-500 to-purple-600'; // default
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Flexible Business Canvas
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {' '}Creator
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose from 6 unique layouts, each with 3 beautiful color themes. 
            Navigate between themes using the arrow buttons to find your perfect style.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {groups.map((group, groupIndex) => {
            const currentTemplate = group.templates[group.currentThemeIndex];
            if (!currentTemplate) return null;

            return (
              <motion.div
                key={group.layoutName}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
                className="group cursor-pointer"
                onClick={() => onSelectTemplate(currentTemplate)}
              >
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="p-8">
                    {/* Header with navigation */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${getThemeColorFromTemplate(currentTemplate)} text-white`}>
                          <FileText size={32} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {group.layoutName}
                          </h3>
                          <p className="text-gray-600 mt-1">
                            {group.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        {/* Theme Navigation */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleThemeChange(groupIndex, 'prev');
                            }}
                            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                            disabled={group.templates.length <= 1}
                          >
                            <ChevronLeft size={20} className="text-gray-600" />
                          </button>
                          
                          <div className="flex space-x-1">
                            {group.templates.map((_, themeIndex) => (
                              <div
                                key={themeIndex}
                                className={`w-2 h-2 rounded-full transition-all ${
                                  themeIndex === group.currentThemeIndex
                                    ? 'bg-blue-600 w-6'
                                    : 'bg-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleThemeChange(groupIndex, 'next');
                            }}
                            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                            disabled={group.templates.length <= 1}
                          >
                            <ChevronRight size={20} className="text-gray-600" />
                          </button>
                        </div>

                        <ArrowRight 
                          size={24} 
                          className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300"
                        />
                      </div>
                    </div>

                    {/* Current Theme Info */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${group.layoutName}-${group.currentThemeIndex}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-800">
                              {currentTemplate.theme.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              Current theme • {group.currentThemeIndex + 1} of {group.templates.length}
                            </p>
                          </div>
                          
                          <div className={`h-8 w-24 rounded-lg bg-gradient-to-r ${getThemeColorFromTemplate(currentTemplate)} shadow-md`}></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500">Sections:</span>
                            <span className="font-medium">{currentTemplate.sections.length}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500">Grid:</span>
                            <span className="font-medium">{currentTemplate.gridCols}×{currentTemplate.gridRows}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                            ✓ Paragraph Content
                          </span>
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                            ✓ Bullet Points
                          </span>
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                            ✓ JSON Import
                          </span>
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                            ✓ Fully Editable
                          </span>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  
                  <div className={`h-2 bg-gradient-to-r ${getThemeColorFromTemplate(currentTemplate)} group-hover:opacity-80 transition-all duration-300`}></div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-2 text-gray-500">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-gray-300"></div>
            <span className="text-sm font-medium">Click any layout to start creating • Use arrows to browse themes</span>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-gray-300"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};