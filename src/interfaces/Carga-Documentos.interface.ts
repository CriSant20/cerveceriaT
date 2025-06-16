export type DocumentType = 'pdf' | 'doc' | 'docx' | 'xls' | 'xlsx' | 'ppt' | 'pptx' | 'txt' | 'other';

export interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: DocumentType;
  previewUrl?: string;
}

export interface DocumentUploaderProps {
  acceptedTypes?: string[];
  maxSizeMB?: number;
  multiple?: boolean;
  onFilesChange?: (files: UploadedFile[]) => void;
  initialFiles?: UploadedFile[];
}