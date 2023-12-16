import React, { useState } from 'react';
import './FileUpload.css'; 

interface FileUploadProps {
  onFileLoaded: (content: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileLoaded }) => {
  const [error, setError] = useState<string>('');

  const handleFileRead = (event: ProgressEvent<FileReader>) => {
    if(event.target?.result) {
      const content = event.target.result as string;
      onFileLoaded(content); 
    } else {
      setError('Не удалось прочитать содержимое файла');
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file && file.name.endsWith('.csv')) {
      setError('');
      const fileReader = new FileReader();
      fileReader.onloadend = handleFileRead;
      fileReader.onerror = () => setError('Ошибка при чтении файла');
      fileReader.readAsText(file, "windows-1251"); 
    } else {
      setError('Неправильный формат файла, разрешены только файлы .CSV');
    }
  };

  return (
    <div className="file-upload-container">
      <div className="file-upload-box" />
      <div className="file-upload-instructions">
        Выберите файл в формате CSV
      </div>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".csv"
        style={{ display: 'none' }}
        id="file-input"
      />
      <label htmlFor="file-input" className="file-upload-button">
        Выберите файл
      </label>
      {error && (
        <div className="file-upload-error">
          <div className="file-upload-error-text">
            {error}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;

