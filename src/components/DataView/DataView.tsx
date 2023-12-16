import React, { useState, useEffect, useRef } from 'react';
import './DataView.css';
import Papa from 'papaparse';
import Table from '../Table/Table';

interface MyDataRow {
  [key: string]: string | number;
}

interface DataViewProps {
  content: string;
  onClearData: () => void;
}

const parseCSV = (csvData: string, setData: React.Dispatch<React.SetStateAction<MyDataRow[]>>) => {
  Papa.parse(csvData, {
    header: true,
    complete: (results) => {
      const formattedData = results.data as MyDataRow[];
      setData(formattedData);
      localStorage.setItem('csvData', JSON.stringify(formattedData));
    },
  });
};

const DataView: React.FC<DataViewProps> = ({ content, onClearData }) => {
  const [data, setData] = useState<MyDataRow[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const savedData = localStorage.getItem('csvData');
    if (savedData) {
      try {
        const formattedData = JSON.parse(savedData) as MyDataRow[];
        setData(formattedData);
      } catch (error) {
        console.error("Ошибка при разборе данных из localStorage:", error);
        localStorage.removeItem('csvData');
      }
    } else if (content) {
      parseCSV(content, setData);
    }
  }, [content]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file && file.name.endsWith('.csv')) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const fileContent = e.target?.result as string;
        parseCSV(fileContent, setData);
      };
      fileReader.readAsText(file, "windows-1251"); 
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        style={{ display: 'none' }}
        accept=".csv" 
      />
      <div className="upload-button-container">
        <button onClick={onClearData} className="upload-button">
           Загрузить новый файл
        </button>
      </div>
      <Table data={data} />
    </div>
  );
};

export default DataView;
