import React, { useState } from 'react';
import { TemplateSelector } from './components/TemplateSelector';
import { UploadModal } from './components/UploadModal';
import { CanvasEditor } from './components/CanvasEditor';
import { canvasTemplates } from './data/templates';
import { CanvasTemplate, UploadData } from './types/canvas';
import { createCanvasFromJSON } from './data/templates';
import { calculateOptimalSize, calculateScalingFactor } from './utils/contentSizing';
import { CanvasSection, TemplateTheme } from './types/canvas';





type AppState = 'template-selection' | 'upload-modal' | 'canvas-editor';

function App() {
  const [appState, setAppState] = useState<AppState>('template-selection');
  const [selectedTemplate, setSelectedTemplate] = useState<CanvasTemplate | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //--------------------------------------------------------------------------


  // Fixed canvas dimensions - perfect for landscape PDF
  const CANVAS_WIDTH = 1300;
  const CANVAS_HEIGHT = 608;
  const MIN_SECTION_SIZE = 80;
  const GRID_SIZE = 10;
  const SECTION_MARGIN = 10; // Margin between sections
  const CANVAS_MARGIN = 20; // Margin from canvas edges
  const EFFECTIVE_CANVAS_WIDTH = CANVAS_WIDTH - (CANVAS_MARGIN * 2);
  const EFFECTIVE_CANVAS_HEIGHT = CANVAS_HEIGHT - (CANVAS_MARGIN * 2);

  // Snap to grid function
  const snapToGrid = (value: number): number => {
    return Math.round(value / GRID_SIZE) * GRID_SIZE;
  };

  // Convert template sections to fixed pixel positions and sizes
  const convertToFixedLayout = (templateSections: CanvasSection[]): CanvasSection[] => {
    const cellWidth = Math.floor(EFFECTIVE_CANVAS_WIDTH / 6); // 6 columns within effective area
    const cellHeight = Math.floor(EFFECTIVE_CANVAS_HEIGHT / 6); // 6 rows within effective area

    // Calculate scaling factor based on content
    const scalingFactor = calculateScalingFactor(
      templateSections,
      CANVAS_WIDTH,
      CANVAS_HEIGHT,
      CANVAS_MARGIN
    );

    return templateSections.map(section => {
      // Calculate optimal size based on content
      const optimalSize = calculateOptimalSize(
        section.title,
        section.content,
        section.contentType
      );

      // Apply scaling factor if needed
      const scaledWidth = Math.round(optimalSize.width * scalingFactor);
      const scaledHeight = Math.round(optimalSize.height * scalingFactor);

      // Ensure minimum size and grid alignment
      const finalWidth = Math.max(MIN_SECTION_SIZE, snapToGrid(scaledWidth));
      const finalHeight = Math.max(MIN_SECTION_SIZE, snapToGrid(scaledHeight));

      // Use original grid position but with content-based sizing
      return {
      ...section,
      x: CANVAS_MARGIN + (section.x * cellWidth),
      y: CANVAS_MARGIN + (section.y * cellHeight),
      width: finalWidth,
      height: finalHeight
    };
    });
  };

  const [sections, setSections] = useState<CanvasSection[]>(() =>
    selectedTemplate ? convertToFixedLayout(selectedTemplate.sections) : []
  );
  
  const [canvasTitle, setCanvasTitle] = useState(
    selectedTemplate?.canvasTitle || 'Business Canvas'
  );
  
  const [canvasSubheadings, setCanvasSubheadings] = useState(
    selectedTemplate?.canvasSubheadings || []
  );
  
  
  const [currentTemplate, setCurrentTemplate] = useState<CanvasTemplate>(
    selectedTemplate ?? {
      id: 'default',
      name: 'Untitled Template',
      sections: [],
      canvasTitle: 'Business Canvas',
      canvasSubheadings: [],
    }
  );
  
  const handleSelectTemplate = (template: CanvasTemplate) => {
    setSelectedTemplate(template);
    setIsUploadModalOpen(true);
  };



  //------------------------------------------------------------------


  const API_BASE_URL = 'http://localhost:5000/api';

  const generateCanvasWithAI = async (uploadData: UploadData, dataType: string) => {
    try {
      let response;
  
      if (dataType === 'text' || dataType === 'json') {
        // For plain text or structured JSON
        response = await fetch(`${API_BASE_URL}/generate-canvas`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        });
      } else if (dataType === 'file') {
        // For file uploads
        const formData = new FormData();
        formData.append('file', uploadData.file); // File must be included in uploadData
  
        response = await fetch(`${API_BASE_URL}/upload`, {
          method: 'POST',
          body: formData,
        });
      } else {
        throw new Error(`Unsupported data type: ${dataType}`);
      }
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
  
      if (!result.success) {
        throw new Error(result.error || 'Failed to generate canvas');
      }
  
      return result.template;
    } catch (error) {
      console.error('AI generation failed:', error);
      throw error;
    }
  };
  


  const handleUpload = async (data: UploadData) => {
    console.log('Upload data:', data);
    console.log('Selected Template:', selectedTemplate);
    console.log('DATA TYPE =', data.type);
  
    setIsUploadModalOpen(false);
    setIsLoading(true); // Show spinner
  
    try {
      const aiGeneratedTemplate = await generateCanvasWithAI(data, data.type);
  
      const newTemplate = createCanvasFromJSON(aiGeneratedTemplate, selectedTemplate);
  
      setCanvasTitle(newTemplate.canvasTitle);
      setCanvasSubheadings(newTemplate.canvasSubheadings);
      setSections(convertToFixedLayout(newTemplate.sections));
      setCurrentTemplate(newTemplate);
      setSelectedTemplate(newTemplate);
    } catch (error) {
      console.error('Error generating canvas with AI. Falling back to selectedTemplate:', error);
  
      if (selectedTemplate) {
        setCanvasTitle(selectedTemplate.canvasTitle || 'Business Canvas');
        setCanvasSubheadings(selectedTemplate.canvasSubheadings || []);
        setSections(convertToFixedLayout(selectedTemplate.sections || []));
        setCurrentTemplate(selectedTemplate);
      } else {
        console.warn('selectedTemplate is null — cannot fallback to render.');
      }
    } finally {
      setIsLoading(false); // Hide spinner
      setAppState('canvas-editor');
    }
  };
  
  
  

  // const handleFillUsingAI = () => {
  //   setIsUploadModalOpen(false);
  //   setIsLoading(true); // Start loading
  
  //   setTimeout(() => {
    
  //     setAppState('canvas-editor');
  //     setIsLoading(false); // Stop loading
  //   }, 800); // Simulate some delay to show spinner (optional)
  // };

  const handleFillUsingAI = async () => {
    setIsUploadModalOpen(false);
    setIsLoading(true); // Start loading
  
    try {
      const token = 'eyJhbGciOiJIUzI1NiIsImtpZCI6IllPY3JSVlFyd0o5YVB2Vm0iLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FkenZhYmNkcWJqb2Vxa2FobXhuLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJmYzc2NDI4OC0yMjA4LTRlYTQtODZmOC1jZGRlYTZjOGUxNDUiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzU0Mjg2OTM0LCJpYXQiOjE3NTQyODMzMzQsImVtYWlsIjoic2Fuc2thcm5hcndhcmlhOTlAZ21haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJnb29nbGUiLCJwcm92aWRlcnMiOlsiZ29vZ2xlIl19LCJ1c2VyX21ldGFkYXRhIjp7ImF2YXRhcl91cmwiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMYXJ4NU4ya2NOX0JQMDZsWlc3dzhxRGZIM0N2aUhNQkl6R0xOcC1LNHZGQ093SWNVPXM5Ni1jIiwiZW1haWwiOiJzYW5za2FybmFyd2FyaWE5OUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZnVsbF9uYW1lIjoiU2Fuc2thciBOYXJ3YXJpYSIsImlzcyI6Imh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbSIsIm5hbWUiOiJTYW5za2FyIE5hcndhcmlhIiwicGhvbmVfdmVyaWZpZWQiOmZhbHNlLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jTGFyeDVOMmtjTl9CUDA2bFpXN3c4cURmSDNDdmlITUJJekdMTnAtSzR2RkNPd0ljVT1zOTYtYyIsInByb3ZpZGVyX2lkIjoiMTA0MTQ2MzI3NTMyODgzNDYxMTU2Iiwic3ViIjoiMTA0MTQ2MzI3NTMyODgzNDYxMTU2In0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoib2F1dGgiLCJ0aW1lc3RhbXAiOjE3NTM5Njg5MTN9XSwic2Vzc2lvbl9pZCI6ImE4ZDdmOWRjLWJjNzMtNDBiOS1hYTRhLWY0ODQyYTVmYzBiMSIsImlzX2Fub255bW91cyI6ZmFsc2V9.ojLl2UnOiyNqVLqiygEuGeNpzFvs7GmNK75vRFhsP4s'; 
  
      const response = await fetch('https://api.canbizai.com/api/business-ideas/summary/b2f76fb8-f3a4-4cae-a535-5a1b6e645fa2', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();

      console.log('API success:', data);

      const keysToRemove = ["description", "company_types", "id", "name"];
      const newObj = { ...data };
      keysToRemove.forEach(key => delete newObj[key]);

      const newTemplate = createCanvasFromJSON(newObj, selectedTemplate);
  
      setCanvasTitle(newTemplate.canvasTitle);
      setCanvasSubheadings(newTemplate.canvasSubheadings);
      setSections(convertToFixedLayout(newTemplate.sections));
      setCurrentTemplate(newTemplate);
      setSelectedTemplate(newTemplate);


      
      setAppState('canvas-editor');
    } catch (error) {
      console.error('Failed to Fill using AI:', error);

      if (selectedTemplate) {
        setCanvasTitle(selectedTemplate.canvasTitle || 'Business Canvas');
        setCanvasSubheadings(selectedTemplate.canvasSubheadings || []);
        setSections(convertToFixedLayout(selectedTemplate.sections || []));
        setCurrentTemplate(selectedTemplate);
      } else {
        console.warn('selectedTemplate is null — cannot fallback to render.');
      }
      
    } finally {
      setIsLoading(false); // Hide spinner
      setAppState('canvas-editor');
    }
  };

  const handleBack = () => {
    setAppState('template-selection');
    setSelectedTemplate(null);
    setIsUploadModalOpen(false);
  };

  return (
    <div className="min-h-screen">

      {isLoading && (
        <div className="fixed inset-0 z-50 bg-white bg-opacity-70 flex justify-center items-center">
          <div className="w-12 h-12 border-4 border-blue-700 border-t-transparent rounded-full animate-spin" />
          <span className="ml-4 text-blue-700 font-medium text-lg">Generating canvas...</span>
        </div>
      )}
      {appState === 'template-selection' && (
        <TemplateSelector
          templates={canvasTemplates}
          onSelectTemplate={handleSelectTemplate}
        />
      )}

      {appState === 'canvas-editor' && selectedTemplate && (
        <CanvasEditor
          template={selectedTemplate}
          onBack={handleBack}
        />
      )}

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
        onFillUsingAI={handleFillUsingAI}
      />
    </div>
  );
}

export default App;