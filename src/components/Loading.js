import React, { useEffect } from "react";

const Loading = () => {
  return (
    <>
      <div className="loading-body">
        <div className="loading-container">
          <div className="ring"></div>
          <div className="ring"></div>
          <div className="ring"></div>
          <span className="loading-text">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Loading;
