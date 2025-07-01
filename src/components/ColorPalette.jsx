import React from 'react';

const ColorPalette = ({ currentColor, setCurrentColor, mode }) => {
  const colorPalette = [
    '#000000', '#FFFFFF',       // Black & White
    '#FF6B81', '#FF9AA3',       // Reds / roses
    '#FFC48C', '#FFF2A6',       // Yellows / Cream
    '#9BDD7C', '#7ED6A6',       // Greens / Teal
    '#6FCF97', '#8CD7F8',       // Aqua / Light Blue
    '#7CB9E8', '#A1A3F6',       // Blue / Lavender
    '#CEB3F6', '#E4C1F9',       // Purple / Lilac
    '#F7A6D0', '#FFB6B9'        // Light rose / Soft Coral
  ];

  return (
    <div className={mode !== 'paint' ? 'opacity-50' : ''}>
      <h3 className="font-semibold mb-3 text-rose-800">Quick Colors</h3>
      <div className="grid grid-cols-8 gap-1">
        {colorPalette.map((color, index) => (
          <button
            key={index}
            onClick={() => mode === 'paint' && setCurrentColor(color)}
            disabled={mode !== 'paint'}
            className={`w-8 h-8 rounded-lg border-2 hover:scale-110 transition-transform disabled:cursor-not-allowed disabled:hover:scale-100 ${
              currentColor === color ? 'border-rose-800 shadow-lg' : 'border-rose-300'
            }`}
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;