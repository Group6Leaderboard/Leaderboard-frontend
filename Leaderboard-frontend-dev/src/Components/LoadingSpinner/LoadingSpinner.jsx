import React from 'react';
import './loadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="webm-loader-overlay">
      <video
        className="webm-loader"
        src="/load.webm"
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
};

export default LoadingSpinner;
