import React, { useState, useRef, useEffect } from 'react';
import TopMenuBar from './components/TopMenuBar';
import CanvasArea from './components/CanvasArea';
import SidePanel from './components/SidePanel';
import NewCanvasDialog from './components/NewCanvasDialog';
import { useElectronMenu } from './hooks/useElectronMenu';
import { useZoom } from './hooks/useZoom';
import { useCanvasUtils } from './hooks/useCanvasUtils';

const PixelArtEditor = () => {
  const [gridSize, setGridSize] = useState({ width: 16, height: 16 });
  const [currentColor, setCurrentColor] = useState('#000000');
  const [grid, setGrid] = useState(() => 
    Array(16).fill().map(() => Array(16).fill('#ffffff'))
  );
  const [isDrawing, setIsDrawing] = useState(false);
  const [gridPattern, setGridPattern] = useState('square');
  const [mode, setMode] = useState('paint');
  const [donePixels, setDonePixels] = useState(() => 
    Array(16).fill().map(() => Array(16).fill(false))
  );
  const [doneRows, setDoneRows] = useState(() => Array(16).fill(false));
  const [zoom, setZoom] = useState(1);
  const [showFileMenu, setShowFileMenu] = useState(false);
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [newCanvasWidth, setNewCanvasWidth] = useState(16);
  const [newCanvasHeight, setNewCanvasHeight] = useState(16);
  const [newGridPattern, setNewGridPattern] = useState('square');
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);

  const { saveProject, loadProject, clearCanvas } = useCanvasUtils(
    grid, 
    gridSize, 
    gridPattern, 
    donePixels, 
    doneRows, 
    setGrid, 
    setGridSize, 
    setGridPattern, 
    setDonePixels, 
    setDoneRows
  );
  
  // Clear canvas implementation
  const handleClearCanvas = () => {
    setGrid(Array(gridSize.height).fill().map(() => Array(gridSize.width).fill('#ffffff')));
    setDonePixels(Array(gridSize.height).fill().map(() => Array(gridSize.width).fill(false)));
    setDoneRows(Array(gridSize.height).fill(false));
  };
  
  useElectronMenu(() => setShowNewDialog(true), saveProject, handleClearCanvas);
  useZoom(canvasContainerRef, setZoom);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.file-menu-container')) {
        setShowFileMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Create new canvas
  const createNewCanvas = () => {
    setGridSize({ width: newCanvasWidth, height: newCanvasHeight });
    setGridPattern(newGridPattern);
    setGrid(Array(newCanvasHeight).fill().map(() => Array(newCanvasWidth).fill('#ffffff')));
    setDonePixels(Array(newCanvasHeight).fill().map(() => Array(newCanvasWidth).fill(false)));
    setDoneRows(Array(newCanvasHeight).fill(false));
    setShowNewDialog(false);
    setZoom(1);
  };

  // Handle pixel click/drawing
  const handlePixelClick = (row, col) => {
    if (mode === 'paint') {
      const newGrid = [...grid];
      if (newGrid[row][col] === currentColor) {
        newGrid[row][col] = '#ffffff';
      } else {
        newGrid[row][col] = currentColor;
      }
      setGrid(newGrid);
    } else if (mode === 'pixel-done') {
      const newDonePixels = [...donePixels];
      newDonePixels[row][col] = !newDonePixels[row][col];
      setDonePixels(newDonePixels);
    } else if (mode === 'row-done') {
      const newDoneRows = [...doneRows];
      newDoneRows[row] = !newDoneRows[row];
      setDoneRows(newDoneRows);
    }
  };

  // Handle mouse enter for drawing mode
  const handlePixelEnter = (row, col) => {
    if (isDrawing && mode === 'paint') {
      const newGrid = [...grid];
      newGrid[row][col] = currentColor;
      setGrid(newGrid);
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-100 flex flex-col fixed inset-0 overflow-hidden">
      <TopMenuBar 
        showFileMenu={showFileMenu}
        setShowFileMenu={setShowFileMenu}
        setShowNewDialog={setShowNewDialog}
        saveProject={saveProject}
        loadProject={loadProject}
        clearCanvas={handleClearCanvas}
        zoom={zoom}
        setZoom={setZoom}
      />

      <div className="flex-1 flex min-h-0">
        <CanvasArea
          grid={grid}
          gridSize={gridSize}
          gridPattern={gridPattern}
          donePixels={donePixels}
          doneRows={doneRows}
          zoom={zoom}
          mode={mode}
          isDrawing={isDrawing}
          setIsDrawing={setIsDrawing}
          handlePixelClick={handlePixelClick}
          handlePixelEnter={handlePixelEnter}
          canvasRef={canvasRef}
          canvasContainerRef={canvasContainerRef}
        />

        <SidePanel
          mode={mode}
          setMode={setMode}
          currentColor={currentColor}
          setCurrentColor={setCurrentColor}
          gridSize={gridSize}
          gridPattern={gridPattern}
          zoom={zoom}
        />
      </div>

      {showNewDialog && (
        <NewCanvasDialog
          showNewDialog={showNewDialog}
          setShowNewDialog={setShowNewDialog}
          newCanvasWidth={newCanvasWidth}
          setNewCanvasWidth={setNewCanvasWidth}
          newCanvasHeight={newCanvasHeight}
          setNewCanvasHeight={setNewCanvasHeight}
          newGridPattern={newGridPattern}
          setNewGridPattern={setNewGridPattern}
          createNewCanvas={createNewCanvas}
        />
      )}
    </div>
  );
};

export default PixelArtEditor;