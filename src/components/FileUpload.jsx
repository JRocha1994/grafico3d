import React, { useCallback } from 'react';
import * as XLSX from 'xlsx';
import { Upload } from 'lucide-react';

const FileUpload = ({ onDataLoaded }) => {
  const handleFileUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);

      // Validate columns
      if (data.length > 0) {
        const firstRow = data[0];
        // Check for required columns (Descricao is optional but recommended to check if present for full functionality)
        if ('Projeto' in firstRow && 'Horas' in firstRow && 'Link' in firstRow) {
          onDataLoaded(data);
        } else {
          alert('Invalid file format. Columns "Projeto", "Horas", and "Link" are required. "Descricao" is optional.');
        }
      }
    };
    reader.readAsBinaryString(file);
  }, [onDataLoaded]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="p-10 border-2 border-dashed border-gray-600 rounded-xl hover:border-blue-500 transition-colors cursor-pointer relative group">
        <input
          type="file"
          accept=".xlsx"
          onChange={handleFileUpload}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center space-y-4">
          <Upload size={48} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
          <p className="text-xl font-semibold text-gray-300 group-hover:text-white">Upload Timesheet (.xlsx)</p>
          <p className="text-sm text-gray-500">Drag & drop or click to browse</p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
