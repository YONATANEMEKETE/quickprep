'use client';

import { pinata } from '@/lib/pinata';
import { ArrowDown, CloudUpload, Loader } from 'lucide-react';
import React, { use, useCallback, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { Button } from './button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Dropzone() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [url, setUrl] = useState<string | null>(null);
  const router = useRouter();

  const handleUpload = async (file: File) => {
    try {
      setUploading(true);
      const keyRequest = await fetch('/api/key');
      const keyData = await keyRequest.json();
      const uploadedFile = await pinata.upload.file(file).key(keyData.JWT);

      toast.success(`File ${uploadedFile.name} uploaded successfully`);
      setUploading(false);
      setFile(file);
      setUrl(uploadedFile.cid);
    } catch (error) {
      setUploading(false);
      console.log(error);
      toast.error('Error uploading file');
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length) {
      acceptedFiles.forEach((file) => handleUpload(file));
      setFile(null);
    }
  }, []);

  const handleRejectedFiles = useCallback((rejectedFiles: FileRejection[]) => {
    if (rejectedFiles.length) {
      const tooManyFiles = rejectedFiles.find(
        (file) => file.errors[0].code === 'too-many-files'
      );
      if (tooManyFiles) {
        toast.error('You can only upload one file at a time');
        return;
      }
      const fileTooLarge = rejectedFiles.find(
        (file) => file.errors[0].code === 'file-too-large'
      );
      if (fileTooLarge) {
        toast.error('File can only be 2MB or less');
        return;
      }

      toast.error('Unsupported file format. Please upload a PDF file.');
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected: handleRejectedFiles,
    maxFiles: 1,
    maxSize: 2 * 1024 * 1024,
    accept: {
      'application/pdf': ['.pdf'],
    },
  });

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col items-center gap-y-4">
        <div
          {...getRootProps({
            className: `border-2 border-dashed border-myaccent3 rounded-md p-4 cursor-pointer w-[400px] h-[200px] flex flex-col justify-end pb-8 bg-myaccent05`,
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
            <div>
              {file ? (
                <div className="flex flex-col items-center gap-y-6">
                  <Image
                    src="https://img.icons8.com/external-vectorslab-flat-vectorslab/53/external-pdf-file-format-files-and-folders-vectorslab-flat-vectorslab.png"
                    alt="Icon pdf"
                    width={70}
                    height={50}
                  />
                  <p className="text-center text-base text-myaccent5  font-semibold font-mynormal">
                    {file.name}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-y-6">
                  {uploading ? (
                    <>
                      <Loader
                        size={50}
                        className="text-mytextlight animate-spin"
                      />
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
          )}
        </div>
        <div className="flex items-center justify-between w-full px-2">
          <p className="text-sm text-mytextlight font-semibold font-mynormal">
            Supported Formats: .pdf
          </p>
          <p className="text-sm text-mytextlight font-semibold font-mynormal">
            Max File Size: 2MB
          </p>
        </div>
      </div>
      <Button
        variant={'gooeyLeft'}
        onClick={() => {
          file
            ? router.push(`/summery/${url}`)
            : toast.error('No file Uploaded. Please upload a file first.');
        }}
        size={'lg'}
        className="w-full bg-gradient-to-br from-myaccent6 hover:from-myaccent5 to-myaccent7 hover:to-myaccent7 text-base text-white font-medium font-mynormal"
      >
        Summarize
      </Button>
    </div>
  );
}
