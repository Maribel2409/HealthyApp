import React from "react";
import "./PacmanLoading.css";


const PacmanLoading = () => {
  return (
    <div className="PacmanLoading">
      <img 
        src="/images/Organic.gif"
        className="img-fluid"
        alt="Healthy App gif"
      />
     {/*} <PacmanLoader color={"#36D7B7"} loading={true} size={50} /> */}
     
    </div>
  );
};

export default PacmanLoading;
