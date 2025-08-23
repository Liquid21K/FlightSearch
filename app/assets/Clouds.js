'use client'
import './Clouds.css';

const Clouds = () => {
  return (
    <div className=" w-full ">
      <div className="clouds-container">
        <div className="cloud cloud-1"></div>
      
        <div className="cloud cloud-3"></div>
        <div className="cloud cloud-4"></div>
        <div className="cloud cloud-5"></div>
      </div>
      <svg
        className="waves"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
      >
        <defs>
          <path
            id="wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className="wave-parallax">
          <use href="#wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
          <use href="#wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
          <use href="#wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
          <use href="#wave" x="48" y="7" fill="rgba(255,255,255,1)" />
        </g>
      </svg>
    </div>
  );
};

export default Clouds; 