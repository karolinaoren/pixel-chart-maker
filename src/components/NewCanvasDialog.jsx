import React from 'react';
import { Plus } from 'lucide-react';

const NewCanvasDialog = ({
  showNewDialog,
  setShowNewDialog,
  newCanvasWidth,
  setNewCanvasWidth,
  newCanvasHeight,
  setNewCanvasHeight,
  newGridPattern,
  setNewGridPattern,
  createNewCanvas
}) => {
  const presets = [
    { w: 8, h: 8, label: '8×8' },
    { w: 16, h: 16, label: '16×16' },
    { w: 24, h: 24, label: '24×24' },
    { w: 32, h: 32, label: '32×32' },
    { w: 16, h: 24, label: '16×24' },
    { w: 32, h: 16, label: '32×16' }
  ];

  const patterns = [
    { value: 'square', label: 'Square Grid' },
    { value: 'offset-horizontal', label: 'Brick Pattern (Horizontal)' },
    { value: 'offset-vertical', label: 'Brick Pattern (Vertical)' }
  ];

  if (!showNewDialog) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 shadow-2xl">
        <div className="flex items-center gap-2 mb-4">
          <Plus className="w-5 h-5 text-rose-600" />
          <h2 className="text-xl font-semibold">New Canvas</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Canvas Size</label>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <label className="block text-xs text-rose-600 mb-1">Width</label>
                <input
                  type="number"
                  min="1"
                  max="128"
                  value={newCanvasWidth}
                  onChange={(e) => setNewCanvasWidth(Math.max(1, Math.min(128, parseInt(e.target.value) || 1)))}
                  className="w-full px-3 py-2 border border-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
              <div>
                <label className="block text-xs text-rose-600 mb-1">Height</label>
                <input
                  type="number"
                  min="1"
                  max="128"
                  value={newCanvasHeight}
                  onChange={(e) => setNewCanvasHeight(Math.max(1, Math.min(128, parseInt(e.target.value) || 1)))}
                  className="w-full px-3 py-2 border border-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>
            <div className="text-xs text-rose-500 mb-3">
              Quick presets:
            </div>
            <div className="grid grid-cols-3 gap-2">
              {presets.map(preset => (
                <button
                  key={preset.label}
                  onClick={() => {
                    setNewCanvasWidth(preset.w);
                    setNewCanvasHeight(preset.h);
                  }}
                  className={`px-2 py-1 text-xs rounded font-medium transition-all ${
                    newCanvasWidth === preset.w && newCanvasHeight === preset.h
                      ? 'bg-rose-500 text-white' 
                      : 'bg-rose-100 hover:bg-rose-200'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Grid Pattern</label>
            <div className="space-y-2">
              {patterns.map(pattern => (
                <button
                  key={pattern.value}
                  onClick={() => setNewGridPattern(pattern.value)}
                  className={`w-full px-3 py-2 text-sm rounded-lg font-medium transition-all text-left ${
                    newGridPattern === pattern.value 
                      ? 'bg-rose-500 text-white' 
                      : 'bg-rose-100 hover:bg-rose-200'
                  }`}
                >
                  {pattern.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setShowNewDialog(false)}
            className="flex-1 px-4 py-2 text-rose-700 bg-rose-100 rounded-lg hover:bg-rose-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={createNewCanvas}
            className="flex-1 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewCanvasDialog;