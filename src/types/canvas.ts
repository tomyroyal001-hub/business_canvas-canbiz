export interface CanvasSection {
  id: string;
  title: string;
  content: string | string[];
  contentType: 'paragraph' | 'bullets';
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  borderStyle?: string;
}

export interface TemplateTheme {
  name: string;
  fonts: {
    title: string;
    heading: string;
    body: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    titleText: string;
    sectionTitle: string;
    sectionText: string;
  };
  canvasStyles: {
    borderRadius: string;
    borderWidth: string;
    borderStyle: string;
    shadow: string;
  };
  sectionStyles: {
    borderRadius: string;
    borderWidth: string;
    borderStyle: string;
    shadow: string;
  };
  sectionColors: string[];
}

export interface CanvasTemplate {
  id: string;
  name: string;
  description: string;
  sections: CanvasSection[];
  gridCols: number;
  gridRows: number;
  canvasTitle?: string;
  canvasSubheadings?: string[];
  theme: TemplateTheme;
}

export interface UploadData {
  type: 'file' | 'text' | 'json';
  content?: string;        // Optional for file uploads
  fileName?: string;
  file?: File;             // Optional for file uploads
}

export interface GridLayout {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
}