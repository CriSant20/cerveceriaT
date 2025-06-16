import React, { useState, useCallback, useRef, ChangeEvent } from 'react';
import { FiUpload, FiFile, FiX, FiFileText, FiFilePlus } from 'react-icons/fi';
import { UploadedFile, DocumentUploaderProps, DocumentType } from '../../interfaces/Carga-Documentos.interface';

const CargaDoc: React.FC<DocumentUploaderProps> = ({
  acceptedTypes = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.txt'],
  maxSizeMB = 10,
  multiple = true,
  onFilesChange,
  initialFiles = []
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(initialFiles);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getDocumentType = (fileName: string): DocumentType => {
    const extension = fileName.split('.').pop()?.toLowerCase() ?? '';
    
    switch (extension) {
      case 'pdf': return 'pdf';
      case 'doc': return 'doc';
      case 'docx': return 'docx';
      case 'xls': return 'xls';
      case 'xlsx': return 'xlsx';
      case 'ppt': return 'ppt';
      case 'pptx': return 'pptx';
      case 'txt': return 'txt';
      default: return 'other';
    }
  };

  const handleFileChange = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;

    setError(null);
    const newFiles: UploadedFile[] = [];

    Array.from(files).forEach(file => {
      // Validar tipo de archivo
      const fileExtension = file.name.split('.').pop()?.toLowerCase() ?? '';
      const isValidType = acceptedTypes.some(type => 
        type.startsWith('.') ? `.${fileExtension}` === type : file.type.includes(type)
      );

      if (!isValidType) {
        setError(`Tipo de archivo no soportado: ${file.name}`);
        return;
      }

      // Validar tamaño
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`Archivo demasiado grande: ${file.name} (máximo ${maxSizeMB}MB)`);
        return;
      }

      const fileType = getDocumentType(file.name);
      let previewUrl: string | undefined;

      if (fileType === 'pdf' || file.type.startsWith('image/')) {
        previewUrl = URL.createObjectURL(file);
      }

      newFiles.push({
        id: Math.random().toString(36).substring(2, 9),
        file,
        name: file.name,
        size: file.size,
        type: fileType,
        previewUrl
      });
    });

    if (newFiles.length > 0) {
      const updatedFiles = multiple ? [...uploadedFiles, ...newFiles] : newFiles;
      setUploadedFiles(updatedFiles);
      onFilesChange?.(updatedFiles);
    }
  }, [acceptedTypes, maxSizeMB, multiple, onFilesChange, uploadedFiles]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e.target.files);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };

  const removeFile = (id: string) => {
    const updatedFiles = uploadedFiles.filter(file => file.id !== id);
    
    // Liberar URLs de objetos creadas para las vistas previas
    const fileToRemove = uploadedFiles.find(file => file.id === id);
    if (fileToRemove?.previewUrl) {
      URL.revokeObjectURL(fileToRemove.previewUrl);
    }
    
    setUploadedFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
  };

  const getFileIcon = (type: DocumentType) => {
    switch (type) {
      case 'pdf': return <FiFileText className="text-red-500" size={20} />;
      case 'doc':
      case 'docx': return <FiFileText className="text-blue-500" size={20} />;
      case 'xls':
      case 'xlsx': return <FiFileText className="text-green-500" size={20} />;
      case 'ppt':
      case 'pptx': return <FiFileText className="text-orange-500" size={20} />;
      default: return <FiFile className="text-gray-500" size={20} />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <FiUpload className="text-3xl text-gray-400" />
          <p className="text-sm text-gray-600">
            Arrastra y suelta tus documentos aquí o haz clic para seleccionar
          </p>
          <p className="text-xs text-gray-500">
            Formatos admitidos: {acceptedTypes.join(', ')} (max {maxSizeMB}MB cada uno)
          </p>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleInputChange}
          accept={acceptedTypes.join(',')}
          multiple={multiple}
          className="hidden"
        />
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">
          {error}
        </div>
      )}

      {uploadedFiles.length > 0 ? (
        <div className="space-y-3">
          <h3 className="font-medium text-gray-700">Documentos cargados ({uploadedFiles.length}):</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100"
              >
                <div className="flex items-center space-x-3">
                  {getFileIcon(file.type)}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate" title={file.name}>
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {file.type.toUpperCase()} • {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(file.id);
                  }}
                  className="text-gray-400 hover:text-red-500 p-1"
                  aria-label={`Eliminar ${file.name}`}
                >
                  <FiX size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center p-4 text-gray-400">
          <FiFilePlus className="mr-2" />
          <span>No hay documentos cargados</span>
        </div>
      )}
    </div>
  );
};

export default CargaDoc;