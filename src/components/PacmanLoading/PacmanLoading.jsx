import React from "react";
import "./PacmanLoading.css";

const PacmanLoading = ({text}) => {
  return (
    <div className="PacmanLoading ">
      <h1>{text? text : ""}</h1>
      <img
        src="https://res.cloudinary.com/dgtbm9skf/image/upload/v1720712247/gif-loading-color_dhjnvl.gif"
        className="img-fluid"
        alt="Healthy App gif"
      />
    </div>
  );
};

export default PacmanLoading;
