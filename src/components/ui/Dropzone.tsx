'use client';

import { pinata } from '@/lib/pinata';
import { ArrowDown, CloudUpload, Loader } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';

export default function Dropzone() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleUpload = async (file: File) => {
    try {
      setUploading(true);
      const keyRequest = await fetch('/api/key');
      const keyData = await keyRequest.json();
      const uploadedFile = await pinata.upload.file(file).key(keyData.JWT);
      toast.success(`File ${uploadedFile.name} uploaded successfully`);
      setUploading(false);
    } catch (error) {
      setUploading(false);
      console.log(error);
      toast.error('Error uploading file');
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length) {
      acceptedFiles.forEach((file) => handleUpload(file));
    } else {
      alert('No files accepted');
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps({
        className:
          'border-2 border-dashed border-myaccent3 rounded-md p-4 cursor-pointer w-[400px] h-[200px] flex flex-col justify-end pb-8 bg-myaccent05',
      })}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <div className="flex flex-col items-center gap-y-6">
          <ArrowDown size={50} className="text-mytext animate-bounce" />
          <p className="text-center text-base text-mytextlight font-semibold font-mynormal">
            Drop the File here
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-y-6">
          {uploading ? (
            <>
              <Loader size={50} className="text-mytextlight animate-spin" />
              <p className="text-center text-base text-mytextlight font-semibold font-mynormal">
                Uploading...
              </p>
            </>
          ) : (
            <>
              <CloudUpload size={50} className="text-mytextlight" />
              <p className="text-center text-base text-mytextlight font-semibold font-mynormal">
                Drag and Drop or click to select files
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
