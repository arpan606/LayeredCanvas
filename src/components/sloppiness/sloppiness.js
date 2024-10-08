import React, { useState, useEffect, useRef } from "react";
import "./sloppiness.css";

const Sloppiness = () => {
  const [selectedSloppiness, setSelectedSloppiness] = useState(1);
  const canvasRefs = [useRef(null), useRef(null), useRef(null)];

  const sloppinessLevels = [1, 5, 8];

  const drawSloppyLine = (ctx, x1, y1, x2, y2, sloppiness) => {
    const randomOffset = () => (Math.random() - 0.5) * sloppiness;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    for (let i = 0; i < 3; i++) {
      const startX = x1 + randomOffset();
      const startY = y1 + randomOffset();
      const endX = x2 + randomOffset();
      const endY = y2 + randomOffset();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
    }
    ctx.stroke();
  };

  useEffect(() => {
    canvasRefs.forEach((ref, index) => {
      const canvas = ref.current;
      const ctx = canvas.getContext("2d");
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#fff";
      drawSloppyLine(ctx, 10, 10, 25, 25, sloppinessLevels[index]);
    });
  }, [canvasRefs, sloppinessLevels]);

  return (
    <>
      <div>Slopiness</div>
      <div className="sloppiness-container">
        {sloppinessLevels.map((sloppiness, index) => (
          <div
            key={index}
            className={`sloppiness-item ${
              selectedSloppiness === sloppiness ? "selected" : ""
            }`}
            onClick={() => setSelectedSloppiness(sloppiness)}
          >
            <canvas
              ref={canvasRefs[index]}
              width={30}
              height={30}
              className="sloppiness-canvas"
            ></canvas>
          </div>
        ))}
      </div>
    </>
  );
};

export default Sloppiness;
