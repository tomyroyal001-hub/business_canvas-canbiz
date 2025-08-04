import { CanvasTemplate } from '../types/canvas';
import { themes } from './themes';

// Helper function to create canvas from JSON data


// // Function to create canvas from JSON data while preserving original template structure
// export const createCanvasFromJSON = (jsonData: any, originalTemplate?: CanvasTemplate): CanvasTemplate => {
//   const sections: any[] = [];
//   const jsonEntries = Object.entries(jsonData);
  
//   // Calculate grid dimensions based on number of sections
//   const numSections = jsonEntries.length;
//   const gridCols = Math.min(6, Math.ceil(Math.sqrt(numSections * 1.5)));
//   const gridRows = Math.ceil(numSections / gridCols) + 2; // Extra rows for additional sections
  
//   // If we have an original template, use its structure for the first sections
//   if (originalTemplate && originalTemplate.sections.length > 0) {
//     const originalSections = originalTemplate.sections;
//     const theme = originalTemplate.theme;
    
//     // Map JSON data to original template sections (up to the number of original sections)
//     jsonEntries.slice(0, originalSections.length).forEach(([key, value], index) => {
//       const originalSection = originalSections[index];
      
//       // Determine content type and format
//       let content: string | string[];
//       let contentType: 'paragraph' | 'bullets';
      
//       if (Array.isArray(value)) {
//         content = value.map(String);
//         contentType = 'bullets';
//       } else if (typeof value === 'string' && value.includes('\n')) {
//         content = value.split('\n').filter(line => line.trim());
//         contentType = 'bullets';
//       } else {
//         content = String(value);
//         contentType = 'paragraph';
//       }
      
//       // Preserve original section structure but update content
//       sections.push({
//         ...originalSection,
//         id: `section-${index + 1}`,
//         title: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
//         content,
//         contentType
//       });
//     });
    
//     // Add remaining JSON data as new sections below the original template
//     if (jsonEntries.length > originalSections.length) {
//       const remainingEntries = jsonEntries.slice(originalSections.length);
//       const maxY = Math.max(...originalSections.map(s => s.y + s.height), 0);
      
//       remainingEntries.forEach(([key, value], index) => {
//         const actualIndex = originalSections.length + index;
//         const x = (index % gridCols) * Math.floor(6 / gridCols);
//         const y = maxY + Math.floor(index / gridCols) * 2;
//         const width = Math.floor(6 / gridCols);
//         const height = 2;
        
//         // Determine content type and format
//         let content: string | string[];
//         let contentType: 'paragraph' | 'bullets';
        
//         if (Array.isArray(value)) {
//           content = value.map(String);
//           contentType = 'bullets';
//         } else if (typeof value === 'string' && value.includes('\n')) {
//           content = value.split('\n').filter(line => line.trim());
//           contentType = 'bullets';
//         } else {
//           content = String(value);
//           contentType = 'paragraph';
//         }
        
//         const colorIndex = actualIndex % theme.sectionColors.length;
        
//         sections.push({
//           id: `section-${actualIndex + 1}`,
//           title: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
//           content,
//           contentType,
//           x,
//           y,
//           width,
//           height,
//           color: theme.sectionColors[colorIndex]
//         });
//       });
//     }
//   } else {
//     // Fallback to original behavior if no template provided
//     const defaultTheme = themes.classicGlassmorphism;
    
//     jsonEntries.forEach(([key, value], index) => {
//       const x = (index % gridCols) * Math.floor(6 / gridCols);
//       const y = Math.floor(index / gridCols) * 2;
//       const width = Math.floor(6 / gridCols);
//       const height = 2;
      
//       // Determine content type and format
//       let content: string | string[];
//       let contentType: 'paragraph' | 'bullets';
      
//       if (Array.isArray(value)) {
//         content = value.map(String);
//         contentType = 'bullets';
//       } else if (typeof value === 'string' && value.includes('\n')) {
//         content = value.split('\n').filter(line => line.trim());
//         contentType = 'bullets';
//       } else {
//         content = String(value);
//         contentType = 'paragraph';
//       }
      
//       const colorIndex = index % defaultTheme.sectionColors.length;
      
//       sections.push({
//         id: `section-${index + 1}`,
//         title: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
//         content,
//         contentType,
//         x,
//         y,
//         width,
//         height,
//         color: defaultTheme.sectionColors[colorIndex]
//       });
//     });
//   }
  
//   return {
//     id: 'custom',
//     name: 'Custom Business Canvas',
//     description: `Generated from JSON data with ${numSections} sections`,
//     gridCols: originalTemplate?.gridCols || gridCols,
//     gridRows: Math.max(originalTemplate?.gridRows || gridRows, gridRows),
//     canvasTitle: originalTemplate?.canvasTitle || 'Custom Business Canvas',
//     canvasSubheadings: originalTemplate?.canvasSubheadings || [],
//     theme: originalTemplate?.theme || themes.classicGlassmorphism,
//     sections
//   };
// };


export const createCanvasFromJSON = (jsonData: any, originalTemplate?: CanvasTemplate): CanvasTemplate => {
  const sections: any[] = [];
  
  // Debug logging
  console.log('Input JSON Data:', jsonData);
  console.log('Original Template Title:', originalTemplate?.canvasTitle);
  console.log('Original Template Subtitles:', originalTemplate?.canvasSubheadings);
  
  // Extract title, subtitle, and section data from JSON
  const extractedTitle = jsonData.title || jsonData.Title || null;
  const extractedSubtitle = jsonData.subtitle || jsonData.Subtitle || jsonData['Sub title'] || jsonData['sub title'] || null;
  
  console.log('Extracted Title:', extractedTitle);
  console.log('Extracted Subtitle:', extractedSubtitle);
  
  const title = extractedTitle || originalTemplate?.canvasTitle || 'Custom Business Canvas';
  const subtitle = extractedSubtitle;

  // Get section data - could be in sectionData key or the entire object minus title/subtitle
  let sectionData: any;
  if (jsonData.sectionData || jsonData.SectionData || jsonData.sections) {
    sectionData = jsonData.sectionData || jsonData.SectionData || jsonData.sections;
  } else {
    // Create section data by excluding title/subtitle keys
    sectionData = { ...jsonData };
    delete sectionData.title;
    delete sectionData.Title;
    delete sectionData.subtitle;
    delete sectionData.Subtitle;
    delete sectionData['Sub title'];
    delete sectionData['sub title'];
    delete sectionData.sectionData;
    delete sectionData.SectionData;
    delete sectionData.sections;
  }
  
  const jsonEntries = Object.entries(sectionData);
  
  // Calculate grid dimensions based on number of sections
  const numSections = jsonEntries.length;
  const gridCols = Math.min(6, Math.ceil(Math.sqrt(numSections * 1.5)));
  const gridRows = Math.ceil(numSections / gridCols) + 2; // Extra rows for additional sections
  
  // Prepare canvas subheadings
  let canvasSubheadings: string[] = [];
  if (subtitle) {
    if (Array.isArray(subtitle)) {
      canvasSubheadings = subtitle.map(String);
    } else if (typeof subtitle === 'string') {
      // If subtitle contains line breaks or commas, split it
      if (subtitle.includes('\n')) {
        canvasSubheadings = subtitle.split('\n').filter(line => line.trim());
      } else if (subtitle.includes(',')) {
        canvasSubheadings = subtitle.split(',').map(s => s.trim()).filter(s => s);
      } else {
        canvasSubheadings = [subtitle];
      }
    }
  } else {
    canvasSubheadings = originalTemplate?.canvasSubheadings || [];
  }
  
  console.log('Final Title:', title);
  console.log('Final Subtitles:', canvasSubheadings);
  
  // If we have an original template, use its structure for the first sections
  if (originalTemplate && originalTemplate.sections.length > 0) {
    const originalSections = originalTemplate.sections;
    const theme = originalTemplate.theme;
    
    // Map JSON data to original template sections (up to the number of original sections)
    jsonEntries.slice(0, originalSections.length).forEach(([key, value], index) => {
      const originalSection = originalSections[index];
      
      // Determine content type and format
      let content: string | string[];
      let contentType: 'paragraph' | 'bullets';
      
      if (Array.isArray(value)) {
        content = value.map(String);
        contentType = 'bullets';
      } else if (typeof value === 'string' && value.includes('\n')) {
        content = value.split('\n').filter(line => line.trim());
        contentType = 'bullets';
      } else {
        content = String(value);
        contentType = 'paragraph';
      }
      
      // Preserve original section structure but update content
      sections.push({
        ...originalSection,
        id: `section-${index + 1}`,
        title: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
        content,
        contentType
      });
    });
    
    // Add remaining JSON data as new sections below the original template
    if (jsonEntries.length > originalSections.length) {
      const remainingEntries = jsonEntries.slice(originalSections.length);
      const maxY = Math.max(...originalSections.map(s => s.y + s.height), 0);
      
      remainingEntries.forEach(([key, value], index) => {
        const actualIndex = originalSections.length + index;
        const x = (index % gridCols) * Math.floor(6 / gridCols);
        const y = maxY + Math.floor(index / gridCols) * 2;
        const width = Math.floor(6 / gridCols);
        const height = 2;
        
        // Determine content type and format
        let content: string | string[];
        let contentType: 'paragraph' | 'bullets';
        
        if (Array.isArray(value)) {
          content = value.map(String);
          contentType = 'bullets';
        } else if (typeof value === 'string' && value.includes('\n')) {
          content = value.split('\n').filter(line => line.trim());
          contentType = 'bullets';
        } else {
          content = String(value);
          contentType = 'paragraph';
        }
        
        const colorIndex = actualIndex % theme.sectionColors.length;
        
        sections.push({
          id: `section-${actualIndex + 1}`,
          title: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
          content,
          contentType,
          x,
          y,
          width,
          height,
          color: theme.sectionColors[colorIndex]
        });
      });
    }
  } else {
    // Fallback to original behavior if no template provided
    const defaultTheme = themes.classicGlassmorphism;
    
    jsonEntries.forEach(([key, value], index) => {
      const x = (index % gridCols) * Math.floor(6 / gridCols);
      const y = Math.floor(index / gridCols) * 2;
      const width = Math.floor(6 / gridCols);
      const height = 2;
      
      // Determine content type and format
      let content: string | string[];
      let contentType: 'paragraph' | 'bullets';
      
      if (Array.isArray(value)) {
        content = value.map(String);
        contentType = 'bullets';
      } else if (typeof value === 'string' && value.includes('\n')) {
        content = value.split('\n').filter(line => line.trim());
        contentType = 'bullets';
      } else {
        content = String(value);
        contentType = 'paragraph';
      }
      
      const colorIndex = index % defaultTheme.sectionColors.length;
      
      sections.push({
        id: `section-${index + 1}`,
        title: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
        content,
        contentType,
        x,
        y,
        width,
        height,
        color: defaultTheme.sectionColors[colorIndex]
      });
    });
  }
  
  return {
    id: 'custom',
    name: 'Custom Business Canvas',
    description: `Generated from JSON data with ${numSections} sections`,
    sections: sections,
    gridCols: originalTemplate?.gridCols || gridCols,
    gridRows: Math.max(originalTemplate?.gridRows || gridRows, gridRows),
    canvasTitle: title,
    canvasSubheadings: canvasSubheadings,
    theme: originalTemplate?.theme || themes.classicGlassmorphism
   
  };
};

