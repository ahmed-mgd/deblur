"use client";

import React, { useState } from "react";

const ImageCapture = () => {
  const [activeTab, setActiveTab] = useState("capture");
  const [capturedImage, setCapturedImage] = useState(null);

  const ESP32_IP = "192.168.50.170"; // Replace with your ESP32's IP address and port
  const ESP32_PORT = "81"

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCapturedImage(null);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCaptureImage = async () => {
    try {
      const response = await fetch(`http://${ESP32_IP}/capture`);
      if (response.ok) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setCapturedImage(imageUrl);
      } else {
        console.error("Failed to capture image");
      }
    } catch (error) {
      console.error("Error capturing image:", error);
    }
  };

  const handleDeblur = () => {
    // Implement your deblur logic here
    console.log("Deblurring image:", capturedImage);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="relative mb-6">
        <div className="flex border-b border-gray-200">
          {["capture", "upload"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`flex-1 py-3 px-4 text-center font-medium text-sm focus:outline-none transition-colors ${
                activeTab === tab
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab === "capture" ? "Capture Image" : "Upload File"}
            </button>
          ))}
        </div>
        <div
          className="absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300"
          style={{
            width: "50%",
            transform: `translateX(${activeTab === "capture" ? "0%" : "100%"})`,
          }}
        />
      </div>

      <div className="mb-6">
        {activeTab === "capture" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Camera Stream</h2>
            <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
              {capturedImage ? (
                <img
                  src={capturedImage}
                  alt="Captured Image"
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={`http://${ESP32_IP}:${ESP32_PORT}/stream`}
                  alt="ESP32 Camera Stream"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <button
              onClick={handleCaptureImage}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {capturedImage ? "Capture Again" : "Capture Image"}
            </button>
          </div>
        )}

        {activeTab === "upload" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Upload Image</h2>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          </div>
        )}
      </div>

      {capturedImage && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {activeTab === "upload" ? "Uploaded Image" : "Captured Image"}
          </h2>
          <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={capturedImage}
              alt={activeTab === "upload" ? "Uploaded Image" : "Captured Image"}
              className="w-full h-full object-contain"
            />
          </div>
          <button
            onClick={handleDeblur}
            className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Deblur Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageCapture;