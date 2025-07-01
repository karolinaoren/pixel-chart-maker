import React from 'react';
import { Palette } from 'lucide-react';

const ColorPicker = ({ currentColor, setCurrentColor, mode }) => {
  return (
    <div className={mode !== 'paint' ? 'opacity-50' : ''}>
      <h3 className="font-semibold mb-3 flex items-center gap-2 text-rose-800">
        <Palette className="w-4 h-4" />
        Color Picker
      </h3>
      <input
        type="color"
        value={currentColor}
        onChange={(e) => setCurrentColor(e.target.value)}
        disabled={mode !== 'paint'}
        className="w-full h-12 rounded-lg border-2 border-rose-300 cursor-pointer disabled:cursor-not-allowed"
      />
      <div className="mt-2 text-sm text-rose-600 text-center font-mono">
        {currentColor.toUpperCase()}
      </div>
    </div>
  );
};

export default ColorPicker;