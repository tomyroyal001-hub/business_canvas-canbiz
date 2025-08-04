import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generatePDF = async (element: HTMLElement, filename: string) => {
  try {
    console.log(element.innerHTML);
    const wrapper = document.createElement('div');
    // wrapper.style.border = '2px solid black';
    // wrapper.style.borderRadius = '12px';
    // wrapper.style.padding = '4px';
    // wrapper.style.backgroundColor = '#ffffff';

    // Clone and append the element to wrapper
    const clonedElement = element.cloneNode(true) as HTMLElement;
    wrapper.appendChild(clonedElement);

    // Hide wrapper off-screen for rendering
    wrapper.style.position = 'absolute';
    wrapper.style.left = '-9999px';
    document.body.appendChild(wrapper);

    const canvas = await html2canvas(wrapper, {
      scale: 3,
      logging: false,
      allowTaint: true,
      useCORS: true,
      backgroundColor: '#ffffff'
    });

    // Clean up the temporary wrapper
    document.body.removeChild(wrapper);

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // Define left and right margins (in mm)
    const leftMargin = 1.5; // 2mm left margin
    const rightMargin = 1.5; // 2mm right margin
    const availableWidth = pdfWidth - leftMargin - rightMargin;
    
    const canvasAspectRatio = canvas.height / canvas.width;
    const availableAspectRatio = pdfHeight / availableWidth;

    let renderWidth, renderHeight;

    if (canvasAspectRatio > availableAspectRatio) {
      // Height is the limiting factor
      renderHeight = pdfHeight;
      renderWidth = renderHeight / canvasAspectRatio;
    } else {
      // Width is the limiting factor
      renderWidth = availableWidth;
      renderHeight = renderWidth * canvasAspectRatio;
    }

    // Center horizontally within the available width (between margins)
    const xOffset = leftMargin + (availableWidth - renderWidth) / 2;
    const yOffset = (pdfHeight - renderHeight) / 2;

    pdf.addImage(imgData, 'PNG', xOffset, yOffset, renderWidth, renderHeight);
    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF. Please try again.');
  }
};


// export const generatePDF = async (element: HTMLElement, filename: string) => {
//   try {
//     console.log(element.innerHTML);
//     const wrapper = document.createElement('div');
    
//     // Clone and append the element to wrapper
//     const clonedElement = element.cloneNode(true) as HTMLElement;
//     wrapper.appendChild(clonedElement);
    
//     // Hide wrapper off-screen for rendering
//     wrapper.style.position = 'absolute';
//     wrapper.style.left = '-9999px';
//     document.body.appendChild(wrapper);
    
//     // Copy all stylesheets to ensure styles are preserved
//     const styleSheets = Array.from(document.styleSheets);
//     const cssText = styleSheets.map(sheet => {
//       try {
//         return Array.from(sheet.cssRules).map(rule => rule.cssText).join('\n');
//       } catch (e) {
//         // Handle cross-origin stylesheets
//         return '';
//       }
//     }).join('\n');
    
//     // Add styles to the wrapper
//     const styleElement = document.createElement('style');
//     styleElement.textContent = cssText;
//     wrapper.appendChild(styleElement);
    
//     const canvas = await html2canvas(wrapper, {
//       scale: 3,
//       logging: false,
//       allowTaint: true,
//       useCORS: true,
//       backgroundColor: '#ffffff'
//     });
    
//     // Clean up the temporary wrapper
//     document.body.removeChild(wrapper);
    
//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF({
//       orientation: 'landscape',
//       unit: 'mm',
//       format: 'a4'
//     });
    
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = pdf.internal.pageSize.getHeight();
    
//     // Define left and right margins (in mm)
//     const leftMargin = 1.5; // 1.5mm left margin
//     const rightMargin = 1.5; // 1.5mm right margin
//     const availableWidth = pdfWidth - leftMargin - rightMargin;
    
//     const canvasAspectRatio = canvas.height / canvas.width;
//     const availableAspectRatio = pdfHeight / availableWidth;
    
//     let renderWidth, renderHeight;
    
//     if (canvasAspectRatio > availableAspectRatio) {
//       // Height is the limiting factor
//       renderHeight = pdfHeight;
//       renderWidth = renderHeight / canvasAspectRatio;
//     } else {
//       // Width is the limiting factor
//       renderWidth = availableWidth;
//       renderHeight = renderWidth * canvasAspectRatio;
//     }
    
//     // Center horizontally within the available width (between margins)
//     const xOffset = leftMargin + (availableWidth - renderWidth) / 2;
//     const yOffset = (pdfHeight - renderHeight) / 2;
    
//     pdf.addImage(imgData, 'PNG', xOffset, yOffset, renderWidth, renderHeight);
//     pdf.save(filename);
//   } catch (error) {
//     console.error('Error generating PDF:', error);
//     alert('Error generating PDF. Please try again.');
//   }
// };