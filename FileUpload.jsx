import React, { useState } from 'react';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const preview = document.getElementById('preview');
        if (preview) {
          preview.innerHTML = `<img src="${reader.result}" alt="File Preview" />`;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        onChange={handleFileChange}
      />
      <div id="preview"></div>
    </div>
  );
};

export default FileUpload;