import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, FileText, File, Type, Sparkles, Code } from 'lucide-react';
import { UploadData } from '../types/canvas';



interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (data: UploadData) => void;
  onFillUsingAI: () => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onUpload,
  onFillUsingAI
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [jsonInput, setJsonInput] = useState('');
  const [activeTab, setActiveTab] = useState<'upload' | 'text' | 'json'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };


  // const handleFile = (file: File) => {
  //   const reader = new FileReader();
  
  //   reader.onload = async (e) => {
  //     const fileContent = e.target?.result as string;
  
  //     try {
  //       const response = await fetch('http://localhost:5000/upload', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({
  //           fileName: file.name,
  //           content: fileContent
  //         })
  //       });
  
  //       const result = await response.json();
  //       console.log('Server response:', result);
  
  //       // Mimic original `onUpload` call with processed data
  //       onUpload({
  //         type: 'file',
  //         content: result.content, // processed result from Flask
  //         fileName: file.name
  //       });
  
  //     } catch (error) {
  //       console.error('Upload error:', error);
  //     }
  //   };
  
  //   reader.readAsText(file);
  // };
  

  const handleFile = (file: File) => {
    onUpload({
      type: 'file',
      file, // ✅ pass the actual file object
      fileName: file.name,
      content: '', // optional — you can remove this or leave it empty
    });
  };
  
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleTextSubmit = () => {
    console.log(textInput.trim());
    if (textInput.trim()) {
      onUpload({
        type: 'text',
        content: textInput.trim()
      });
    }
  };



  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Add Your Content
                </h2>
                <p className="text-gray-600">
                  Upload a file, add text, import JSON data, or start from scratch
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X size={24} className="text-gray-400" />
              </button>
            </div>

            <div className="flex space-x-1 mb-8 bg-gray-100 rounded-2xl p-1">
              <button
                onClick={() => setActiveTab('upload')}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                  activeTab === 'upload'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Upload size={20} className="inline mr-2" />
                Upload File
              </button>
              <button
                onClick={() => setActiveTab('text')}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                  activeTab === 'text'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Type size={20} className="inline mr-2" />
                Add Text
              </button>

            </div>

            {activeTab === 'upload' && (
              <div className="space-y-6">
                <div
                  className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
                    dragActive
                      ? 'border-blue-400 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Drop your file here
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Support for PDF, DOCX, and TXT files
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                  >
                    Browse Files
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    hidden
                    accept=".pdf,.docx,.txt"
                    onChange={handleFileInput}
                  />
                </div>
              </div>
            )}

            {activeTab === 'text' && (
              <div className="space-y-6">
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Paste your business description, requirements, or any relevant information here..."
                  className="w-full h-40 p-4 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleTextSubmit}
                  disabled={!textInput.trim()}
                  className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles size={20} className="inline mr-2" />
                  Generate Canvas with AI
                </button>
              </div>
            )}

           

            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={onFillUsingAI}
                className="w-full py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
              >
                <File size={20} className="inline mr-2" />
                Fill Using AI
              </button>
            </div>


          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};