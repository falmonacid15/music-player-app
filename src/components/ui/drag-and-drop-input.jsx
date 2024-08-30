import React, { useCallback, useEffect, useState } from "react";
import { PiImageFill, PiXBold } from "react-icons/pi";

export default function DragAndDropInput() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  }, []);

  const handleFileInput = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  }, []);

  const handleFile = (file) => {
    if (file.type.startsWith("image/")) {
      setImage(file);
      setError(null);

      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setError("Please select an image file.");
      setImage(null);
      setPreviewUrl(null);
    }
  };

  const removeImage = useCallback(() => {
    setImage(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setError(null);
  }, [previewUrl]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className="border-b-2 border-content3 p-6 text-center cursor-pointer hover:border-content4 transition-colors"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        <input
          type="file"
          id="fileInput"
          className="hidden"
          accept="image/*"
          onChange={handleFileInput}
        />
        {image && previewUrl ? (
          <div className="relative">
            <img
              src={previewUrl}
              alt="Preview"
              className="max-w-full h-auto rounded-lg"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeImage();
              }}
              className="absolute top-2 right-2 bg-danger text-white p-1 rounded-full hover:bg-danger-500 transition-colors"
            >
              <PiXBold className="w-4 h-4" />
            </button>
            <p className="mt-2 text-sm text-foreground/60">
              {image.name} ({(image.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          </div>
        ) : (
          <div>
            <PiImageFill className="h-12 w-12 mx-auto text-foreground/60" />
            <p className="mt-2 text-sm text-foreground/60">
              Arrastre y suelte una imagen aquí, o haga clic para seleccionar un
              archivo
            </p>
          </div>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
