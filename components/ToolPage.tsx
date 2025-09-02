import React, { useState, useCallback, useEffect, useRef } from 'react';
import { type Tool } from '../types';
import { processFiles } from '../utils/pdfProcessor';

// @ts-ignore
declare const pdfjsLib: any;

interface ToolPageProps {
  tool: Tool;
  onBack: () => void;
}

interface PageThumbnail {
  id: number;
  originalIndex: number;
  dataUrl: string;
}

const ToolPage: React.FC<ToolPageProps> = ({ tool, onBack }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [options, setOptions] = useState<Record<string, any>>({
    watermarkText: 'CONFIDENTIAL',
    rotationAngle: 90,
    splitRange: 'all',
    pageNumberPosition: 'bottom-center',
    password: '',
  });
  const [pageThumbnails, setPageThumbnails] = useState<PageThumbnail[]>([]);
  const [isLoadingThumbs, setIsLoadingThumbs] = useState(false);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      const allFiles = tool.id === 'merge-pdf' || tool.id === 'jpg-to-pdf' ? [...files, ...newFiles] : newFiles.slice(0, 1);
      setFiles(allFiles);
      setPageThumbnails([]);
    }
  }, [tool.id, files]);

  const removeFile = useCallback((fileName: string) => {
    setFiles(prevFiles => {
      const newFiles = prevFiles.filter(file => file.name !== fileName);
      if (newFiles.length === 0) {
        setPageThumbnails([]);
      }
      return newFiles;
    });
  }, []);

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setOptions(prev => ({...prev, [e.target.name]: e.target.value}));
  };

  const generateThumbnails = async (file: File) => {
    if (tool.options !== 'organise' || !file) return;
    setIsLoadingThumbs(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
        try {
            const pdfData = new Uint8Array(e.target!.result as ArrayBuffer);
            const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
            const thumbs: PageThumbnail[] = [];
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 0.5 });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                await page.render({ canvasContext: context, viewport: viewport }).promise;
                thumbs.push({ id: i, originalIndex: i - 1, dataUrl: canvas.toDataURL() });
            }
            setPageThumbnails(thumbs);
        } catch(err) {
            console.error('Error generating thumbnails:', err);
            alert('Could not read this PDF file for organization.');
            setFiles([]);
        } finally {
            setIsLoadingThumbs(false);
        }
    };
    reader.readAsArrayBuffer(file);
  };
  
  useEffect(() => {
    if (tool.options === 'organise' && files.length === 1) {
        generateThumbnails(files[0]);
    }
  }, [files, tool.options]);
  
  const handleProcess = async () => {
    if (files.length === 0) {
        alert("Please select files to process.");
        return;
    }
    setIsProcessing(true);
    try {
        const processOptions = tool.options === 'organise'
            ? { pageOrder: pageThumbnails.map(p => p.originalIndex) }
            : options;
        await processFiles(tool.id, files, processOptions);
    } catch(err) {
        console.error(err);
        alert(`An error occurred: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
        setIsProcessing(false);
    }
  }

  const handleDragSort = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    const newThumbnails = [...pageThumbnails];
    const draggedItemContent = newThumbnails.splice(dragItem.current, 1)[0];
    newThumbnails.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setPageThumbnails(newThumbnails);
  };

  const deletePage = (id: number) => {
    setPageThumbnails(prev => prev.filter(page => page.id !== id));
  };
  
  const renderOptions = () => {
    switch (tool.options) {
      case 'watermark': return (...); // Omitted for brevity, no changes
      case 'rotate': return (...); // Omitted for brevity, no changes
      case 'pageNumber': return (...); // Omitted for brevity, no changes
      case 'protect':
      case 'unlock':
        return (
          <div className="mt-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" name="password" id="password" value={options.password} onChange={handleOptionChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green sm:text-sm"/>
          </div>
        );
      case 'organise':
        if (isLoadingThumbs) return <div className="text-center mt-4">Generating Page Previews...</div>;
        return (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-brand-dark mb-4">Organise Pages</h3>
            <p className="text-sm text-gray-500 mb-4">Drag and drop pages to reorder them. Click the 'X' to delete a page.</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
              {pageThumbnails.map((page, index) => (
                <div
                  key={page.id}
                  className="relative group cursor-grab"
                  draggable
                  onDragStart={() => (dragItem.current = index)}
                  onDragEnter={() => (dragOverItem.current = index)}
                  onDragEnd={handleDragSort}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <img src={page.dataUrl} className="border-2 border-gray-300 rounded-md w-full" alt={`Page ${page.originalIndex + 1}`} />
                  <div className="absolute top-1 right-1">
                    <button onClick={() => deletePage(page.id)} className="p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs text-center py-0.5">{index + 1}</div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const allowMultiple = tool.id === 'merge-pdf' || tool.id === 'jpg-to-pdf';

  return (
    <div className="py-16 min-h-screen">
       <button onClick={onBack} className="mb-8 flex items-center text-gray-600 hover:text-brand-dark font-semibold transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Back to Tools
      </button>

      <div className="text-center">
        <div className={`inline-flex p-4 rounded-lg ${tool.bgColor} ${tool.color}`}>
          {React.cloneElement(tool.icon, {className: 'h-10 w-10'})}
        </div>
        <h1 className="text-4xl font-bold text-brand-dark mt-4">{tool.name}</h1>
        <p className="mt-2 text-lg text-gray-500">{tool.description}</p>
      </div>

      <div className="max-w-3xl mx-auto mt-12">
        {files.length === 0 && (
            <div className="border-4 border-dashed border-gray-300 rounded-2xl p-12 text-center bg-gray-50 hover:bg-gray-100 transition-colors">
            <input type="file" id="file-upload" multiple={allowMultiple} accept={tool.id === 'jpg-to-pdf' ? 'image/jpeg,image/png' : 'application/pdf'} onChange={handleFileChange} className="hidden" />
            <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                </div>
                <p className="mt-4 text-2xl font-bold text-brand-dark">{allowMultiple ? 'Drag & Drop files here' : 'Drag & Drop a file here'}</p>
                <p className="text-gray-500 mt-1">or click to browse</p>
            </label>
            </div>
        )}

        {files.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-brand-dark">Selected Files:</h3>
            <ul className="mt-4 space-y-3">
              {files.map((file, index) => (
                <li key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <span className="text-gray-700 truncate">{file.name}</span>
                  <button onClick={() => removeFile(file.name)} className="text-red-500 hover:text-red-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </li>
              ))}
            </ul>
            {tool.options && renderOptions()}
          </div>
        )}

        <div className="mt-12 text-center">
          <button 
            className="px-12 py-4 bg-brand-green text-white font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
            disabled={files.length === 0 || isProcessing || isLoadingThumbs}
            onClick={handleProcess}
          >
            {/* FIX: Replaced invalid `(...)` syntax with a proper loading indicator. */}
            {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : 'Process Files' }
          </button>
          <p className="text-xs text-gray-500 mt-3">
            {tool.isServerTool 
              ? 'Note: This tool requires server-side processing and is for demonstration only.'
              : 'Your files are processed securely in your browser and are never uploaded.'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default ToolPage;