export const canvasTemplates: CanvasTemplate[] = [
  // LAYOUT 1: CLASSIC BUSINESS CANVAS - 3 THEMES
  {
    id: 'classic-business-glassmorphism',
    name: 'Classic Business Canvas',
    description: 'Traditional 9-block business model structure with glassmorphism theme',
    canvasTitle: 'Business Model Canvas',
    canvasSubheadings: [],
    gridCols: 6,
    gridRows: 6,
    theme: themes.classicGlassmorphism,
    sections: [
      {
        id: 'key-partners',
        title: 'Key Partners',
        content: ['Strategic alliances', 'Supplier relationships', 'Joint ventures', 'Key partnerships'],
        contentType: 'bullets',
        x: 0, y: 0, width: 1, height: 2,
        color: themes.classicGlassmorphism.sectionColors[0]
      },
      {
        id: 'key-activities',
        title: 'Key Activities',
        content: ['Core business processes', 'Production activities', 'Platform management', 'Problem solving'],
        contentType: 'bullets',
        x: 1, y: 0, width: 1.5, height: 2,
        color: themes.classicGlassmorphism.sectionColors[1]
      },

      {
        id: 'value-proposition',
        title: 'Value Proposition',
        content: 'Our unique value proposition addresses customer pain points through innovative solutions that deliver measurable benefits and create lasting competitive advantages.',
        contentType: 'paragraph',
        x: 2.5, y: 0, width: 2, height: 2,
        color: themes.classicGlassmorphism.sectionColors[3]
      },
      {
        id: 'key-resources',
        title: 'Key Resources',
        content: ['Physical assets', 'Intellectual property', 'Human resources', 'Financial resources'],
        contentType: 'bullets',
        x: 4.5, y: 0, width: 1.5, height: 2,
        color: themes.classicGlassmorphism.sectionColors[2]
      },
      {
        id: 'customer-relationships',
        title: 'Customer Relationships',
        content: ['Personal assistance', 'Self-service platforms', 'Automated services', 'Community building'],
        contentType: 'bullets',
        x: 0, y: 2, width: 1.5, height: 2,
        color: themes.classicGlassmorphism.sectionColors[4]
      },
      {
        id: 'channels',
        title: 'Channels',
        content: ['Direct sales', 'Online platforms', 'Partner networks', 'Retail distribution'],
        contentType: 'bullets',
        x: 1.5, y: 2, width: 1.5, height: 2,
        color: themes.classicGlassmorphism.sectionColors[5]
      },
      {
        id: 'customer-segments',
        title: 'Customer Segments',
        content: ['Target demographics', 'Market segments', 'User personas', 'Customer archetypes'],
        contentType: 'bullets',
        x: 3, y: 2, width: 3, height: 2,
        color: themes.classicGlassmorphism.sectionColors[6]
      },
      {
        id: 'cost-structure',
        title: 'Cost Structure',
        content: ['Fixed costs include infrastructure, salaries, and operational overhead. Variable costs scale with production volume and customer acquisition activities.',
        ],
        contentType: 'paragraph',
        x: 0, y: 4, width: 3, height: 2.2,
        color: themes.classicGlassmorphism.sectionColors[7]
      },
      {
        id: 'revenue-streams',
        title: 'Revenue Streams',
        content: ['Subscription fees', 'Transaction revenue', 'Licensing income', 'Service charges'],
        contentType: 'bullets',
        x: 3, y: 4, width: 3, height: 2.2,
        color: themes.classicGlassmorphism.sectionColors[8]
      }
    ]
  },

  {
    id: 'classic-business-neon',
    name: 'Classic Business Canvas',
    description: 'Traditional 9-block business model structure with neon glow theme',
    canvasTitle: 'Business Model Canvas',
    canvasSubheadings: [],
    gridCols: 6,
    gridRows: 6,
    theme: themes.classicNeonGlow,
    sections: [
      {
        id: 'key-partners',
        title: 'Key Partners',
        content: ['Strategic alliances', 'Supplier relationships', 'Joint ventures', 'Key partnerships'],
        contentType: 'bullets',
        x: 0, y: 0, width: 1, height: 2,
        color: themes.classicNeonGlow.sectionColors[0]
      },
      {
        id: 'key-activities',
        title: 'Key Activities',
        content: ['Core business processes', 'Production activities', 'Platform management', 'Problem solving'],
        contentType: 'bullets',
        x: 1, y: 0, width: 1.5, height: 2,
        color: themes.classicNeonGlow.sectionColors[1]
      },
      {
        id: 'value-proposition',
        title: 'Value Proposition',
        content: 'Our unique value proposition addresses customer pain points through innovative solutions that deliver measurable benefits and create lasting competitive advantages.',
        contentType: 'paragraph',
        x: 2.5, y: 0, width: 2, height: 2,
        color: themes.classicNeonGlow.sectionColors[3]
      },
      {
        id: 'key-resources',
        title: 'Key Resources',
        content: ['Physical assets', 'Intellectual property', 'Human resources', 'Financial resources'],
        contentType: 'bullets',
        x: 4.5, y: 0, width: 1.5, height: 2,
        color: themes.classicNeonGlow.sectionColors[2]
      },
      {
        id: 'customer-relationships',
        title: 'Customer Relationships',
        content: ['Personal assistance', 'Self-service platforms', 'Automated services', 'Community building'],
        contentType: 'bullets',
        x: 0, y: 2, width: 1.5, height: 2,
        color: themes.classicNeonGlow.sectionColors[4]
      },
      {
        id: 'channels',
        title: 'Channels',
        content: ['Direct sales', 'Online platforms', 'Partner networks', 'Retail distribution'],
        contentType: 'bullets',
        x: 1.5, y: 2, width: 1.5, height: 2,
        color: themes.classicNeonGlow.sectionColors[5]
      },
      {
        id: 'customer-segments',
        title: 'Customer Segments',
        content: ['Target demographics', 'Market segments', 'User personas', 'Customer archetypes'],
        contentType: 'bullets',
        x: 3, y: 2, width: 3, height: 2,
        color: themes.classicNeonGlow.sectionColors[6]
      },
      {
        id: 'cost-structure',
        title: 'Cost Structure',
        content: 'Fixed costs include infrastructure, salaries, and operational overhead. Variable costs scale with production volume and customer acquisition activities.',
        contentType: 'paragraph',
        x: 0, y: 4, width: 3, height: 2.2,
        color: themes.classicNeonGlow.sectionColors[7]
      },
      {
        id: 'revenue-streams',
        title: 'Revenue Streams',
        content: ['Subscription fees', 'Transaction revenue', 'Licensing income', 'Service charges'],
        contentType: 'bullets',
        x: 3, y: 4, width: 3, height: 2.2,
        color: themes.classicNeonGlow.sectionColors[8]
      }
    ]
  },

  {
    id: 'classic-business-gradient',
    name: 'Classic Business Canvas',
    description: 'Traditional 9-block business model structure with gradient mesh theme',
    canvasTitle: 'Business Model Canvas',
    canvasSubheadings: [],
    gridCols: 6,
    gridRows: 6,
    theme: themes.classicGradientMesh,
    sections: [
      {
        id: 'key-partners',
        title: 'Key Partners',
        content: ['Strategic alliances', 'Supplier relationships', 'Joint ventures', 'Key partnerships'],
        contentType: 'bullets',
        x: 0, y: 0, width: 1, height: 2,
        color: themes.classicGradientMesh.sectionColors[0]
      },
      {
        id: 'key-activities',
        title: 'Key Activities',
        content: ['Core business processes', 'Production activities', 'Platform management', 'Problem solving'],
        contentType: 'bullets',
        x: 1, y: 0, width: 1.5, height: 2,
        color: themes.classicGradientMesh.sectionColors[1]
      },
      {
        id: 'value-proposition',
        title: 'Value Proposition',
        content: 'Our unique value proposition addresses customer pain points through innovative solutions that deliver measurable benefits and create lasting competitive advantages.',
        contentType: 'paragraph',
        x: 2.5, y: 0, width: 2, height: 2,
        color: themes.classicGradientMesh.sectionColors[3]
      },
      {
        id: 'key-resources',
        title: 'Key Resources',
        content: ['Physical assets', 'Intellectual property', 'Human resources', 'Financial resources'],
        contentType: 'bullets',
        x: 4.5, y: 0, width: 1.5, height: 2,
        color: themes.classicGradientMesh.sectionColors[2]
      },
      {
        id: 'customer-relationships',
        title: 'Customer Relationships',
        content: ['Personal assistance', 'Self-service platforms', 'Automated services', 'Community building'],
        contentType: 'bullets',
        x: 0, y: 2, width: 1.5, height: 2,
        color: themes.classicGradientMesh.sectionColors[4]
      },
      {
        id: 'channels',
        title: 'Channels',
        content: ['Direct sales', 'Online platforms', 'Partner networks', 'Retail distribution'],
        contentType: 'bullets',
        x: 1.5, y: 2, width: 1.5, height: 2,
        color: themes.classicGradientMesh.sectionColors[5]
      },
      {
        id: 'customer-segments',
        title: 'Customer Segments',
        content: ['Target demographics', 'Market segments', 'User personas', 'Customer archetypes'],
        contentType: 'bullets',
        x: 3, y: 2, width: 3, height: 2,
        color: themes.classicGradientMesh.sectionColors[6]
      },
      {
        id: 'cost-structure',
        title: 'Cost Structure',
        content: 'Fixed costs include infrastructure, salaries, and operational overhead. Variable costs scale with production volume and customer acquisition activities.',
        contentType: 'paragraph',
        x: 0, y: 4, width: 3, height: 2.2,
        color: themes.classicGradientMesh.sectionColors[7]
      },
      {
        id: 'revenue-streams',
        title: 'Revenue Streams',
        content: ['Subscription fees', 'Transaction revenue', 'Licensing income', 'Service charges'],
        contentType: 'bullets',
        x: 3, y: 4, width: 3, height: 2.2,
        color: themes.classicGradientMesh.sectionColors[8]
      }
    ]
  },

  // LAYOUT 2: CORPORATE EXECUTIVE - 3 THEMES
  {
    id: 'corporate-executive-luxury',
    name: 'Corporate Executive',
    description: 'Professional layout for executive presentations with modern luxury theme',
    canvasTitle: 'Executive Strategy Canvas',
    canvasSubheadings: [],
    gridCols: 6,
    gridRows: 6,
    theme: themes.corporateModernLux,
    sections: [
      {
        id: 'market-analysis',
        title: 'Market Analysis',
        content: 'Comprehensive market research reveals significant opportunities in emerging segments with projected growth rates exceeding industry averages by 15-20% annually.',
        contentType: 'paragraph',
        x: 0, y: 0, width: 3, height: 2,
        color: themes.corporateModernLux.sectionColors[0]
      },
      {
        id: 'competitive-advantage',
        title: 'Competitive Advantage',
        content: ['Proprietary technology', 'Market leadership position', 'Brand recognition', 'Operational excellence'],
        contentType: 'bullets',
        x: 3, y: 0, width: 3, height: 2,
        color: themes.corporateModernLux.sectionColors[1]
      },
      {
        id: 'strategic-objectives',
        title: 'Strategic Objectives',
        content: ['Revenue growth targets', 'Market expansion goals', 'Operational efficiency', 'Innovation initiatives'],
        contentType: 'bullets',
        x: 0, y: 2, width: 2, height: 2,
        color: themes.corporateModernLux.sectionColors[2]
      },
      {
        id: 'value-creation',
        title: 'Value Creation',
        content: ['Premium quality products', 'Superior customer experience', 'Innovative solutions', 'Long-term partnerships'],
        contentType: 'bullets',
        x: 2, y: 2, width: 2, height: 2,
        color: themes.corporateModernLux.sectionColors[3]
      },
      {
        id: 'resource-allocation',
        title: 'Resource Allocation',
        content: ['Technology investments', 'Human capital development', 'Market expansion funding', 'R&D initiatives'],
        contentType: 'bullets',
        x: 4, y: 2, width: 2, height: 2,
        color: themes.corporateModernLux.sectionColors[4]
      },
      {
        id: 'financial-projections',
        title: 'Financial Projections',
        content: 'Three-year financial outlook projects sustained revenue growth with improving margins through operational efficiency and premium positioning strategies.',
        contentType: 'paragraph',
        x: 0, y: 4, width: 3, height: 2,
        color: themes.corporateModernLux.sectionColors[5]
      },
      {
        id: 'risk-management',
        title: 'Risk Management',
        content: ['Market volatility mitigation', 'Regulatory compliance', 'Operational risk controls', 'Strategic contingencies'],
        contentType: 'bullets',
        x: 3, y: 4, width: 3, height: 2,
        color: themes.corporateModernLux.sectionColors[6]
      }
    ]
  },

  {
    id: 'corporate-executive-brutalism',
    name: 'Corporate Executive',
    description: 'Professional layout for executive presentations with neu-brutalism theme',
    canvasTitle: 'Executive Strategy Canvas',
    canvasSubheadings: [],
    gridCols: 6,
    gridRows: 6,
    theme: themes.corporateNeuBrutalism,
    sections: [
      {
        id: 'market-analysis',
        title: 'Market Analysis',
        content: 'Comprehensive market research reveals significant opportunities in emerging segments with projected growth rates exceeding industry averages by 15-20% annually.',
        contentType: 'paragraph',
        x: 0, y: 0, width: 3, height: 2,
        color: themes.corporateNeuBrutalism.sectionColors[0]
      },
      {
        id: 'competitive-advantage',
        title: 'Competitive Advantage',
        content: ['Proprietary technology', 'Market leadership position', 'Brand recognition', 'Operational excellence'],
        contentType: 'bullets',
        x: 3, y: 0, width: 3, height: 2,
        color: themes.corporateNeuBrutalism.sectionColors[1]
      },
      {
        id: 'strategic-objectives',
        title: 'Strategic Objectives',
        content: ['Revenue growth targets', 'Market expansion goals', 'Operational efficiency', 'Innovation initiatives'],
        contentType: 'bullets',
        x: 0, y: 2, width: 2, height: 2,
        color: themes.corporateNeuBrutalism.sectionColors[2]
      },
      {
        id: 'value-creation',
        title: 'Value Creation',
        content: ['Premium quality products', 'Superior customer experience', 'Innovative solutions', 'Long-term partnerships'],
        contentType: 'bullets',
        x: 2, y: 2, width: 2, height: 2,
        color: themes.corporateNeuBrutalism.sectionColors[3]
      },
      {
        id: 'resource-allocation',
        title: 'Resource Allocation',
        content: ['Technology investments', 'Human capital development', 'Market expansion funding', 'R&D initiatives'],
        contentType: 'bullets',
        x: 4, y: 2, width: 2, height: 2,
        color: themes.corporateNeuBrutalism.sectionColors[4]
      },
      {
        id: 'financial-projections',
        title: 'Financial Projections',
        content: 'Three-year financial outlook projects sustained revenue growth with improving margins through operational efficiency and premium positioning strategies.',
        contentType: 'paragraph',
        x: 0, y: 4, width: 3, height: 2,
        color: themes.corporateNeuBrutalism.sectionColors[5]
      },
      {
        id: 'risk-management',
        title: 'Risk Management',
        content: ['Market volatility mitigation', 'Regulatory compliance', 'Operational risk controls', 'Strategic contingencies'],
        contentType: 'bullets',
        x: 3, y: 4, width: 3, height: 2,
        color: themes.corporateNeuBrutalism.sectionColors[6]
      }
    ]
  },

  {
    id: 'corporate-executive-chic',
    name: 'Corporate Executive',
    description: 'Professional layout for executive presentations with minimal chic theme',
    canvasTitle: 'Executive Strategy Canvas',
    canvasSubheadings: [],
    gridCols: 6,
    gridRows: 6,
    theme: themes.corporateMinimalChic,
    sections: [
      {
        id: 'market-analysis',
        title: 'Market Analysis',
        content: 'Comprehensive market research reveals significant opportunities in emerging segments with projected growth rates exceeding industry averages by 15-20% annually.',
        contentType: 'paragraph',
        x: 0, y: 0, width: 3, height: 2,
        color: themes.corporateMinimalChic.sectionColors[0]
      },
      {
        id: 'competitive-advantage',
        title: 'Competitive Advantage',
        content: ['Proprietary technology', 'Market leadership position', 'Brand recognition', 'Operational excellence'],
        contentType: 'bullets',
        x: 3, y: 0, width: 3, height: 2,
        color: themes.corporateMinimalChic.sectionColors[1]
      },
      {
        id: 'strategic-objectives',
        title: 'Strategic Objectives',
        content: ['Revenue growth targets', 'Market expansion goals', 'Operational efficiency', 'Innovation initiatives'],
        contentType: 'bullets',
        x: 0, y: 2, width: 2, height: 2,
        color: themes.corporateMinimalChic.sectionColors[2]
      },
      {
        id: 'value-creation',
        title: 'Value Creation',
        content: ['Premium quality products', 'Superior customer experience', 'Innovative solutions', 'Long-term partnerships'],
        contentType: 'bullets',
        x: 2, y: 2, width: 2, height: 2,
        color: themes.corporateMinimalChic.sectionColors[3]
      },
      {
        id: 'resource-allocation',
        title: 'Resource Allocation',
        content: ['Technology investments', 'Human capital development', 'Market expansion funding', 'R&D initiatives'],
        contentType: 'bullets',
        x: 4, y: 2, width: 2, height: 2,
        color: themes.corporateMinimalChic.sectionColors[4]
      },
      {
        id: 'financial-projections',
        title: 'Financial Projections',
        content: 'Three-year financial outlook projects sustained revenue growth with improving margins through operational efficiency and premium positioning strategies.',
        contentType: 'paragraph',
        x: 0, y: 4, width: 3, height: 2,
        color: themes.corporateMinimalChic.sectionColors[5]
      },
      {
        id: 'risk-management',
        title: 'Risk Management',
        content: ['Market volatility mitigation', 'Regulatory compliance', 'Operational risk controls', 'Strategic contingencies'],
        contentType: 'bullets',
        x: 3, y: 4, width: 3, height: 2,
        color: themes.corporateMinimalChic.sectionColors[6]
      }
    ]
  },

  // LAYOUT 3: CREATIVE AGENCY - 3 THEMES
  {
    id: 'creative-agency-retro',
    name: 'Creative Agency',
    description: 'Dynamic asymmetric layout for creative industries with retro wave theme',
    canvasTitle: 'Creative Strategy Canvas',
    canvasSubheadings: [],
    gridCols: 6,
    gridRows: 6,
    theme: themes.creativeRetroWave,
    sections: [
      {
        id: 'creative-vision',
        title: 'Creative Vision',
        content: 'Our creative vision pushes boundaries through innovative design thinking, cutting-edge aesthetics, and transformative brand experiences that resonate with modern audiences.',
        contentType: 'paragraph',
        x: 0, y: 0, width: 2.5, height: 2.5,
        color: themes.creativeRetroWave.sectionColors[0]
      },
      {
        id: 'design-process',
        title: 'Design Process',
        content: ['Research & discovery', 'Concept development', 'Iterative design', 'User testing', 'Final execution'],
        contentType: 'bullets',
        x: 2.5, y: 0, width: 1.5, height: 2.7,
        color: themes.creativeRetroWave.sectionColors[1]
      },
      {
        id: 'brand-identity',
        title: 'Brand Identity',
        content: ['Visual language', 'Typography systems', 'Color palettes', 'Brand guidelines'],
        contentType: 'bullets',
        x: 4, y: 0, width: 2.1, height: 2,
        color: themes.creativeRetroWave.sectionColors[2]
      },
      {
        id: 'target-audience',
        title: 'Target Audience',
        content: ['Creative professionals', 'Design enthusiasts', 'Innovation leaders', 'Brand managers'],
        contentType: 'bullets',
        x: 4, y: 2, width: 2.1, height: 2,
        color: themes.creativeRetroWave.sectionColors[3]
      },
      {
        id: 'creative-services',
        title: 'Creative Services',
        content: ['Brand strategy', 'Visual design', 'Digital experiences', 'Content creation', 'Campaign development'],
        contentType: 'bullets',
        x: 2.5, y: 2.7, width: 1.5, height: 3.5,
        color: themes.creativeRetroWave.sectionColors[4]
      },
      {
        id: 'innovation-lab',
        title: 'Innovation Lab',
        content: 'Our innovation lab explores emerging technologies, experimental design methodologies, and future-forward creative solutions.',
        contentType: 'paragraph',
        x: 0, y: 2.5, width: 2.5, height: 1.7,
        color: themes.creativeRetroWave.sectionColors[5]
      },
      {
        id: 'portfolio-showcase',
        title: 'Portfolio Showcase',
        content: ['Award-winning campaigns', 'Brand transformations', 'Digital innovations', 'Creative partnerships'],
        contentType: 'bullets',
        x: 0, y: 4.2, width: 2.5, height: 2,
        color: themes.creativeRetroWave.sectionColors[6]
      },
      {
        id: 'creative-metrics',
        title: 'Creative Metrics',
        content: ['Brand awareness lift', 'Engagement rates', 'Creative awards', 'Client satisfaction'],
        contentType: 'bullets',
        x: 4, y: 4, width: 2.1, height: 2.2,
        color: themes.creativeRetroWave.sectionColors[7]
      }
    ]
  },

  {
    id: 'creative-agency-watercolor',
    name: 'Creative Agency',
    description: 'Dynamic asymmetric layout for creative industries with watercolor theme',
    canvasTitle: 'Creative Strategy Canvas',
    canvasSubheadings: [],
    gridCols: 6,
    gridRows: 6,
    theme: themes.creativeWatercolor,
    sections: [
      {
        id: 'creative-vision',
        title: 'Creative Vision',
        content: 'Our creative vision pushes boundaries through innovative design thinking, cutting-edge aesthetics, and transformative brand experiences that resonate with modern audiences.',
        contentType: 'paragraph',
        x: 0, y: 0, width: 2.5, height: 2.5,
        color: themes.creativeWatercolor.sectionColors[0]
      },
      {
        id: 'design-process',
        title: 'Design Process',
        content: ['Research & discovery', 'Concept development', 'Iterative design', 'User testing', 'Final execution'],
        contentType: 'bullets',
        x: 2.5, y: 0, width: 1.5, height: 2.7,
        color: themes.creativeWatercolor.sectionColors[1]
      },
      {
        id: 'brand-identity',
        title: 'Brand Identity',
        content: ['Visual language', 'Typography systems', 'Color palettes', 'Brand guidelines'],
        contentType: 'bullets',
        x: 4, y: 0, width: 2.1, height: 2,
        color: themes.creativeWatercolor.sectionColors[2]
      },
      {
        id: 'target-audience',
        title: 'Target Audience',
        content: ['Creative professionals', 'Design enthusiasts', 'Innovation leaders', 'Brand managers'],
        contentType: 'bullets',
        x: 4, y: 2, width: 2.1, height: 2,
        color: themes.creativeWatercolor.sectionColors[3]
      },
      {
        id: 'creative-services',
        title: 'Creative Services',
        content: ['Brand strategy', 'Visual design', 'Digital experiences', 'Content creation', 'Campaign development'],
        contentType: 'bullets',
        x: 2.5, y: 2.7, width: 1.5, height: 3.5,
        color: themes.creativeWatercolor.sectionColors[4]
      },
      {
        id: 'innovation-lab',
        title: 'Innovation Lab',
        content: 'Our innovation lab explores emerging technologies, experimental design methodologies, and future-forward creative solutions.',
        contentType: 'paragraph',
        x: 0, y: 2.5, width: 2.5, height: 1.7,
        color: themes.creativeWatercolor.sectionColors[5]
      },
      {
        id: 'portfolio-showcase',
        title: 'Portfolio Showcase',
        content: ['Award-winning campaigns', 'Brand transformations', 'Digital innovations', 'Creative partnerships'],
        contentType: 'bullets',
        x: 0, y: 4.2, width: 2.5, height: 2,
        color: themes.creativeWatercolor.sectionColors[6]
      },
      {
        id: 'creative-metrics',
        title: 'Creative Metrics',
        content: ['Brand awareness lift', 'Engagement rates', 'Creative awards', 'Client satisfaction'],
        contentType: 'bullets',
        x: 4, y: 4, width: 2.1, height: 2.2,
        color: themes.creativeWatercolor.sectionColors[7]
      }
    ]
  },

  {
    id: 'creative-agency-holographic',
    name: 'Creative Agency',
    description: 'Dynamic asymmetric layout for creative industries with holographic theme',
    canvasTitle: 'Creative Strategy Canvas',
    canvasSubheadings: [],
    gridCols: 6,
    gridRows: 6,
    theme: themes.creativeHolographic,
    sections: [
      {
        id: 'creative-vision',
        title: 'Creative Vision',
        content: 'Our creative vision pushes boundaries through innovative design thinking, cutting-edge aesthetics, and transformative brand experiences that resonate with modern audiences.',
        contentType: 'paragraph',
        x: 0, y: 0, width: 2.5, height: 2.5,
        color: themes.creativeHolographic.sectionColors[0]
      },
      {
        id: 'design-process',
        title: 'Design Process',
        content: ['Research & discovery', 'Concept development', 'Iterative design', 'User testing', 'Final execution'],
        contentType: 'bullets',
        x: 2.5, y: 0, width: 1.5, height: 2.7,
        color: themes.creativeHolographic.sectionColors[1]
      },
      {
        id: 'brand-identity',
        title: 'Brand Identity',
        content: ['Visual language', 'Typography systems', 'Color palettes', 'Brand guidelines'],
        contentType: 'bullets',
        x: 4, y: 0, width: 2.1, height: 2,
        color: themes.creativeHolographic.sectionColors[2]
      },
      {
        id: 'target-audience',
        title: 'Target Audience',
        content: ['Creative professionals', 'Design enthusiasts', 'Innovation leaders', 'Brand managers'],
        contentType: 'bullets',
        x: 4, y: 2, width: 2.1, height: 2,
        color: themes.creativeHolographic.sectionColors[3]
      },
      {
        id: 'creative-services',
        title: 'Creative Services',
        content: ['Brand strategy', 'Visual design', 'Digital experiences', 'Content creation', 'Campaign development'],
        contentType: 'bullets',
        x: 2.5, y: 2.7, width: 1.5, height: 3.5,
        color: themes.creativeHolographic.sectionColors[4]
      },
      {
        id: 'innovation-lab',
        title: 'Innovation Lab',
        content: 'Our innovation lab explores emerging technologies, experimental design methodologies, and future-forward creative solutions.',
        contentType: 'paragraph',
        x: 0, y: 2.5, width: 2.5, height: 1.7,
        color: themes.creativeHolographic.sectionColors[5]
      },
      {
        id: 'portfolio-showcase',
        title: 'Portfolio Showcase',
        content: ['Award-winning campaigns', 'Brand transformations', 'Digital innovations', 'Creative partnerships'],
        contentType: 'bullets',
        x: 0, y: 4.2, width: 2.5, height: 2,
        color: themes.creativeHolographic.sectionColors[6]
      },
      {
        id: 'creative-metrics',
        title: 'Creative Metrics',
        content: ['Brand awareness lift', 'Engagement rates', 'Creative awards', 'Client satisfaction'],
        contentType: 'bullets',
        x: 4, y: 4, width: 2.1, height: 2.2,
        color: themes.creativeHolographic.sectionColors[7]
      }
    ]
  },

  // LAYOUT 4: MINIMAL GRID - 3 THEMES
  {
    id: 'minimal-grid-scandinavian',
    name: 'Minimal Grid',
    description: 'Clean, structured grid approach with scandinavian theme',
    canvasTitle: 'Strategic Framework',
    canvasSubheadings: [],
    gridCols: 6,
    gridRows: 6,
    theme: themes.minimalScandinavian,
    sections: [
      {
        id: 'problem-statement',
        title: 'Problem Statement',
        content: 'Clear definition of the core problem we are solving, including market pain points and customer challenges that create opportunities for innovative solutions.',
        contentType: 'paragraph',
        x: 0, y: 0, width: 3, height: 2,
        color: themes.minimalScandinavian.sectionColors[0]
      },
      {
        id: 'solution-overview',
        title: 'Solution Overview',
        content: ['Core product features', 'Key differentiators', 'Technology stack', 'Implementation approach'],
        contentType: 'bullets',
        x: 3, y: 0, width: 3, height: 2,
        color: themes.minimalScandinavian.sectionColors[1]
      },
      {
        id: 'market-opportunity',
        title: 'Market Opportunity',
        content: ['Total addressable market', 'Market growth trends', 'Competitive landscape', 'Entry barriers'],
        contentType: 'bullets',
        x: 0, y: 2, width: 2, height: 2,
        color: themes.minimalScandinavian.sectionColors[2]
      },
      {
        id: 'business-model',
        title: 'Business Model',
        content: ['Revenue streams', 'Pricing strategy', 'Customer acquisition', 'Value delivery'],
        contentType: 'bullets',
        x: 2, y: 2, width: 2, height: 2,
        color: themes.minimalScandinavian.sectionColors[3]
      },
      {
        id: 'competitive-analysis',
        title: 'Competitive Analysis',
        content: ['Direct competitors', 'Indirect competitors', 'Competitive advantages', 'Market positioning'],
        contentType: 'bullets',
        x: 4, y: 2, width: 2, height: 2,
        color: themes.minimalScandinavian.sectionColors[4]
      },
      {
        id: 'execution-plan',
        title: 'Execution Plan',
        content: 'Detailed roadmap for implementation including key milestones, resource requirements, and success metrics for achieving strategic objectives.',
        contentType: 'paragraph',
        x: 0, y: 4, width: 3, height: 2,
        color: themes.minimalScandinavian.sectionColors[5]
      },
      {
        id: 'success-metrics',
        title: 'Success Metrics',
        content: ['Key performance indicators', 'Revenue targets', 'User acquisition goals', 'Market share objectives'],
        contentType: 'bullets',
        x: 3, y: 4, width: 3, height: 2,
        color: themes.minimalScandinavian.sectionColors[6]
      }
    ]
  },

  {
    id: 'minimal-grid-japanese',
    name: 'Minimal Grid',
    description: 'Clean, structured grid approach with japanese zen theme',
    canvasTitle: 'Strategic Framework',
    canvasSubheadings: [],
    gridCols: 6,
    gridRows: 6,
    theme: themes.minimalJapanese,
    sections: [
      {
        id: 'problem-statement',
        title: 'Problem Statement',
        content: 'Clear definition of the core problem we are solving, including market pain points and customer challenges that create opportunities for innovative solutions.',
        contentType: 'paragraph',
        x: 0, y: 0, width: 3, height: 2,
        color: themes.minimalJapanese.sectionColors[0]
      },
      {
        id: 'solution-overview',
        title: 'Solution Overview',
        content: ['Core product features', 'Key differentiators', 'Technology stack', 'Implementation approach'],
        contentType: 'bullets',
        x: 3, y: 0, width: 3, height: 2,
        color: themes.minimalJapanese.sectionColors[1]
      },
      {
        id: 'market-opportunity',
        title: 'Market Opportunity',
        content: ['Total addressable market', 'Market growth trends', 'Competitive landscape', 'Entry barriers'],
        contentType: 'bullets',
        x: 0, y: 2, width: 2, height: 2,
        color: themes.minimalJapanese.sectionColors[2]
      },
      {
        id: 'business-model',
        title: 'Business Model',
        content: ['Revenue streams', 'Pricing strategy', 'Customer acquisition', 'Value delivery'],
        contentType: 'bullets',
        x: 2, y: 2, width: 2, height: 2,
        color: themes.minimalJapanese.sectionColors[3]
      },
      {
        id: 'competitive-analysis',
        title: 'Competitive Analysis',
        content: ['Direct competitors', 'Indirect competitors', 'Competitive advantages', 'Market positioning'],
        contentType: 'bullets',
        x: 4, y: 2, width: 2, height: 2,
        color: themes.minimalJapanese.sectionColors[4]
      },
      {
        id: 'execution-plan',
        title: 'Execution Plan',
        content: 'Detailed roadmap for implementation including key milestones, resource requirements, and success metrics for achieving strategic objectives.',
        contentType: 'paragraph',
        x: 0, y: 4, width: 3, height: 2,
        color: themes.minimalJapanese.sectionColors[5]
      },
      {
        id: 'success-metrics',
        title: 'Success Metrics',
        content: ['Key performance indicators', 'Revenue targets', 'User acquisition goals', 'Market share objectives'],
        contentType: 'bullets',
        x: 3, y: 4, width: 3, height: 2,
        color: themes.minimalJapanese.sectionColors[6]
      }
    ]
  },

  {
    id: 'minimal-grid-swiss',
    name: 'Minimal Grid',
    description: 'Clean, structured grid approach with swiss design theme',
    canvasTitle: 'Strategic Framework',
    canvasSubheadings: [],
    gridCols: 6,
    gridRows: 6,
    theme: themes.minimalSwiss,
    sections: [
      {
        id: 'problem-statement',
        title: 'Problem Statement',
        content: 'Clear definition of the core problem we are solving, including market pain points and customer challenges that create opportunities for innovative solutions.',
        contentType: 'paragraph',
        x: 0, y: 0, width: 3, height: 2,
        color: themes.minimalSwiss.sectionColors[0]
      },
      {
        id: 'solution-overview',
        title: 'Solution Overview',
        content: ['Core product features', 'Key differentiators', 'Technology stack', 'Implementation approach'],
        contentType: 'bullets',
        x: 3, y: 0, width: 3, height: 2,
        color: themes.minimalSwiss.sectionColors[1]
      },
      {
        id: 'market-opportunity',
        title: 'Market Opportunity',
        content: ['Total addressable market', 'Market growth trends', 'Competitive landscape', 'Entry barriers'],
        contentType: 'bullets',
        x: 0, y: 2, width: 2, height: 2,
        color: themes.minimalSwiss.sectionColors[2]
      },
      {
        id: 'business-model',
        title: 'Business Model',
        content: ['Revenue streams', 'Pricing strategy', 'Customer acquisition', 'Value delivery'],
        contentType: 'bullets',
        x: 2, y: 2, width: 2, height: 2,
        color: themes.minimalSwiss.sectionColors[3]
      },
      {
        id: 'competitive-analysis',
        title: 'Competitive Analysis',
        content: ['Direct competitors', 'Indirect competitors', 'Competitive advantages', 'Market positioning'],
        contentType: 'bullets',
        x: 4, y: 2, width: 2, height: 2,
        color: themes.minimalSwiss.sectionColors[4]
      },
      {
        id: 'execution-plan',
        title: 'Execution Plan',
        content: 'Detailed roadmap for implementation including key milestones, resource requirements, and success metrics for achieving strategic objectives.',
        contentType: 'paragraph',
        x: 0, y: 4, width: 3, height: 2,
        color: themes.minimalSwiss.sectionColors[5]
      },
      {
        id: 'success-metrics',
        title: 'Success Metrics',
        content: ['Key performance indicators', 'Revenue targets', 'User acquisition goals', 'Market share objectives'],
        contentType: 'bullets',
        x: 3, y: 4, width: 3, height: 2,
        color: themes.minimalSwiss.sectionColors[6]
      }
    ]
  },

  // LAYOUT 5: TECH INNOVATION - 3 THEMES
  {
    id: 'tech-innovation-cyberpunk',
    name: 'Tech Innovation',
    description: 'Futuristic modular layout for tech companies with cyberpunk theme',
    canvasTitle: 'Innovation Framework',
    canvasSubheadings: [],
    gridCols: 6,
    gridRows: 6,
    theme: themes.techCyberpunk,
    sections: [
      {
        id: 'technology-stack',
        title: 'Technology Stack',
        content: ['Cloud infrastructure', 'AI/ML capabilities', 'Data analytics', 'Security protocols', 'API architecture'],
        contentType: 'bullets',
        x: 0, y: 0, width: 2, height: 2.2,
        color: themes.techCyberpunk.sectionColors[0]
      },
      {
        id: 'innovation-pipeline',
        title: 'Innovation Pipeline',
        content: 'Continuous innovation through R&D investments, emerging technology adoption, and strategic partnerships with leading tech companies and research institutions.',
        contentType: 'paragraph',
        x: 2, y: 0, width: 2.5, height: 2.2,
        color: themes.techCyberpunk.sectionColors[1]
      },
      {
        id: 'digital-transformation',
        title: 'Digital Transformation',
        content: ['Process automation', 'Digital workflows', 'Cloud migration', 'Data-driven decisions'],
        contentType: 'bullets',
        x: 4.5, y: 0, width: 1.5, height: 2.5,
        color: themes.techCyberpunk.sectionColors[2]
      },
      {
        id: 'product-development',
        title: 'Product Development',
        content: ['Agile methodology', 'DevOps practices', 'Continuous integration', 'User-centered design'],
        contentType: 'bullets',
        x: 2, y: 2.2, width: 2.5, height: 2,
        color: themes.techCyberpunk.sectionColors[3]
      },
      {
        id: 'scalability-architecture',
        title: 'Scalability Architecture',
        content: ['Microservices design', 'Load balancing', 'Database optimization', 'Performance monitoring'],
        contentType: 'bullets',
        x: 0, y: 2.2, width: 2, height: 2,
        color: themes.techCyberpunk.sectionColors[4]
      },
      {
        id: 'data-strategy',
        title: 'Data Strategy',
        content: 'Comprehensive data strategy leveraging big data analytics, machine learning algorithms, and predictive modeling to drive business intelligence and competitive advantage.',
        contentType: 'paragraph',
        x: 0, y: 4.2, width: 2.5, height: 2,
        color: themes.techCyberpunk.sectionColors[5]
      },
      {
        id: 'security-framework',
        title: 'Security Framework',
        content: ['Zero-trust architecture', 'Encryption protocols', 'Threat detection', 'Compliance standards'],
        contentType: 'bullets',
        x: 2.5, y: 4.2, width: 2, height: 2,
        color: themes.techCyberpunk.sectionColors[6]
      },
      {
        id: 'tech-partnerships',
        title: 'Tech Partnerships',
        content: ['Strategic alliances', 'Vendor relationships', 'Open source contributions', 'Industry collaborations'],
        contentType: 'bullets',
        x: 4.5, y: 2.5, width: 1.5, height: 3.7,
        color: themes.techCyberpunk.sectionColors[7]
      }
    ]
  },

  {
    id: 'tech-innovation-neuomorphism',
    name: 'Tech Innovation',
    description: 'Futuristic modular layout for tech companies with neuomorphism theme',
    canvasTitle: 'Innovation Framework',
    canvasSubheadings: [],
    gridCols: 6,
    gridRows: 6,
    theme: themes.techNeuomorphism,
    sections: [
      {
        id: 'technology-stack',
        title: 'Technology Stack',
        content: ['Cloud infrastructure', 'AI/ML capabilities', 'Data analytics', 'Security protocols', 'API architecture'],
        contentType: 'bullets',
        x: 0, y: 0, width: 2, height: 2.2,
        color: themes.techNeuomorphism.sectionColors[0]
      },
      {
        id: 'innovation-pipeline',
        title: 'Innovation Pipeline',
        content: 'Continuous innovation through R&D investments, emerging technology adoption, and strategic partnerships with leading tech companies and research institutions.',
        contentType: 'paragraph',
        x: 2, y: 0, width: 2.5, height: 2.2,
        color: themes.techNeuomorphism.sectionColors[1]
      },
      {
        id: 'digital-transformation',
        title: 'Digital Transformation',
        content: ['Process automation', 'Digital workflows', 'Cloud migration', 'Data-driven decisions'],
        contentType: 'bullets',
        x: 4.5, y: 0, width: 1.5, height: 2.5,
        color: themes.techNeuomorphism.sectionColors[2]
      },
      {
        id: 'product-development',
        title: 'Product Development',
        content: ['Agile methodology', 'DevOps practices', 'Continuous integration', 'User-centered design'],
        contentType: 'bullets',
        x: 2, y: 2.2, width: 2.5, height: 2,
        color: themes.techNeuomorphism.sectionColors[3]
      },
      {
        id: 'scalability-architecture',
        title: 'Scalability Architecture',
        content: ['Microservices design', 'Load balancing', 'Database optimization', 'Performance monitoring'],
        contentType: 'bullets',
        x: 0, y: 2.2, width: 2, height: 2,
        color: themes.techNeuomorphism.sectionColors[4]
      },
      {
        id: 'data-strategy',
        title: 'Data Strategy',
        content: 'Comprehensive data strategy leveraging big data analytics, machine learning algorithms, and predictive modeling to drive business intelligence and competitive advantage.',
        contentType: 'paragraph',
        x: 0, y: 4.2, width: 2.5, height: 2,
        color: themes.techNeuomorphism.sectionColors[5]
      },
      {
        id: 'security-framework',
        title: 'Security Framework',
        content: ['Zero-trust architecture', 'Encryption protocols', 'Threat detection', 'Compliance standards'],
        contentType: 'bullets',
        x: 2.5, y: 4.2, width: 2, height: 2,
        color: themes.techNeuomorphism.sectionColors[6]
      },
      {
        id: 'tech-partnerships',
        title: 'Tech Partnerships',
        content: ['Strategic alliances', 'Vendor relationships', 'Open source contributions', 'Industry collaborations'],
        contentType: 'bullets',
        x: 4.5, y: 2.5, width: 1.5, height: 3.7,
        color: themes.techNeuomorphism.sectionColors[7]
      }
    ]
  },

  {
    id: 'tech-innovation-quantum',
    name: 'Tech Innovation',
    description: 'Futuristic modular layout for tech companies with quantum theme',
    canvasTitle: 'Innovation Framework',
    canvasSubheadings: [],
    gridCols: 6,
    gridRows: 6,
    theme: themes.techQuantum,
    sections: [
      {
        id: 'technology-stack',
        title: 'Technology Stack',
        content: ['Cloud infrastructure', 'AI/ML capabilities', 'Data analytics', 'Security protocols', 'API architecture'],
        contentType: 'bullets',
        x: 0, y: 0, width: 2, height: 2.2,
        color: themes.techQuantum.sectionColors[0]
      },
      {
        id: 'innovation-pipeline',
        title: 'Innovation Pipeline',
        content: 'Continuous innovation through R&D investments, emerging technology adoption, and strategic partnerships with leading tech companies and research institutions.',
        contentType: 'paragraph',
        x: 2, y: 0, width: 2.5, height: 2.2,
        color: themes.techQuantum.sectionColors[1]
      },
      {
        id: 'digital-transformation',
        title: 'Digital Transformation',
        content: ['Process automation', 'Digital workflows', 'Cloud migration', 'Data-driven decisions'],
        contentType: 'bullets',
        x: 4.5, y: 0, width: 1.5, height: 2.5,
        color: themes.techQuantum.sectionColors[2]
      },
      {
        id: 'product-development',
        title: 'Product Development',
        content: ['Agile methodology', 'DevOps practices', 'Continuous integration', 'User-centered design'],
        contentType: 'bullets',
        x: 2, y: 2.2, width: 2.5, height: 2,
        color: themes.techQuantum.sectionColors[3]
      },
      {
        id: 'scalability-architecture',
        title: 'Scalability Architecture',
        content: ['Microservices design', 'Load balancing', 'Database optimization', 'Performance monitoring'],
        contentType: 'bullets',
        x: 0, y: 2.2, width: 2, height: 2,
        color: themes.techQuantum.sectionColors[4]
      },
      {
        id: 'data-strategy',
        title: 'Data Strategy',
        content: 'Comprehensive data strategy leveraging big data analytics, machine learning algorithms, and predictive modeling to drive business intelligence and competitive advantage.',
        contentType: 'paragraph',
        x: 0, y: 4.2, width: 2.5, height: 2,
        color: themes.techQuantum.sectionColors[5]
      },
      {
        id: 'security-framework',
        title: 'Security Framework',
        content: ['Zero-trust architecture', 'Encryption protocols', 'Threat detection', 'Compliance standards'],
        contentType: 'bullets',
        x: 2.5, y: 4.2, width: 2, height: 2,
        color: themes.techQuantum.sectionColors[6]
      },
      {
        id: 'tech-partnerships',
        title: 'Tech Partnerships',
        content: ['Strategic alliances', 'Vendor relationships', 'Open source contributions', 'Industry collaborations'],
        contentType: 'bullets',
        x: 4.5, y: 2.5, width: 1.5, height: 3.7,
        color: themes.techQuantum.sectionColors[7]
      }
    ]
  },

  // LAYOUT 6: STARTUP LEAN CANVAS - 3 THEMES
  {
    id: 'startup-lean-vaporwave',
    name: 'Startup Lean Canvas',
    description: 'Problem-solution focused lean methodology with vaporwave theme',
    canvasTitle: 'Lean Startup Canvas',
    canvasSubheadings: [],
    gridCols: 6,
    gridRows: 6,
    theme: themes.startupVaporwave,
    sections: [
      {
        id: 'problem',
        title: 'Problem',
        content: ['Customer pain points', 'Market gaps', 'Existing alternatives', 'Problem validation'],
        contentType: 'bullets',
        x: 0, y: 0, width: 1.5, height: 2,
        color: themes.startupVaporwave.sectionColors[0]
      },
      {
        id: 'solution',
        title: 'Solution',
        content: ['Core features', 'Value delivery', 'Minimum viable product', 'Solution validation'],
        contentType: 'bullets',
        x: 1.5, y: 0, width: 1.5, height: 2,
        color: themes.startupVaporwave.sectionColors[1]
      },
      {
        id: 'unique-value-proposition',
        title: 'Unique Value Proposition',
        content: 'Single, clear compelling message that states why you are different and worth paying attention to. What makes your solution unique and valuable.',
        contentType: 'paragraph',
        x: 3, y: 0, width: 3, height: 2,
        color: themes.startupVaporwave.sectionColors[2]
      },
      {
        id: 'unfair-advantage',
        title: 'Unfair Advantage',
        content: ['Proprietary technology', 'Network effects', 'Brand recognition', 'Regulatory barriers'],
        contentType: 'bullets',
        x: 0, y: 2, width: 1.5, height: 2,
        color: themes.startupVaporwave.sectionColors[3]
      },
      {
        id: 'customer-segments',
        title: 'Customer Segments',
        content: ['Early adopters', 'Target demographics', 'User personas', 'Market segments'],
        contentType: 'bullets',
        x: 1.5, y: 2, width: 1.5, height: 2,
        color: themes.startupVaporwave.sectionColors[4]
      },
      {
        id: 'key-metrics',
        title: 'Key Metrics',
        content: ['User acquisition', 'Revenue growth', 'Customer retention', 'Market penetration'],
        contentType: 'bullets',
        x: 3, y: 2, width: 1.5, height: 2,
        color: themes.startupVaporwave.sectionColors[5]
      },
      {
        id: 'channels',
        title: 'Channels',
        content: ['Digital marketing', 'Social media', 'Direct sales', 'Partner networks'],
        contentType: 'bullets',
        x: 4.5, y: 2, width: 1.5, height: 2,
        color: themes.startupVaporwave.sectionColors[6]
      },
      {
        id: 'cost-structure',
        title: 'Cost Structure',
        content: 'Customer acquisition costs, development expenses, operational overhead, and scaling investments required to build and grow the business.',
        contentType: 'paragraph',
        x: 0, y: 4, width: 3, height: 2,
        color: themes.startupVaporwave.sectionColors[7]
      },
      {
        id: 'revenue-streams',
        title: 'Revenue Streams',
        content: ['Subscription model', 'Transaction fees', 'Freemium pricing', 'Enterprise sales'],
        contentType: 'bullets',
        x: 3, y: 4, width: 3, height: 2,
        color: themes.startupVaporwave.sectionColors[8]
      }
    ]
  },

  {
    id: 'startup-lean-sunset',
    name: 'Startup Lean Canvas',
    description: 'Problem-solution focused lean methodology with sunset vibes theme',
    canvasTitle: 'Lean Startup Canvas',
    canvasSubheadings: [],
    gridCols: 6,
    gridRows: 6,
    theme: themes.startupSunset,
    sections: [
      {
        id: 'problem',
        title: 'Problem',
        content: ['Customer pain points', 'Market gaps', 'Existing alternatives', 'Problem validation'],
        contentType: 'bullets',
        x: 0, y: 0, width: 1.5, height: 2,
        color: themes.startupSunset.sectionColors[0]
      },
      {
        id: 'solution',
        title: 'Solution',
        content: ['Core features', 'Value delivery', 'Minimum viable product', 'Solution validation'],
        contentType: 'bullets',
        x: 1.5, y: 0, width: 1.5, height: 2,
        color: themes.startupSunset.sectionColors[1]
      },
      {
        id: 'unique-value-proposition',
        title: 'Unique Value Proposition',
        content: 'Single, clear compelling message that states why you are different and worth paying attention to. What makes your solution unique and valuable.',
        contentType: 'paragraph',
        x: 3, y: 0, width: 3, height: 2,
        color: themes.startupSunset.sectionColors[2]
      },
      {
        id: 'unfair-advantage',
        title: 'Unfair Advantage',
        content: ['Proprietary technology', 'Network effects', 'Brand recognition', 'Regulatory barriers'],
        contentType: 'bullets',
        x: 0, y: 2, width: 1.5, height: 2,
        color: themes.startupSunset.sectionColors[3]
      },
      {
        id: 'customer-segments',
        title: 'Customer Segments',
        content: ['Early adopters', 'Target demographics', 'User personas', 'Market segments'],
        contentType: 'bullets',
        x: 1.5, y: 2, width: 1.5, height: 2,
        color: themes.startupSunset.sectionColors[4]
      },
      {
        id: 'key-metrics',
        title: 'Key Metrics',
        content: ['User acquisition', 'Revenue growth', 'Customer retention', 'Market penetration'],
        contentType: 'bullets',
        x: 3, y: 2, width: 1.5, height: 2,
        color: themes.startupSunset.sectionColors[5]
      },
      {
        id: 'channels',
        title: 'Channels',
        content: ['Digital marketing', 'Social media', 'Direct sales', 'Partner networks'],
        contentType: 'bullets',
        x: 4.5, y: 2, width: 1.5, height: 2,
        color: themes.startupSunset.sectionColors[6]
      },
      {
        id: 'cost-structure',
        title: 'Cost Structure',
        content: 'Customer acquisition costs, development expenses, operational overhead, and scaling investments required to build and grow the business.',
        contentType: 'paragraph',
        x: 0, y: 4, width: 3, height: 2,
        color: themes.startupSunset.sectionColors[7]
      },
      {
        id: 'revenue-streams',
        title: 'Revenue Streams',
        content: ['Subscription model', 'Transaction fees', 'Freemium pricing', 'Enterprise sales'],
        contentType: 'bullets',
        x: 3, y: 4, width: 3, height: 2,
        color: themes.startupSunset.sectionColors[8]
      }
    ]
  },

  {
    id: 'startup-lean-aurora',
    name: 'Startup Lean Canvas',
    description: 'Problem-solution focused lean methodology with aurora borealis theme',
    canvasTitle: 'Lean Startup Canvas',
    canvasSubheadings: [],
    gridCols: 6,
    gridRows: 6,
    theme: themes.startupAurora,
    sections: [
      {
        id: 'problem',
        title: 'Problem',
        content: ['Customer pain points', 'Market gaps', 'Existing alternatives', 'Problem validation'],
        contentType: 'bullets',
        x: 0, y: 0, width: 1.5, height: 2,
        color: themes.startupAurora.sectionColors[0]
      },
      {
        id: 'solution',
        title: 'Solution',
        content: ['Core features', 'Value delivery', 'Minimum viable product', 'Solution validation'],
        contentType: 'bullets',
        x: 1.5, y: 0, width: 1.5, height: 2,
        color: themes.startupAurora.sectionColors[1]
      },
      {
        id: 'unique-value-proposition',
        title: 'Unique Value Proposition',
        content: 'Single, clear compelling message that states why you are different and worth paying attention to. What makes your solution unique and valuable.',
        contentType: 'paragraph',
        x: 3, y: 0, width: 3, height: 2,
        color: themes.startupAurora.sectionColors[2]
      },
      {
        id: 'unfair-advantage',
        title: 'Unfair Advantage',
        content: ['Proprietary technology', 'Network effects', 'Brand recognition', 'Regulatory barriers'],
        contentType: 'bullets',
        x: 0, y: 2, width: 1.5, height: 2,
        color: themes.startupAurora.sectionColors[3]
      },
      {
        id: 'customer-segments',
        title: 'Customer Segments',
        content: ['Early adopters', 'Target demographics', 'User personas', 'Market segments'],
        contentType: 'bullets',
        x: 1.5, y: 2, width: 1.5, height: 2,
        color: themes.startupAurora.sectionColors[4]
      },
      {
        id: 'key-metrics',
        title: 'Key Metrics',
        content: ['User acquisition', 'Revenue growth', 'Customer retention', 'Market penetration'],
        contentType: 'bullets',
        x: 3, y: 2, width: 1.5, height: 2,
        color: themes.startupAurora.sectionColors[5]
      },
      {
        id: 'channels',
        title: 'Channels',
        content: ['Digital marketing', 'Social media', 'Direct sales', 'Partner networks'],
        contentType: 'bullets',
        x: 4.5, y: 2, width: 1.5, height: 2,
        color: themes.startupAurora.sectionColors[6]
      },
      {
        id: 'cost-structure',
        title: 'Cost Structure',
        content: 'Customer acquisition costs, development expenses, operational overhead, and scaling investments required to build and grow the business.',
        contentType: 'paragraph',
        x: 0, y: 4, width: 3, height: 2,
        color: themes.startupAurora.sectionColors[7]
      },
      {
        id: 'revenue-streams',
        title: 'Revenue Streams',
        content: ['Subscription model', 'Transaction fees', 'Freemium pricing', 'Enterprise sales'],
        contentType: 'bullets',
        x: 3, y: 4, width: 3, height: 2,
        color: themes.startupAurora.sectionColors[8]
      }
    ]
  },
  {
    id: 'nature-strategy-sand',
    name: 'Nature Strategy Canvas',
    description: 'Nature Strategy Canvas with Sand Dunes theme',
    canvasTitle: 'Nature Strategy Canvas',
    canvasSubheadings: [],
    gridCols: 6,
    gridRows: 6,
    theme: themes.sandDunes,
    sections: [
      { 
        id: 'vision', 
        title: 'Vision', 
        content: 'A grounded vision for sustainable growth and resilience.', 
        contentType: 'paragraph', 
        x: 0, y: 0, width: 2.5, height: 2, 
        color: themes.sandDunes.sectionColors[0] 
      },
      { 
        id: 'unique-value', 
        title: 'Unique Value', 
        content: ['Adaptability', 'Resourcefulness', 'Endurance'], 
        contentType: 'bullets', 
        x: 2.5, y: 0, width: 1.5, height: 4, 
        color: themes.sandDunes.sectionColors[1] 
      },
      { 
        id: 'key-partners', 
        title: 'Key Partners', 
        content: ['Alliances', 'Suppliers', 'Stakeholders'], 
        contentType: 'bullets', 
        x: 4, y: 0, width: 1, height: 2, 
        color: themes.sandDunes.sectionColors[2] 
      },
      { 
        id: 'key-contributors', 
        title: 'Key Contributors', 
        content: ['Steel', 'Wood', 'Lumber'], 
        contentType: 'bullets', 
        x: 5, y: 0, width: 1, height: 2, 
        color: themes.sandDunes.sectionColors[9] 
      },
      { 
        id: 'resources', 
        title: 'Key Resources', 
        content: ['People', 'Technology', 'Capital'], 
        contentType: 'bullets', 
        x: 0, y: 2, width: 1.25, height: 2, 
        color: themes.sandDunes.sectionColors[3] 
      },
      { 
        id: 'customer-segments', 
        title: 'Customer Segments', 
        content: ['Early adopters', 'Mainstream', 'Niche'], 
        contentType: 'bullets', 
        x: 1.25, y: 2, width: 1.25, height: 2, 
        color: themes.sandDunes.sectionColors[4] 
      },
      { 
        id: 'channels', 
        title: 'Channels', 
        content: ['Digital', 'Retail', 'Partners'], 
        contentType: 'bullets', 
        x: 4, y: 2, width: 2, height: 2, 
        color: themes.sandDunes.sectionColors[5] 
      },
      { 
        id: 'metrics', 
        title: 'Success Metrics', 
        content: ['Growth', 'Engagement', 'Profitability'], 
        contentType: 'bullets', 
        x: 0, y: 4, width: 1.5, height: 2.2, 
        color: themes.sandDunes.sectionColors[6] 
      },
      { 
        id: 'cost-structure', 
        title: 'Cost Structure', 
        content: 'Operational, marketing, and innovation costs.', 
        contentType: 'paragraph', 
        x: 1.5, y: 4, width: 2.5, height: 2.2, 
        color: themes.sandDunes.sectionColors[7] 
      },
      { 
        id: 'revenue-streams', 
        title: 'Revenue Streams', 
        content: ['Sales', 'Subscriptions', 'Licensing'], 
        contentType: 'bullets', 
        x: 4, y: 4, width: 2, height: 2.2, 
        color: themes.sandDunes.sectionColors[8] 
      }
    ]
  },

  {
    id: 'nature-strategy-rock',
    name: 'Nature Strategy Canvas',
    description: 'Nature Strategy Canvas with Rock Canyon theme',
    canvasTitle: 'Nature Strategy Canvas',
    canvasSubheadings: [],
    gridCols: 6,
    gridRows: 6,
    theme: themes.rockCanyon,
    sections: [
      { 
        id: 'vision', 
        title: 'Vision', 
        content: 'A grounded vision for sustainable growth and resilience.', 
        contentType: 'paragraph', 
        x: 0, y: 0, width: 2.5, height: 2, 
        color: themes.rockCanyon.sectionColors[0] 
      },
      { 
        id: 'unique-value', 
        title: 'Unique Value', 
        content: ['Adaptability', 'Resourcefulness', 'Endurance'], 
        contentType: 'bullets', 
        x: 2.5, y: 0, width: 1.5, height: 4, 
        color: themes.rockCanyon.sectionColors[1] 
      },
      { 
        id: 'key-partners', 
        title: 'Key Partners', 
        content: ['Alliances', 'Suppliers', 'Stakeholders'], 
        contentType: 'bullets', 
        x: 4, y: 0, width: 1, height: 2, 
        color: themes.rockCanyon.sectionColors[2] 
      },
      { 
        id: 'key-contributors', 
        title: 'Key Contributors', 
        content: ['Steel', 'Wood', 'Lumber'], 
        contentType: 'bullets', 
        x: 5, y: 0, width: 1, height: 2, 
        color: themes.rockCanyon.sectionColors[9] 
      },
      { 
        id: 'resources', 
        title: 'Key Resources', 
        content: ['People', 'Technology', 'Capital'], 
        contentType: 'bullets', 
        x: 0, y: 2, width: 1.25, height: 2, 
        color: themes.rockCanyon.sectionColors[3] 
      },
      { 
        id: 'customer-segments', 
        title: 'Customer Segments', 
        content: ['Early adopters', 'Mainstream', 'Niche'], 
        contentType: 'bullets', 
        x: 1.25, y: 2, width: 1.25, height: 2, 
        color: themes.rockCanyon.sectionColors[4] 
      },
      { 
        id: 'channels', 
        title: 'Channels', 
        content: ['Digital', 'Retail', 'Partners'], 
        contentType: 'bullets', 
        x: 4, y: 2, width: 2, height: 2, 
        color: themes.rockCanyon.sectionColors[5] 
      },
      { 
        id: 'metrics', 
        title: 'Success Metrics', 
        content: ['Growth', 'Engagement', 'Profitability'], 
        contentType: 'bullets', 
        x: 0, y: 4, width: 1.5, height: 2.2, 
        color: themes.rockCanyon.sectionColors[6] 
      },
      { 
        id: 'cost-structure', 
        title: 'Cost Structure', 
        content: 'Operational, marketing, and innovation costs.', 
        contentType: 'paragraph', 
        x: 1.5, y: 4, width: 2.5, height: 2.2, 
        color: themes.rockCanyon.sectionColors[7] 
      },
      { 
        id: 'revenue-streams', 
        title: 'Revenue Streams', 
        content: ['Sales', 'Subscriptions', 'Licensing'], 
        contentType: 'bullets', 
        x: 4, y: 4, width: 2, height: 2.2, 
        color: themes.rockCanyon.sectionColors[8] 
      }
    ]
  },
  
  {
    id: 'nature-strategy-forest',
    name: 'Nature Strategy Canvas',
    description: 'Nature Strategy Canvas with Midnight Forest theme',
    canvasTitle: 'Nature Strategy Canvas',
    canvasSubheadings: [],
    gridCols: 6,
    gridRows: 6,
    theme: themes.midnightForest,
    sections: [
      { 
        id: 'vision', 
        title: 'Vision', 
        content: 'A grounded vision for sustainable growth and resilience.', 
        contentType: 'paragraph', 
        x: 0, y: 0, width: 2.5, height: 2, 
        color: themes.midnightForest.sectionColors[0] 
      },
      { 
        id: 'unique-value', 
        title: 'Unique Value', 
        content: ['Adaptability', 'Resourcefulness', 'Endurance'], 
        contentType: 'bullets', 
        x: 2.5, y: 0, width: 1.5, height: 4, 
        color: themes.midnightForest.sectionColors[1] 
      },
      { 
        id: 'key-partners', 
        title: 'Key Partners', 
        content: ['Alliances', 'Suppliers', 'Stakeholders'], 
        contentType: 'bullets', 
        x: 4, y: 0, width: 1, height: 2, 
        color: themes.midnightForest.sectionColors[2] 
      },
      { 
        id: 'key-contributors', 
        title: 'Key Contributors', 
        content: ['Steel', 'Wood', 'Lumber'], 
        contentType: 'bullets', 
        x: 5, y: 0, width: 1, height: 2, 
        color: themes.midnightForest.sectionColors[9] 
      },
      { 
        id: 'resources', 
        title: 'Key Resources', 
        content: ['People', 'Technology', 'Capital'], 
        contentType: 'bullets', 
        x: 0, y: 2, width: 1.25, height: 2, 
        color: themes.midnightForest.sectionColors[3] 
      },
      { 
        id: 'customer-segments', 
        title: 'Customer Segments', 
        content: ['Early adopters', 'Mainstream', 'Niche'], 
        contentType: 'bullets', 
        x: 1.25, y: 2, width: 1.25, height: 2, 
        color: themes.midnightForest.sectionColors[4] 
      },
      { 
        id: 'channels', 
        title: 'Channels', 
        content: ['Digital', 'Retail', 'Partners'], 
        contentType: 'bullets', 
        x: 4, y: 2, width: 2, height: 2, 
        color: themes.midnightForest.sectionColors[5] 
      },
      { 
        id: 'metrics', 
        title: 'Success Metrics', 
        content: ['Growth', 'Engagement', 'Profitability'], 
        contentType: 'bullets', 
        x: 0, y: 4, width: 1.5, height: 2.2, 
        color: themes.midnightForest.sectionColors[6] 
      },
      { 
        id: 'cost-structure', 
        title: 'Cost Structure', 
        content: 'Operational, marketing, and innovation costs.', 
        contentType: 'paragraph', 
        x: 1.5, y: 4, width: 2.5, height: 2.2, 
        color: themes.midnightForest.sectionColors[7] 
      },
      { 
        id: 'revenue-streams', 
        title: 'Revenue Streams', 
        content: ['Sales', 'Subscriptions', 'Licensing'], 
        contentType: 'bullets', 
        x: 4, y: 4, width: 2, height: 2.2, 
        color: themes.midnightForest.sectionColors[8] 
      }
    ]
  }
];