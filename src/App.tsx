import React from "react";
import * as nsfwjs from 'nsfwjs'
function App() {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      console.error("No file selected.");
      return;
    }
    const model = await nsfwjs.load('/model/',{ size: 299 })
    const reader = new FileReader();
    reader.onload = async (event) => {
    
      const img = new Image();
      img.onload = async () => {
       
        const predictions = await model.classify(img)

        console.log("Predictions: ");
        console.log(predictions);
      };
      img.src = event.target?.result as string; 
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <h1>Photo Detector</h1>
      <p>Upload a photo and get the description of the photo</p>
      <div>
        <input type="file" onChange={handleUpload} />
      </div>
    </div>
  );
}

export default App;
