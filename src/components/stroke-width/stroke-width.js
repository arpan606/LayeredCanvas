import React, { useState } from "react";
import "./stroke-width.css";

const StrokeWidth = () => {
  const [selectedStroke, setSelectedStroke] = useState(2);

  const strokes = [2, 4, 6];

  const handleStrokeSelect = (stroke) => {
    setSelectedStroke(stroke);
  };

  return (
    <>
      <div>Stroke</div>
      <div className="stroke-container">
        {strokes.map((stroke, index) => (
          <div
            key={index}
            className={`stroke-item ${
              selectedStroke === stroke ? "selected" : ""
            }`}
            onClick={() => handleStrokeSelect(stroke)}
            style={{ height: stroke + "px" }}
          ></div>
        ))}
      </div>
    </>
  );
};

export default StrokeWidth;
