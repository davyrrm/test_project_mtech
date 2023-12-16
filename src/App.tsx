import React, { useState, useEffect } from 'react';
import './App.css';
import FileUpload from './components/FileUpload/FileUpload';
import DataView from './components/DataView/DataView';

function App() {
  const [fileContent, setFileContent] = useState<string | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem('csvData');
    if (savedData) {
      setFileContent(savedData);
    }
  }, []);

  const handleFileLoaded = (content: string) => {
    setFileContent(content);
    localStorage.setItem('csvData', content);
  };

  const handleClearData = () => {
    setFileContent(null);
    localStorage.removeItem('csvData');
  };

  return (
    <div className="app-container">
      {!fileContent ? (
        <FileUpload onFileLoaded={handleFileLoaded} />
      ) : (
        <DataView content={fileContent} onClearData={handleClearData} />
      )}
    </div>
  );
}

export default App;







