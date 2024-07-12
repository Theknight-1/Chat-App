"use client";

import { X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import styled from "styled-components";
import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";

const StyledUploadDropzone = styled(UploadDropzone)`
  border: 2px dashed indigo;
  padding: 20px;
  background-color: #f0f0f0;
  &:hover {
    background-color: #e0e0e0;
  }
  label {
    color: indigo;
  }
  button {
    background-color: #4b0082;
  }
`;

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

const FileUpload: React.FC<FileUploadProps> = ({
  onChange,
  value,
  endpoint,
}) => {
  const [uploadedUrl, setUploadedUrl] = useState<string | undefined>(value);

  const fileType = uploadedUrl?.split(".").pop();
  const isImage = ["png", "gif", "jpg", "jpeg"].includes(fileType || "");

  return (
    <div>
      {uploadedUrl && isImage ? (
        <div className="relative h-32 w-32">
          <Image
            fill
            src={uploadedUrl}
            sizes="h-full w-full"
            alt="upload"
            className="rounded-full bg-cover"
          />
          <button
            onClick={() => setUploadedUrl(undefined)}
            className="absolute top-0 right-0 shadow-sm bg-white text-black rounded-full p-1"
          >
            <X size={20} className="bg-gray-300 rounded-full p-1" />
          </button>
        </div>
      ) : (
        <StyledUploadDropzone
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            const url = res?.[0].url;
            setUploadedUrl(url);
            onChange(url);
          }}
          onUploadError={(error: Error) => {
            console.log(error);
          }}
        />
      )}
    </div>
  );
};

export default FileUpload;
