import React, { useState, useContext } from "react";
import { BlockPicker } from "react-color";
import { AppContext } from "../../context/app-provider";

const ColorPalette = () => {
  const { state, dispatch } = useContext(AppContext);
  const [color, setColor] = useState(state.color);
  const [showPicker, setShowPicker] = useState(false);

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
    dispatch({ type: "COLOR", color: newColor.hex });
  };

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  return (
    <>
      <div>Color</div>
      <div style={{ position: "relative", display: "inline-block" }}>
        <div
          onClick={togglePicker}
          style={{
            backgroundColor: color,
            width: "25px",
            height: "25px",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        />

        {showPicker && (
          <div style={{ position: "absolute", top: "60px", zIndex: 1 }}>
            <BlockPicker color={color} onChange={handleColorChange} />
            <div
              style={{
                marginTop: "10px",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: "#f0f0f0",
                padding: "5px",
                borderRadius: "3px",
                border: "1px solid #ccc",
                color: "#000",
              }}
              onClick={togglePicker}
            >
              Close
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ColorPalette;
