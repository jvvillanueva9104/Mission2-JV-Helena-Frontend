import React from "react";
import "./SearchInput.css";
import { useState } from "react";

const SearchInput = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

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

  console.log(uploadedImage);

  const handleRemoveImage = () => {
    setUploadedImage(null);
  };

  const handleUploadClick = () => {
    setIsClicked(true);
  };

  return (
    <div className="searchInputContainer">
      {!isClicked ? (
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
            {uploadedImage && (
              <button className="uploadBtn" onClick={handleUploadClick}>
                Upload
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          {isClicked && (
            <iframe
              title="Turners Search Results"
              src="https://www.turners.co.nz/Cars/Used-Cars-for-Sale/audi/?sortorder=7&pagesize=20&pageno=1&issearchsimilar=true&types=hatchback&make=audi"
              width="100%"
              height="733"
              frameborder="0"
              loading="lazy"
              className="iFrame"
            ></iframe>
          )}
        </>
      )}
    </div>
  );
};

export default SearchInput;
