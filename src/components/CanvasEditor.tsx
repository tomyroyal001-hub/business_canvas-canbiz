import React, { useState, useMemo, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowLeft, Upload, Edit3, AlertTriangle } from 'lucide-react';
import { CanvasTemplate, CanvasSection } from '../types/canvas';
import { PreviewSection } from './PreviewSection';
import { SectionEditor } from './SectionEditor';
import { CanvasTitleEditor } from './CanvasTitleEditor';
import { generatePDF } from '../utils/pdfGenerator';
import { createCanvasFromJSON } from '../data/templates';
import { calculateOptimalSize, calculateScalingFactor } from '../utils/contentSizing';

interface CanvasEditorProps {
  template: CanvasTemplate;
  onBack: () => void;
}

interface DragState {
  isDragging: boolean;
  dragId: string | null;
  startX: number;
  startY: number;
  startCardX: number;
  startCardY: number;
}

interface ResizeState {
  isResizing: boolean;
  resizeId: string | null;
  resizeHandle: string | null;
  startX: number;
  startY: number;
  startWidth: number;
  startHeight: number;
  startSectionX: number;
  startSectionY: number;
}

interface EmptySpace {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const CanvasEditor: React.FC<CanvasEditorProps> = ({ template, onBack }) => {
  // Fixed canvas dimensions - perfect for landscape PDF
  const CANVAS_WIDTH = 1300;
  const CANVAS_HEIGHT = 608;
  const MIN_SECTION_SIZE = 80;
  const GRID_SIZE = 10;
  const SECTION_MARGIN = 10; // Margin between sections
  const CANVAS_MARGIN = 20; // Margin from canvas edges
  const EFFECTIVE_CANVAS_WIDTH = CANVAS_WIDTH - (CANVAS_MARGIN * 2);
  const EFFECTIVE_CANVAS_HEIGHT = CANVAS_HEIGHT - (CANVAS_MARGIN * 2);

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

