import React from "react";
import "./PacmanLoading.css";


const PacmanLoading = () => {
  return (
    <div className="PacmanLoading">
      <img 
        src="https://res.cloudinary.com/dgtbm9skf/image/upload/v1720712247/gif-loading-color_dhjnvl.gif"
        className="img-fluid"
        alt="Healthy App gif"
      />
     {/*} <PacmanLoader color={"#36D7B7"} loading={true} size={50} /> */}
     
    </div>
  );
};

export default PacmanLoading;
