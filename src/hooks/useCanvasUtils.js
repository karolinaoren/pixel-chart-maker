import { useCallback } from 'react';

export const useCanvasUtils = (grid, gridSize, gridPattern, donePixels, doneRows, setGrid, setGridSize, setGridPattern, setDonePixels, setDoneRows) => {
  const saveProject = useCallback(() => {
    const projectData = {
      grid,
      gridSize,
      gridPattern,
      donePixels,
      doneRows,
      timestamp: Date.now(),
      version: '1.0'
    };
    
    const dataStr = JSON.stringify(projectData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.download = `pixel-chart-${Date.now()}.json`;
    link.href = URL.createObjectURL(dataBlob);
    link.click();
    
    // Clean up the object URL
    URL.revokeObjectURL(link.href);
  }, [grid, gridSize, gridPattern, donePixels, doneRows]);

  const loadProject = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const projectData = JSON.parse(e.target.result);
          
          // Validate loaded data
          if (!projectData.grid || !projectData.gridSize) {
            alert('Invalid project file format');
            return;
          }
          
          // Load project data
          setGrid(projectData.grid);
          setGridSize(projectData.gridSize);
          setGridPattern(projectData.gridPattern || 'square');
          setDonePixels(projectData.donePixels || 
            Array(projectData.gridSize.height).fill().map(() => 
              Array(projectData.gridSize.width).fill(false)
            )
          );
          setDoneRows(projectData.doneRows || 
            Array(projectData.gridSize.height).fill(false)
          );
          
        } catch (error) {
          alert('Error loading project file: ' + error.message);
        }
      };
      
      reader.readAsText(file);
    };
    
    input.click();
  }, [setGrid, setGridSize, setGridPattern, setDonePixels, setDoneRows]);

  const clearCanvas = useCallback(() => {
    // This will be handled by the parent component
    // as it needs access to the state setters
  }, []);

  return { saveProject, loadProject, clearCanvas };
};