"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import Dropzone from "react-dropzone";
import { Cloud } from "lucide-react";

function UploadDropZone() {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({});

  const files = acceptedFiles.map((file: any) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  console.log("acceptedFiles: ", acceptedFiles);
  console.log("files: ", files);
  console.log("file: ", files[0]?.key);

  return (
    <div {...getRootProps({ className: "dropzone" })}>
      <div className="m-4 h-64 rounded-lg border border-dashed border-gray-300">
        <div className="flex h-full w-full items-center justify-center">
          <label
            htmlFor="dropzone-file"
            className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {" "}
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <Cloud className="mb-2 h-6 w-6 text-zinc-500" />{" "}
              <p className="mb-2 text-sm text-zinc-700">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-zinc-500">PDF</p>
            </div>
          </label>
        </div>
        <input {...getInputProps()} />
        {/* <div {...getRootProps({ className: "dropzone" })}> */}
        {/* <p>Drag 'n' drop some files here</p> */}
      </div>
      {/* <aside>
        <ul>{files}</ul>
      </aside> */}
    </div>
  );
}

const UploadButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setIsOpen(v);
        }
      }}
    >
      <DialogTrigger
        onClick={() => {
          setIsOpen(true);
        }}
        asChild
      >
        <Button>Upload PDF</Button>
      </DialogTrigger>

      <DialogContent>
        <UploadDropZone />
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;
