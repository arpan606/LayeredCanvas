import React from "react";
import "./stroke-style-menu.css";
import ColorPalette from "../../components/color-picker/color-picker";
import Opacity from "../../components/opacity/opacity";
import StrokeWidth from "../../components/stroke-width/stroke-width";
import StrokeStyle from "../../components/stroke-style/stroke-style";
import Sloppiness from "../../components/sloppiness/sloppiness";

const StrokeStyleMenu = () => {
  return (
    <div className="menu-component">
      <ColorPalette />
      <Opacity />
      <StrokeWidth />
      <StrokeStyle />
      <Sloppiness />
    </div>
  );
};

export default StrokeStyleMenu;
