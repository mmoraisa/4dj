import React from 'react';

const Background = () => (
  <>
    <div className="app-bg"></div>
    <style>{`
      .app-bg {
        background: #161e32;
        left: 0;
        height: 100vh;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: -10;
      }
    `}</style>
  </>
);

export default Background;
