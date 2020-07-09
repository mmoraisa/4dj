import React from 'react';

const BackgroundCircles = () => (
  <>
    <div id="bg-circle__large" className="bg-circle"></div>
    <div id="bg-circle__medium" className="bg-circle"></div>
    <div id="bg-circle__small" className="bg-circle"></div>
    <style>{`
      .bg-circle {
        border-radius: 50%;
        position: absolute;
        z-index: -1;
      }
      #bg-circle__large {
        background: linear-gradient(45deg, #0c1222, #405073);
        height: 60vw;
        width: 60vw;
        right: -10vw;
        top: -20vw;
        z-index: -1;
      }
      #bg-circle__medium {
        background: #0f172b;
        height: 60vw;
        width: 60vw;
        left: 5vw;
        top: -30vw;
        z-index: -3;
      }
      #bg-circle__small {
        background: #000;
        height: 15vw;
        width: 15vw;
        left: 12vw;
        opacity: .1;
        top: 18vw;
        z-index: -2;
      }
    `}</style>
  </>
);

export default BackgroundCircles;