  const [sections, setSections] = useState<CanvasSection[]>(() => convertToFixedLayout(template.sections));
  const [canvasTitle, setCanvasTitle] = useState(template.canvasTitle || 'Business Canvas');
  const [canvasSubheadings, setCanvasSubheadings] = useState(template.canvasSubheadings || []);
  const [jsonInput, setJsonInput] = useState('');
  const [showJsonInput, setShowJsonInput] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<CanvasTemplate>(template);
  const [showSpaceWarning, setShowSpaceWarning] = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);

  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    dragId: null,
    startX: 0,
    startY: 0,
    startCardX: 0,
    startCardY: 0
  });

  const [resizeState, setResizeState] = useState<ResizeState>({
    isResizing: false,
    resizeId: null,
    resizeHandle: null,
    startX: 0,
    startY: 0,
    startWidth: 0,
    startHeight: 0,
    startSectionX: 0,
    startSectionY: 0
  });

  const snapToGrid = (value: number): number => {
    return Math.round(value / GRID_SIZE) * GRID_SIZE;
  };

  const getCanvasRect = (): DOMRect => {
    return canvasRef.current?.getBoundingClientRect() || new DOMRect();
  };

  // Fixed collision detection - only add margin once, not to both sections
  const checkCollision = (section1: CanvasSection, section2: CanvasSection): boolean => {
    // Check if sections overlap with section margin between them
    return !(section1.x + section1.width + SECTION_MARGIN <= section2.x ||
      section2.x + section2.width + SECTION_MARGIN <= section1.x ||
      section1.y + section1.height + SECTION_MARGIN <= section2.y ||
      section2.y + section2.height + SECTION_MARGIN <= section1.y);
  };

  const isValidPosition = (testSection: CanvasSection, excludeId?: string): boolean => {
    // Check canvas boundaries with proper margins
    if (testSection.x < CANVAS_MARGIN ||
      testSection.y < CANVAS_MARGIN ||
      testSection.x + testSection.width > CANVAS_WIDTH - CANVAS_MARGIN ||
      testSection.y + testSection.height > CANVAS_HEIGHT - CANVAS_MARGIN) {
      return false;
    }

    // Check collisions with other sections (margin is built into collision detection)
    return !sections.some(section =>
      section.id !== excludeId &&
      section.id !== testSection.id &&
      checkCollision(testSection, section)
    );
  };

  // Enhanced empty space detection algorithm - FIXED VERSION
  const findEmptySpaces = (): EmptySpace[] => {
    const emptySpaces: EmptySpace[] = [];
    const step = GRID_SIZE;

    // Create a grid to track occupied areas
    const gridWidth = Math.ceil(CANVAS_WIDTH / step);
    const gridHeight = Math.ceil(CANVAS_HEIGHT / step);
    const occupiedGrid = Array(gridHeight).fill(null).map(() => Array(gridWidth).fill(false));

    // Mark occupied areas (including margins) - FIXED: Correct x/y mapping
    sections.forEach(section => {
      const startX = Math.floor(section.x / step);
      const endX = Math.ceil((section.x + section.width + SECTION_MARGIN) / step);
      const startY = Math.floor(section.y / step);
      const endY = Math.ceil((section.y + section.height + SECTION_MARGIN) / step);

      // FIXED: Correct loop bounds - y for rows, x for columns
      for (let y = Math.max(0, startY); y < Math.min(gridHeight, endY); y++) {
        for (let x = Math.max(0, startX); x < Math.min(gridWidth, endX); x++) {
          occupiedGrid[y][x] = true;
        }
      }
    });

    // Find rectangular empty spaces
    const processedGrid = Array(gridHeight).fill(null).map(() => Array(gridWidth).fill(false));

    for (let y = 0; y < gridHeight; y++) {
      for (let x = 0; x < gridWidth; x++) {
        if (!occupiedGrid[y][x] && !processedGrid[y][x]) {
          // Found an empty cell, try to expand it into a rectangle
          let maxWidth = 0;
          let maxHeight = 0;

          // Find maximum width from this point
          for (let w = x; w < gridWidth && !occupiedGrid[y][w]; w++) {
            maxWidth++;
          }

          // Find maximum height that maintains the width
          for (let h = y; h < gridHeight; h++) {
            let canExtendHeight = true;
            for (let w = x; w < x + maxWidth; w++) {
              if (occupiedGrid[h][w]) {
                canExtendHeight = false;
                break;
              }
            }
            if (canExtendHeight) {
              maxHeight++;
            } else {
              break;
            }
          }

          const spaceX = x * step;
          const spaceY = y * step;
          const spaceWidth = maxWidth * step;
          const spaceHeight = maxHeight * step;

          // Only consider spaces that can fit minimum section size
          if (spaceWidth >= MIN_SECTION_SIZE && spaceHeight >= MIN_SECTION_SIZE) {
            emptySpaces.push({
              x: spaceX,
              y: spaceY,
              width: Math.min(spaceWidth, CANVAS_WIDTH - spaceX),
              height: Math.min(spaceHeight, CANVAS_HEIGHT - spaceY)
            });
          }

          // Mark this area as processed to avoid duplicate spaces
          for (let h = y; h < y + maxHeight && h < gridHeight; h++) {
            for (let w = x; w < x + maxWidth && w < gridWidth; w++) {
              processedGrid[h][w] = true;
            }
          }
        }
      }
    }

    // Sort by area (largest first) and then by position (top-left first)
    return emptySpaces.sort((a, b) => {
      const areaA = a.width * a.height;
      const areaB = b.width * b.height;
      if (areaA !== areaB) return areaB - areaA;
      if (a.y !== b.y) return a.y - b.y;
      return a.x - b.x;
    });
  };

  // Find the best empty space for a new section
  const findBestEmptySpace = (preferredWidth: number = 200, preferredHeight: number = 150): EmptySpace | null => {
    const emptySpaces = findEmptySpaces();

    if (emptySpaces.length === 0) {
      return null;
    }

    // Try to find a space that can accommodate the preferred size
    const idealSpace = emptySpaces.find(space =>
      space.width >= preferredWidth &&
      space.height >= preferredHeight &&
      space.x + preferredWidth <= CANVAS_WIDTH &&
      space.y + preferredHeight <= CANVAS_HEIGHT
    );

    if (idealSpace) {
      return idealSpace;
    }

    // If no ideal space, return the largest available space that fits in canvas
    const validSpaces = emptySpaces.filter(space =>
      space.x + MIN_SECTION_SIZE <= CANVAS_WIDTH &&
      space.y + MIN_SECTION_SIZE <= CANVAS_HEIGHT
    );

    return validSpaces.length > 0 ? validSpaces[0] : null;
  };

  // Get available space at a specific position considering margins
  const getAvailableSpace = (section: CanvasSection, x: number, y: number): { width: number; height: number } => {
    let maxWidth = Math.max(MIN_SECTION_SIZE, CANVAS_WIDTH - CANVAS_MARGIN - x);
    let maxHeight = Math.max(MIN_SECTION_SIZE, CANVAS_HEIGHT - CANVAS_MARGIN - y);

    // Check for obstacles to the right
    for (let testWidth = MIN_SECTION_SIZE; testWidth <= maxWidth; testWidth += GRID_SIZE) {
      const testSection = { ...section, x, y, width: testWidth, height: MIN_SECTION_SIZE };
      if (!isValidPosition(testSection, section.id)) {
        maxWidth = testWidth - GRID_SIZE;
        break;
      }
    }

    // Check for obstacles below
    for (let testHeight = MIN_SECTION_SIZE; testHeight <= maxHeight; testHeight += GRID_SIZE) {
      const testSection = { ...section, x, y, width: Math.max(MIN_SECTION_SIZE, maxWidth), height: testHeight };
      if (!isValidPosition(testSection, section.id)) {
        maxHeight = testHeight - GRID_SIZE;
        break;
      }
    }

    return {
      width: Math.max(MIN_SECTION_SIZE, maxWidth),
      height: Math.max(MIN_SECTION_SIZE, maxHeight)
    };
  };

  // Enhanced auto-resize logic that prioritizes fitting into available space
  const findOptimalSize = (section: CanvasSection): { width: number; height: number } => {
    const { x, y } = section;

    // First, get the maximum available space at this position
    const availableSpace = getAvailableSpace(section, x, y);

    // If the current size fits within available space, try to expand
    if (section.width <= availableSpace.width && section.height <= availableSpace.height) {
      // Try to expand to fill available space, but don't go smaller than current size
      const expandedWidth = Math.max(section.width, availableSpace.width);
      const expandedHeight = Math.max(section.height, availableSpace.height);

      // Verify the expanded size actually fits
      const testSection = { ...section, width: expandedWidth, height: expandedHeight };
      if (isValidPosition(testSection, section.id)) {
        return { width: expandedWidth, height: expandedHeight };
      }
    }

    // If current size doesn't fit, we need to shrink to fit available space
    let optimalWidth = Math.min(section.width, availableSpace.width);
    let optimalHeight = Math.min(section.height, availableSpace.height);

    // Ensure we don't go below minimum size
    optimalWidth = Math.max(MIN_SECTION_SIZE, optimalWidth);
    optimalHeight = Math.max(MIN_SECTION_SIZE, optimalHeight);

    // Snap to grid
    optimalWidth = snapToGrid(optimalWidth);
    optimalHeight = snapToGrid(optimalHeight);

    // Final validation - if even the minimum size doesn't fit, try to find the largest possible size
    const testSection = { ...section, width: optimalWidth, height: optimalHeight };
    if (!isValidPosition(testSection, section.id)) {
      // Try progressively smaller sizes
      for (let w = optimalWidth; w >= MIN_SECTION_SIZE; w -= GRID_SIZE) {
        for (let h = optimalHeight; h >= MIN_SECTION_SIZE; h -= GRID_SIZE) {
          const smallerTest = { ...section, width: w, height: h };
          if (isValidPosition(smallerTest, section.id)) {
            return { width: w, height: h };
          }
        }
      }

      // If nothing fits, return minimum size (this shouldn't happen with proper positioning)
      return { width: MIN_SECTION_SIZE, height: MIN_SECTION_SIZE };
    }

    return { width: optimalWidth, height: optimalHeight };
  };

  // Enhanced position finding that considers size constraints and margins
  const findValidPositionAndSize = (section: CanvasSection, preferredX: number, preferredY: number): { x: number; y: number; width: number; height: number } => {
    // First try the preferred position with optimal sizing
    const snappedX = snapToGrid(Math.max(CANVAS_MARGIN, Math.min(preferredX, CANVAS_WIDTH - CANVAS_MARGIN - MIN_SECTION_SIZE)));
    const snappedY = snapToGrid(Math.max(CANVAS_MARGIN, Math.min(preferredY, CANVAS_HEIGHT - CANVAS_MARGIN - MIN_SECTION_SIZE)));

    const testSection = { ...section, x: snappedX, y: snappedY };
    const optimalSize = findOptimalSize(testSection);
    const finalTest = { ...testSection, ...optimalSize };

    if (isValidPosition(finalTest, section.id)) {
      return { x: snappedX, y: snappedY, ...optimalSize };
    }

    // If preferred position doesn't work, search for alternative positions
    const searchRadius = 400;
    const step = GRID_SIZE;

    for (let radius = step; radius <= searchRadius; radius += step) {
      for (let dx = -radius; dx <= radius; dx += step) {
        for (let dy = -radius; dy <= radius; dy += step) {
          if (Math.abs(dx) === radius || Math.abs(dy) === radius) {
            const testX = snapToGrid(Math.max(CANVAS_MARGIN, Math.min(preferredX + dx, CANVAS_WIDTH - CANVAS_MARGIN - MIN_SECTION_SIZE)));
            const testY = snapToGrid(Math.max(CANVAS_MARGIN, Math.min(preferredY + dy, CANVAS_HEIGHT - CANVAS_MARGIN - MIN_SECTION_SIZE)));

            if (testX >= CANVAS_MARGIN && testY >= CANVAS_MARGIN &&
              testX + MIN_SECTION_SIZE <= CANVAS_WIDTH - CANVAS_MARGIN &&
              testY + MIN_SECTION_SIZE <= CANVAS_HEIGHT - CANVAS_MARGIN) {
              const posTest = { ...section, x: testX, y: testY };
              const posOptimalSize = findOptimalSize(posTest);
              const posFinalTest = { ...posTest, ...posOptimalSize };

              if (isValidPosition(posFinalTest, section.id)) {
                return { x: testX, y: testY, ...posOptimalSize };
              }
            }
          }
        }
      }
    }

    // Last resort: find any available position
    for (let y = CANVAS_MARGIN; y <= CANVAS_HEIGHT - CANVAS_MARGIN - MIN_SECTION_SIZE; y += step) {
      for (let x = CANVAS_MARGIN; x <= CANVAS_WIDTH - CANVAS_MARGIN - MIN_SECTION_SIZE; x += step) {
        const lastTest = { ...section, x, y };
        const lastOptimalSize = findOptimalSize(lastTest);
        const lastFinalTest = { ...lastTest, ...lastOptimalSize };

        if (isValidPosition(lastFinalTest, section.id)) {
          return { x, y, ...lastOptimalSize };
        }
      }
    }

    // Absolute fallback
    return {
      x: Math.max(CANVAS_MARGIN, Math.min(section.x, CANVAS_WIDTH - CANVAS_MARGIN - MIN_SECTION_SIZE)),
      y: Math.max(CANVAS_MARGIN, Math.min(section.y, CANVAS_HEIGHT - CANVAS_MARGIN - MIN_SECTION_SIZE)),
      width: MIN_SECTION_SIZE,
      height: MIN_SECTION_SIZE
    };
  };

  const handleMouseDown = useCallback((e: React.MouseEvent, sectionId: string, action: 'drag' | 'resize', handle?: string) => {
    e.preventDefault();
    const canvasRect = getCanvasRect();
    const mouseX = e.clientX - canvasRect.left;
    const mouseY = e.clientY - canvasRect.top;

    if (action === 'drag') {
      const section = sections.find(s => s.id === sectionId);
      if (!section) return;

      setDragState({
        isDragging: true,
        dragId: sectionId,
        startX: mouseX,
        startY: mouseY,
        startCardX: section.x,
        startCardY: section.y
      });
    } else if (action === 'resize') {
      const section = sections.find(s => s.id === sectionId);
      if (!section) return;

      setResizeState({
        isResizing: true,
        resizeId: sectionId,
        resizeHandle: handle || 'se',
        startX: mouseX,
        startY: mouseY,
        startWidth: section.width,
        startHeight: section.height,
        startSectionX: section.x,
        startSectionY: section.y
      });
    }
  }, [sections]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const canvasRect = getCanvasRect();
    const mouseX = e.clientX - canvasRect.left;
    const mouseY = e.clientY - canvasRect.top;

    if (dragState.isDragging && dragState.dragId) {
      const deltaX = mouseX - dragState.startX;
      const deltaY = mouseY - dragState.startY;

      let newX = snapToGrid(dragState.startCardX + deltaX);
      let newY = snapToGrid(dragState.startCardY + deltaY);

      // Get the section being dragged to check its dimensions
      const draggedSection = sections.find(s => s.id === dragState.dragId);
      if (draggedSection) {
        // Ensure the section stays within canvas boundaries
        newX = Math.max(CANVAS_MARGIN, Math.min(newX, CANVAS_WIDTH - CANVAS_MARGIN - draggedSection.width));
        newY = Math.max(CANVAS_MARGIN, Math.min(newY, CANVAS_HEIGHT - CANVAS_MARGIN - draggedSection.height));
      }

      setSections(prev => prev.map(section =>
        section.id === dragState.dragId
          ? { ...section, x: newX, y: newY }
          : section
      ));
    }

    if (resizeState.isResizing && resizeState.resizeId) {
      const deltaX = mouseX - resizeState.startX;
      const deltaY = mouseY - resizeState.startY;

      let newWidth = resizeState.startWidth;
      let newHeight = resizeState.startHeight;
      let newX = resizeState.startSectionX;
      let newY = resizeState.startSectionY;

      // Handle different resize directions
      const handle = resizeState.resizeHandle;

      // Height changes
      if (handle.includes('s')) {
        const maxHeight = CANVAS_HEIGHT - CANVAS_MARGIN - resizeState.startSectionY;
        newHeight = Math.max(MIN_SECTION_SIZE, Math.min(maxHeight, resizeState.startHeight + deltaY));
      }
      if (handle.includes('n')) {
        newHeight = Math.max(MIN_SECTION_SIZE, resizeState.startHeight - deltaY);
        newY = resizeState.startSectionY + (resizeState.startHeight - newHeight);
        // Ensure we don't go beyond canvas boundaries when resizing from north
        const minY = Math.max(CANVAS_MARGIN, resizeState.startSectionY + resizeState.startHeight - newHeight);
        newY = Math.max(minY, newY);
      }

      // Width changes
      if (handle.includes('e')) {
        const maxWidth = CANVAS_WIDTH - CANVAS_MARGIN - resizeState.startSectionX;
        newWidth = Math.max(MIN_SECTION_SIZE, Math.min(maxWidth, resizeState.startWidth + deltaX));
      }
      if (handle.includes('w')) {
        newWidth = Math.max(MIN_SECTION_SIZE, resizeState.startWidth - deltaX);
        newX = resizeState.startSectionX + (resizeState.startWidth - newWidth);
        // Ensure we don't go beyond canvas boundaries when resizing from west
        const minX = Math.max(CANVAS_MARGIN, resizeState.startSectionX + resizeState.startWidth - newWidth);
        newX = Math.max(minX, newX);
      }

      setSections(prev => prev.map(section => {
        if (section.id === resizeState.resizeId) {
          const testSection = {
            ...section,
            x: snapToGrid(newX),
            y: snapToGrid(newY),
            width: snapToGrid(newWidth),
            height: snapToGrid(newHeight)
          };

          // Only update if the new size doesn't cause collisions and stays in bounds
          if (isValidPosition(testSection, section.id)) {
            return testSection;
          }
        }
        return section;
      }));
    }
  }, [dragState, resizeState, sections]);

  const handleMouseUp = useCallback(() => {
    if (dragState.isDragging && dragState.dragId) {
      setSections(prev => prev.map(section => {
        if (section.id === dragState.dragId) {
          // Find valid position and optimal size for the dropped section
          const result = findValidPositionAndSize(section, section.x, section.y);
          return { ...section, ...result };
        }
        return section;
      }));
    }

    setDragState({
      isDragging: false,
      dragId: null,
      startX: 0,
      startY: 0,
      startCardX: 0,
      startCardY: 0
    });

    setResizeState({
      isResizing: false,
      resizeId: null,
      resizeHandle: null,
      startX: 0,
      startY: 0,
      startWidth: 0,
      startHeight: 0,
      startSectionX: 0,
      startSectionY: 0
    });
  }, [dragState, sections]);

  const updateSection = useCallback((sectionId: string, updates: Partial<CanvasSection>) => {
    setSections(prevSections => {
      const newSections = prevSections.map(section =>
        section.id === sectionId ? { ...section, ...updates } : section
      );
      return newSections;
    });
  }, []);

  const deleteSection = useCallback((sectionId: string) => {
    setSections(prevSections => {
      const newSections = prevSections.filter(section => section.id !== sectionId);
      return newSections;
    });
  }, []);

  const addNewSection = useCallback(() => {
    // Hide any existing warning
    setShowSpaceWarning(false);

    // Calculate optimal size for new section with default content
    const defaultContent = ['Add your content here...'];
    const optimalSize = calculateOptimalSize('New Section', defaultContent, 'bullets');

    // Find the best empty space
    const bestSpace = findBestEmptySpace(optimalSize.width, optimalSize.height);

    if (!bestSpace) {
      // No empty space available
      setShowSpaceWarning(true);
      setTimeout(() => setShowSpaceWarning(false), 5000); // Hide warning after 5 seconds
      return;
    }

    // Use the best available space, but ensure consistent sizing with original sections
    const newX = Math.max(CANVAS_MARGIN, Math.min(bestSpace.x, CANVAS_WIDTH - CANVAS_MARGIN - optimalSize.width));
    const newY = Math.max(CANVAS_MARGIN, Math.min(bestSpace.y, CANVAS_HEIGHT - CANVAS_MARGIN - optimalSize.height));
    // Make new sections fit the available space but maintain consistent margins
    const newWidth = Math.min(optimalSize.width, bestSpace.width, CANVAS_WIDTH - CANVAS_MARGIN - newX);
    const newHeight = Math.min(optimalSize.height, bestSpace.height, CANVAS_HEIGHT - CANVAS_MARGIN - newY);

    const theme = currentTemplate.theme;
    const sectionIndex = sections.length;
    const colorIndex = sectionIndex % theme.sectionColors.length;

    const newSection: CanvasSection = {
      id: `section-${Date.now()}`,
      title: 'New Section',
      content: defaultContent,
      contentType: 'bullets',
      x: newX,
      y: newY,
      width: newWidth,
      height: newHeight,
      color: theme.sectionColors[colorIndex],
    };

    setSections(prevSections => [...prevSections, newSection]);
  }, [sections, currentTemplate.theme, CANVAS_MARGIN, CANVAS_WIDTH, CANVAS_HEIGHT]);

  const handleJsonImport = useCallback(() => {
    try {
      const jsonData = JSON.parse(jsonInput);
      const newTemplate = createCanvasFromJSON(jsonData, currentTemplate);
      setCanvasTitle(newTemplate.canvasTitle);
      setCanvasSubheadings(newTemplate.canvasSubheadings);
      setSections(convertToFixedLayout(newTemplate.sections));
      setCurrentTemplate(newTemplate);
      setJsonInput('');
      setShowJsonInput(false);
    } catch (error) {
      alert('Invalid JSON format. Please check your input and try again.');
    }
  }, [jsonInput, currentTemplate]);

  const downloadPDF = async () => {
    // const canvasElement = document.getElementById('canvas-preview');
    const canvasElement = document.getElementById('canvas-container');
    if (canvasElement) {
      await generatePDF(canvasElement, `${canvasTitle.replace(/\s+/g, '-').toLowerCase()}-canvas.pdf`);
    }
  };

  // Calculate canvas utilization for display
  const canvasUtilization = useMemo(() => {
    const totalCanvasArea = CANVAS_WIDTH * CANVAS_HEIGHT;
    const occupiedArea = sections.reduce((total, section) => {
      return total + (section.width * section.height);
    }, 0);
    return Math.round((occupiedArea / totalCanvasArea) * 100);
  }, [sections]);

  const theme = currentTemplate.theme;

  // Render resize handles for all directions
  const renderResizeHandles = (sectionId: string) => {
    const handles = [
      { position: 'nw', cursor: 'nw-resize', style: { top: -4, left: -4 } },
      { position: 'n', cursor: 'n-resize', style: { top: -4, left: '50%', transform: 'translateX(-50%)' } },
      { position: 'ne', cursor: 'ne-resize', style: { top: -4, right: -4 } },
      { position: 'e', cursor: 'e-resize', style: { top: '50%', right: -4, transform: 'translateY(-50%)' } },
      { position: 'se', cursor: 'se-resize', style: { bottom: -4, right: -4 } },
      { position: 's', cursor: 's-resize', style: { bottom: -4, left: '50%', transform: 'translateX(-50%)' } },
      { position: 'sw', cursor: 'sw-resize', style: { bottom: -4, left: -4 } },
      { position: 'w', cursor: 'w-resize', style: { top: '50%', left: -4, transform: 'translateY(-50%)' } }
    ];

    return handles.map(handle => (
      <div
        key={handle.position}
        className="absolute w-2 h-2 bg-blue-600 border border-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-sm"
        style={{
          ...handle.style,
          cursor: handle.cursor,
          zIndex: 20
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          handleMouseDown(e, sectionId, 'resize', handle.position);
        }}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="w-full px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8 max-w-7xl mx-auto"
        >
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-3 hover:bg-white rounded-xl transition-colors shadow-sm border border-gray-200"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 font-sans">
                {template.name}
              </h1>
              <p className="text-gray-600 mt-1 font-sans">{template.description}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* <button
              onClick={() => setShowJsonInput(!showJsonInput)}
              className="px-4 py-2 bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-xl transition-colors font-medium"
            >
              <Upload size={16} className="inline mr-2" />
              Import JSON
            </button> */}

            <button
              onClick={downloadPDF}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-medium shadow-lg"
            >
              <Download size={16} className="inline mr-2" />
              Download PDF
            </button>
          </div>
        </motion.div>

        {/* Space Warning */}
        {showSpaceWarning && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl max-w-7xl mx-auto"
          >
            <div className="flex items-center space-x-3">
              <AlertTriangle size={24} className="text-red-600 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-red-800 font-sans">No Empty Space Available</h3>
                <p className="text-red-700 font-sans">
                  Cannot create a new section because there's no empty space on the canvas.
                  Try deleting or resizing existing sections to make room.
                </p>
                <p className="text-sm text-red-600 mt-1 font-sans">
                  Canvas utilization: {canvasUtilization}% • {sections.length} sections
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* JSON Input Modal */}
        {showJsonInput && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-200 max-w-7xl mx-auto"
          >
            <h3 className="text-lg font-semibold mb-4 font-sans">Import JSON Data</h3>
            <p className="text-sm text-gray-600 mb-4 font-sans">
              Paste your JSON data below. The canvas will intelligently map your data to the template structure.
            </p>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder='{"Key Partners": ["Partner 1", "Partner 2"], "Value Proposition": "Your value proposition text", "Revenue Streams": ["Stream 1", "Stream 2"], "Additional Section": "This will be added as a new section"}'
              className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-mono font-sans"
            />
            <div className="flex space-x-3 mt-4">
              <button
                onClick={handleJsonImport}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Import Data
              </button>
              <button
                onClick={() => setShowJsonInput(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {/* Two Panel Layout */}
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-180px)] max-w-none">

          {/* Left Panel - Section Editor */}
          <motion.div
            className="col-span-3 bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Edit3 size={20} className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 font-sans">Editor</h2>
                  <p className="text-sm text-gray-600 font-sans">
                    Manage canvas content • {canvasUtilization}% used
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto p-4 flex flex-col">
              <div className="mb-6">
                <CanvasTitleEditor
                  title={canvasTitle}
                  subheadings={canvasSubheadings}
                  onTitleChange={setCanvasTitle}
                  onSubheadingsChange={setCanvasSubheadings}
                  theme={theme}
                />
              </div>

              <SectionEditor
                sections={sections}
                onUpdateSection={updateSection}
                onDeleteSection={deleteSection}
                theme={theme}
              />
            </div>
          </motion.div>

          {/* Right Panel - Fixed Canvas */}
          <motion.div
            id="canvas-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`col-span-9 ${theme.colors.background} ${theme.canvasStyles.borderRadius} p-6 ${theme.canvasStyles.borderWidth} ${theme.canvasStyles.borderStyle} relative overflow-hidden`}
          >
            <div
              id="canvas-preview"
              className="relative mx-auto"
            >
              {/* Canvas Title and Subheadings */}
              <div className="mb-4 text-center">
                <h1 className={`text-3xl font-bold mb-3 ${theme.colors.titleText} ${theme.fonts.title}`}>
                  {canvasTitle}
                </h1>
                {canvasSubheadings.length > 0 && (
                  <div className="space-y-0.5">
                    {canvasSubheadings.map((subheading, index) => (
                      <h2 key={index} className={`text-base font-semibold ${theme.colors.secondary} ${theme.fonts.heading}`}>
                        {subheading}
                      </h2>
                    ))}
                  </div>
                )}
              </div>

              {/* Fixed Canvas Area */}
              <div
                ref={canvasRef}
                className={`relative overflow-hidden mx-auto`}
                style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                {/* Grid pattern */}
                <div
                  className="absolute"
                  style={{
                    backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`
                  }}
                />

                {sections.map(section => (
                  <div
                    key={section.id}
                    className="absolute transition-all duration-200 hover:shadow-lg group"
                    style={{
                      left: section.x,
                      top: section.y,
                      width: section.width,
                      height: section.height,
                      cursor: dragState.isDragging && dragState.dragId === section.id ? 'grabbing' : 'grab',
                      zIndex: dragState.dragId === section.id ? 10 : 1,
                      transform: dragState.dragId === section.id ? 'scale(1.02)' : 'scale(1)',
                      opacity: dragState.isDragging && dragState.dragId === section.id ? 0.8 : 1
                    }}
                    onMouseDown={(e) => handleMouseDown(e, section.id, 'drag')}
                  >
                    <PreviewSection section={section} theme={theme} />

                    {/* Multi-directional resize handles */}
                    {renderResizeHandles(section.id)}
                  </div>
                ))}

                {/* Show collision areas while dragging - now shows the exact margin zones */}
                {dragState.isDragging && (
                  <div className="absolute inset-0 pointer-events-none">
                    {sections
                      .filter(section => section.id !== dragState.dragId)
                      .map(section => (
                        <div
                          key={`overlay-${section.id}`}
                          className="absolute bg-red-200 opacity-30 border-2 border-red-400 rounded-lg"
                          style={{
                            left: section.x - SECTION_MARGIN,
                            top: section.y - SECTION_MARGIN,
                            width: section.width + (SECTION_MARGIN * 2),
                            height: section.height + (SECTION_MARGIN * 2)
                          }}
                        />
                      ))}
                  </div>
                )}

                {/* Canvas boundary indicators */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Top margin */}
                  <div
                    className="absolute top-0 left-0 right-0 opacity-20"
                    style={{ height: CANVAS_MARGIN }}
                  />

                  {/* Bottom margin */}
                  <div
                    className="absolute bottom-0 left-0 right-0 opacity-20"
                    style={{ height: CANVAS_MARGIN }}
                  />

                  {/* Left margin */}
                  <div
                    className="absolute top-0 bottom-0 left-0 opacity-20"
                    style={{ width: CANVAS_MARGIN }}
                  />

                  {/* Right margin */}
                  <div
                    className="absolute top-0 bottom-0 right-0 opacity-20"
                    style={{ width: CANVAS_MARGIN }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};