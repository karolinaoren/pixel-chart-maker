import React from 'react';
import { Square, Plus, Save, Upload, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

const TopMenuBar = ({ 
  showFileMenu, 
  setShowFileMenu, 
  setShowNewDialog, 
  saveProject, 
  loadProject, 
  clearCanvas, 
  zoom, 
  setZoom 
}) => {
  return (
    <div className="bg-white border-b border-rose-200 px-4 py-2 flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          {/* <div className="flex items-center space-x-2">
            <Square className="w-5 h-5 text-rose-600" />
            <h1 className="text-lg font-semibold text-rose-800">Pixel Chart Maker</h1>
          </div> */}
          
          {/* File Menu */}
          <div className="relative file-menu-container">
            <button
              onClick={() => setShowFileMenu(!showFileMenu)}
              className="px-3 py-1 text-sm font-medium text-rose-700 hover:bg-rose-100 rounded transition-colors"
            >
              FILE
            </button>
            
            {showFileMenu && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-rose-200 rounded-lg shadow-lg z-50">
                <button
                  onClick={() => {
                    setShowNewDialog(true);
                    setShowFileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-rose-700 hover:bg-rose-100 flex items-center gap-2 rounded-t-lg"
                >
                  <Plus className="w-4 h-4" />
                  New Canvas
                </button>
                <button
                  onClick={() => {
                    loadProject();
                    setShowFileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-rose-700 hover:bg-rose-100 flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Load Project
                </button>
                <button
                  onClick={() => {
                    saveProject();
                    setShowFileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-rose-700 hover:bg-rose-100 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Project
                </button>
                <button
                  onClick={() => {
                    clearCanvas();
                    setShowFileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-rose-700 hover:bg-rose-100 flex items-center gap-2 rounded-b-lg"
                >
                  <RotateCcw className="w-4 h-4" />
                  Clear Canvas
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Zoom Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.2))}
            className="p-1 text-rose-600 hover:bg-rose-100 rounded"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-sm text-rose-600 min-w-[60px] text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom(prev => Math.min(prev + 0.2, 5))}
            className="p-1 text-rose-600 hover:bg-rose-100 rounded"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopMenuBar;