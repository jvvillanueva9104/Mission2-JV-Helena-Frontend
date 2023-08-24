import React from "react";
import "./SearchInput.css";
import { useState } from "react";
import axios from "axios";

const SearchInput = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [carModel, setCarModel] = useState("");
  const [carMake, setCarMake] = useState("");

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

  const handleUploadClick = async () => {
    if (uploadedImage) {
      try {
        // Convert data URL to a Blob object
        const imageBlob = await (await fetch(uploadedImage)).blob();

        // Create a FormData object to send the image as binary data
        const formData = new FormData();
        formData.append("image", imageBlob);

        // Send the FormData to the API endpoint using axios
        const response = await axios.post(
          "http://localhost:4000/car_Finder",
          formData
        );

        const carMakePredic = response.data.carMakePredic;
        const highestProbabilityPrediction = carMakePredic.predictions.reduce(
          (highest, prediction) =>
            prediction.probability > highest.probability ? prediction : highest,
          { probability: 0 }
        );

        setCarModel(highestProbabilityPrediction.tagName);

        ///
        const carModelPredic = response.data.carModelPredic;

        const highestProbabilityPrediction2 = carModelPredic.predictions.reduce(
          (highest, prediction) =>
            prediction.probability > highest.probability ? prediction : highest,
          { probability: 0 }
        );

        setCarMake(highestProbabilityPrediction2.tagName);

        console.log(carMakePredic);
        console.log(carModelPredic);

        // Handle the response here if needed
        console.log("API response:", response.data);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
    setIsClicked(true);
  };

  console.log(carModel);
  console.log(carMake);

  return (
    <div className="searchInputContainer">
      {!isClicked ? (
        <div>
          <div className="searchTextsContainer">
            <h1 className="searchHeader" data-aos="fade-left">
              Find The Car Of Your Dreams!
            </h1>
            <p className="searchText" data-aos="fade-right">
              Start by uploading a photo of the car you're looking for below:
            </p>
          </div>
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
              data-aos="fade-up"
            />
            {uploadedImage && (
              <button
                className="uploadBtn"
                onClick={handleUploadClick}
                data-aos="zoom-in"
              >
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
              src={`https://www.turners.co.nz/Cars/Used-Cars-for-Sale/${carModel}/?sortorder=7&pagesize=20&pageno=1&issearchsimilar=true&types=${carMake}&make=${carModel}`}
              width="100%"
              height="733"
              loading="lazy"
              className="iFrame"
              data-aos="zoom-in"
            ></iframe>
          )}
        </>
      )}
    </div>
  );
};

export default SearchInput;
