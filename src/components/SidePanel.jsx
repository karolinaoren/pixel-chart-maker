import React from 'react';
import { CheckSquare, Palette, Check } from 'lucide-react';
import ColorPicker from './ColorPicker';
import ColorPalette from './ColorPalette';

const SidePanel = ({
  mode,
  setMode,
  currentColor,
  setCurrentColor,
  gridSize,
  gridPattern,
  zoom
}) => {
  return (
    <div className="w-80 bg-white border-l border-rose-200 p-4 space-y-6 overflow-y-auto flex-shrink-0">
      {/* Mode Selection */}
      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2 text-rose-800">
          <CheckSquare className="w-4 h-4" />
          Mode
        </h3>
        <div className="space-y-2">
          <button
            onClick={() => setMode('paint')}
            className={`w-full px-3 py-2 rounded-lg font-medium transition-all text-left flex items-center gap-2 ${
              mode === 'paint' 
                ? 'bg-rose-500 text-white shadow-md' 
                : 'bg-rose-50 hover:bg-rose-50 border border-rose-200'
            }`}
          >
            <Palette className="w-4 h-4" />
            Paint Mode
          </button>
          <button
            onClick={() => setMode('pixel-done')}
            className={`w-full px-3 py-2 rounded-lg font-medium transition-all text-left flex items-center gap-2 ${
              mode === 'pixel-done' 
                ? 'bg-rose-500 text-white shadow-md' 
                : 'bg-rose-50 hover:bg-rose-50 border border-rose-200'
            }`}
          >
            <Check className="w-4 h-4" />
            Pixel Done
          </button>
          <button
            onClick={() => setMode('row-done')}
            className={`w-full px-3 py-2 rounded-lg font-medium transition-all text-left flex items-center gap-2 ${
              mode === 'row-done' 
                ? 'bg-rose-500 text-white shadow-md' 
                : 'bg-rose-50 hover:bg-rose-50 border border-rose-200'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            Row Done
          </button>
        </div>
      </div>

      <ColorPicker 
        currentColor={currentColor}
        setCurrentColor={setCurrentColor}
        mode={mode}
      />

      <ColorPalette 
        currentColor={currentColor}
        setCurrentColor={setCurrentColor}
        mode={mode}
      />

      {/* Canvas Info */}
      <div className="bg-rose-50 border border-rose-200 rounded-lg p-3">
        <h3 className="font-semibold text-rose-800 mb-2">Canvas Info</h3>
        <div className="text-xs text-rose-700 space-y-1">
          <div>Size: {gridSize.width}×{gridSize.height}</div>
          <div>Pattern: {gridPattern.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
          <div>Zoom: {Math.round(zoom * 100)}%</div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-rose-50 border border-rose-200 rounded-lg p-3">
        <h3 className="font-semibold text-rose-800 mb-2">Instructions</h3>
        <ul className="text-xs text-rose-700 space-y-1">
          <li>• Use FILE menu to create new canvas or export</li>
          <li>• Hold Ctrl/Cmd + scroll to zoom in/out</li>
          <li>• Click and drag to paint (paint mode)</li>
          <li>• Switch modes to mark pixels/rows as done</li>
        </ul>
      </div>
    </div>
  );
};

export default SidePanel;