import React from 'react';
import CargaDoc from '../../components/Documentos/carga-documentos';
import { UploadedFile } from '../../interfaces/Carga-Documentos.interface';

const App: React.FC = () => {
  const handleFilesChange = (files: UploadedFile[]) => {
    console.log('Archivos cargados:', files);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Cargar Documentos</h1>
      <CargaDoc 
        onFilesChange={handleFilesChange}
        maxSizeMB={15}
        acceptedTypes={['.pdf', '.doc', '.docx', '.xlsx', '.pptx']}
      />
    </div>
  );
};

export default App;