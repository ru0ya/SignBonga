import React, { useState } from 'react';
import axios from 'axios';
import { Upload, Image as ImageIcon, Loader } from 'lucide-react';

const TryAI = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setSelectedFile(null);
      setPreview(null);
      setError("Please select an image file.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError("Please select an image to upload.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setPrediction(null);

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post('http://localhost:8000/api/predict/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Token ${localStorage.getItem('auth_token')}`
        }
      });
      setPrediction(response.data);
    } catch (error) {
      console.error('Error predicting image:', error);
      setError("An error occurred while processing the image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Try AI</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-center w-full">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-10 h-10 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
          </label>
        </div>
        
        {preview && (
          <div className="mt-4">
            <img src={preview} alt="Preview" className="max-w-full h-auto rounded-lg" />
          </div>
        )}
        
        <button type="submit" className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300" disabled={isLoading}>
          {isLoading ? (
            <Loader className="animate-spin mx-auto" />
          ) : (
            <>
              <ImageIcon className="inline-block mr-2" />
              Analyze Image
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {prediction && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Prediction Results:</h3>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
            {JSON.stringify(prediction, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default TryAI;
