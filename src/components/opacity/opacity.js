import React from "react";
import Slider from "@mui/material/Slider";

const Opacity = () => {
  return (
    <>
      <div>Opacity</div>
      <Slider
        size="small"
        defaultValue={1}
        aria-label="Small"
        min={0}
        max={1}
        step={0.05}
        valueLabelDisplay="auto"
        color={'primary'}
      />
    </>
  );
};

export default Opacity;
