import React from "react";
import "./SearchInput.css";
import { useState } from "react";

const SearchInput = () => {
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
  };
  return (
    <div className="searchInputContainer">
      <div>
        <h1 className="searchHeader">Find The Car Of Your Dreams</h1>
        <div className="fileUploadContainer">
          {uploadedImage && (
            <div>
              <img
                data-aos="zoom-in"
                src={uploadedImage}
                alt="Uploaded"
                className="uploadedImage"
              />
              <button className="removeBtn" onClick={handleRemoveImage}>
                x
              </button>
            </div>
          )}
          <input
            className="fileUpload"
            type="file"
            onChange={handleFileChange}
          />
          {uploadedImage && <button className="uploadBtn">Upload</button>}
        </div>
      </div>

      {/* <iframe
        title="Turners Search Results"
        src="https://www.turners.co.nz/Cars/Used-Cars-for-Sale/audi/?sortorder=7&pagesize=20&pageno=1&issearchsimilar=true&types=hatchback&make=audi"
        width="100%"
        height="600%"
        frameborder="0"
      ></iframe> */}
    </div>
  );
};

export default SearchInput;
