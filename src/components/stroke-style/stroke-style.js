import React, { useState } from "react";
import "./stroke-style.css";

const StrokeStyle = () => {
  const [selectedStrokeStyle, setSelectedStrokeStyle] = useState("solid");

  const strokeStyles = ["solid", "dashed", "dotted"];

  const handleStrokeStyleSelect = (strokeStyle) => {
    setSelectedStrokeStyle(strokeStyle);
  };

  return (
    <>
      <div>Stroke Style</div>
      <div className="stroke-styles">
        {strokeStyles.map((style, index) => (
          <div
            key={index}
            className={`stroke-style-item ${
              selectedStrokeStyle === style ? "selected" : ""
            }`}
            onClick={() => handleStrokeStyleSelect(style)}
            style={{
              borderBottom: `4px ${style} #BB86FC`,
            }}
          ></div>
        ))}
      </div>
    </>
  );
};

export default StrokeStyle;
