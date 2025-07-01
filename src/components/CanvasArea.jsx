import React from 'react';
import { darkenColor } from '../utils/colorUtils';

const CanvasArea = ({
  grid,
  gridSize,
  gridPattern,
  donePixels,
  doneRows,
  zoom,
  mode,
  isDrawing,
  setIsDrawing,
  handlePixelClick,
  handlePixelEnter,
  canvasRef,
  canvasContainerRef
}) => {
  // Get pixel style based on grid pattern
  const getPixelStyle = (rowIndex, colIndex) => {
    const pixelSize = 20 * zoom;
    let offsetX = 0;
    let offsetY = 0;
    
    if (gridPattern === 'offset-horizontal' && rowIndex % 2 === 1) {
      offsetX = pixelSize / 2;
    } else if (gridPattern === 'offset-vertical' && colIndex % 2 === 1) {
      offsetY = pixelSize / 2;
    }
    
    let backgroundColor = grid[rowIndex][colIndex];
    
    const isPixelDone = donePixels[rowIndex][colIndex];
    const isRowDone = doneRows[rowIndex];
    
    if (isPixelDone || isRowDone) {
      backgroundColor = darkenColor(backgroundColor, 0.4);
    }
    
    return {
      backgroundColor,
      width: `${pixelSize}px`,
      height: `${pixelSize}px`,
      transform: `translate(${offsetX}px, ${offsetY}px)`,
      position: 'relative',
      border: (isPixelDone || isRowDone) ? '1px solid rgba(0,0,0,0.3)' : 'none',
      boxSizing: 'border-box'
    };
  };

  const scrollbarStyles = {
    scrollbarWidth: 'thin',
    scrollbarColor: '#f43f5e #fdf2f8',
  };

  return (
    <>
      <style>{`
        .canvas-scrollable::-webkit-scrollbar {
          width: 12px;
          height: 12px;
        }
        
        .canvas-scrollable::-webkit-scrollbar-track {
          background: #fdf2f8;
          border-radius: 6px;
        }
        
        .canvas-scrollable::-webkit-scrollbar-thumb {
          background: #f43f5e;
          border-radius: 6px;
          border: 2px solid #fdf2f8;
        }
        
        .canvas-scrollable::-webkit-scrollbar-thumb:hover {
          background: #e11d48;
        }
        
        .canvas-scrollable::-webkit-scrollbar-thumb:active {
          background: #be185d;
        }
        
        .canvas-scrollable::-webkit-scrollbar-corner {
          background: #fdf2f8;
        }
      `}</style>
      
      <div 
        className="flex-1 overflow-auto bg-gray-50 canvas-scrollable" 
        ref={canvasContainerRef}
        style={scrollbarStyles}
      >
        <div className="p-8 flex items-center justify-center min-h-full">
          <div 
            className="inline-block border-2 border-gray-300 rounded-lg shadow-lg bg-white"
            style={{ 
              display: 'grid', 
              gridTemplateColumns: `repeat(${gridSize.width}, ${20 * zoom}px)`,
              gridTemplateRows: `repeat(${gridSize.height}, ${20 * zoom}px)`,
              gap: `${zoom}px`,
              backgroundColor: '#e5e7eb',
              lineHeight: 0,
              padding: `${2 * zoom}px`
            }}
            ref={canvasRef}
          >
            {grid.map((row, rowIndex) =>
              row.map((color, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  style={getPixelStyle(rowIndex, colIndex)}
                  onClick={() => handlePixelClick(rowIndex, colIndex)}
                  onMouseEnter={() => handlePixelEnter(rowIndex, colIndex)}
                  onMouseDown={() => mode === 'paint' && setIsDrawing(true)}
                  onMouseUp={() => mode === 'paint' && setIsDrawing(false)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CanvasArea;