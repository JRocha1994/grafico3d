import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import ChartScene from './components/ChartScene';

function App() {
  const [data, setData] = useState(null);

  return (
    <div className="w-full h-screen bg-gray-900 text-white">
      {!data ? (
        <FileUpload onDataLoaded={setData} />
      ) : (
        <ChartScene
          data={data}
          onBack={() => setData(null)}
        />
      )}
    </div>
  );
}

export default App;
