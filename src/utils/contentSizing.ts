// Utility functions for calculating optimal section sizes based on content

export interface ContentDimensions {
  width: number;
  height: number;
}

export interface SectionContentMetrics {
  lineCount: number;
  maxLineLength: number;
  hasLongWords: boolean;
  contentType: 'paragraph' | 'bullets';
}

// Constants for sizing calculations
const CHAR_WIDTH = 8; // Average character width in pixels
const LINE_HEIGHT = 20; // Line height in pixels
const PADDING = 32; // Total padding (16px on each side)
const TITLE_HEIGHT = 32; // Height for section title
const BULLET_INDENT = 24; // Extra width for bullet points
const MIN_SECTION_WIDTH = 180;
const MAX_SECTION_WIDTH = 400;
const MIN_SECTION_HEIGHT = 120;
const MAX_SECTION_HEIGHT = 300;

/**
 * Analyzes the content of a section to determine its characteristics
 */
export function analyzeContent(content: string | string[], contentType: 'paragraph' | 'bullets'): SectionContentMetrics {
  const contentArray = Array.isArray(content) ? content : [content];
  const allText = contentArray.join(' ');
  
  let lineCount = 0;
  let maxLineLength = 0;
  let hasLongWords = false;

  if (contentType === 'paragraph') {
    // For paragraphs, estimate line breaks based on content length and width
    const words = allText.split(' ');
    let currentLineLength = 0;
    lineCount = 1;

    for (const word of words) {
      if (word.length > 15) {
        hasLongWords = true;
      }
      
      const wordLength = word.length + 1; // +1 for space
      
      if (currentLineLength + wordLength > 50) { // Assume ~50 chars per line
        lineCount++;
        maxLineLength = Math.max(maxLineLength, currentLineLength);
        currentLineLength = wordLength;
      } else {
        currentLineLength += wordLength;
      }
    }
    maxLineLength = Math.max(maxLineLength, currentLineLength);
  } else {
    // For bullets, each item is typically a line
    lineCount = contentArray.length;
    maxLineLength = Math.max(...contentArray.map(item => item.length));
    hasLongWords = contentArray.some(item => 
      item.split(' ').some(word => word.length > 15)
    );
  }

  return {
    lineCount,
    maxLineLength,
    hasLongWords,
    contentType
  };
}

/**
 * Calculates optimal dimensions for a section based on its content
 */
export function calculateOptimalSize(
  title: string,
  content: string | string[],
  contentType: 'paragraph' | 'bullets'
): ContentDimensions {
  const metrics = analyzeContent(content, contentType);
  
  // Calculate width based on content
  let optimalWidth = Math.max(
    title.length * CHAR_WIDTH, // Title width
    metrics.maxLineLength * CHAR_WIDTH // Content width
  );

  // Add extra width for bullets
  if (contentType === 'bullets') {
    optimalWidth += BULLET_INDENT;
  }

  // Add padding and constrain to limits
  optimalWidth = Math.max(
    MIN_SECTION_WIDTH,
    Math.min(MAX_SECTION_WIDTH, optimalWidth + PADDING)
  );

  // Calculate height based on content
  let optimalHeight = TITLE_HEIGHT + (metrics.lineCount * LINE_HEIGHT) + PADDING;

  // Add extra height for long content that might wrap
  if (metrics.hasLongWords || metrics.maxLineLength > 40) {
    optimalHeight += LINE_HEIGHT; // Add one extra line for wrapping
  }

  // Constrain height to limits
  optimalHeight = Math.max(
    MIN_SECTION_HEIGHT,
    Math.min(MAX_SECTION_HEIGHT, optimalHeight)
  );

  return {
    width: Math.round(optimalWidth / 10) * 10, // Snap to 10px grid
    height: Math.round(optimalHeight / 10) * 10
  };
}

/**
 * Calculates the total content area needed for all sections
 */
export function calculateTotalContentArea(sections: Array<{
  title: string;
  content: string | string[];
  contentType: 'paragraph' | 'bullets';
}>): number {
  return sections.reduce((total, section) => {
    const dimensions = calculateOptimalSize(section.title, section.content, section.contentType);
    return total + (dimensions.width * dimensions.height);
  }, 0);
}

/**
 * Determines if sections need to be scaled down to fit in canvas
 */
export function calculateScalingFactor(
  sections: Array<{
    title: string;
    content: string | string[];
    contentType: 'paragraph' | 'bullets';
  }>,
  canvasWidth: number,
  canvasHeight: number,
  margin: number
): number {
  const availableArea = (canvasWidth - margin * 2) * (canvasHeight - margin * 2);
  const totalContentArea = calculateTotalContentArea(sections);
  
  if (totalContentArea > availableArea * 0.8) { // Use 80% of available area
    return Math.sqrt((availableArea * 0.8) / totalContentArea);
  }
  
  return 1; // No scaling needed
}