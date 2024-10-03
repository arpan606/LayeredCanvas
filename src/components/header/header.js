import React, { useContext } from "react";
import "./header.css";
import BrushIcon from "@mui/icons-material/Brush";
import PanoramaFishEyeOutlinedIcon from "@mui/icons-material/PanoramaFishEyeOutlined";
import RectangleOutlinedIcon from "@mui/icons-material/RectangleOutlined";
import SquareOutlinedIcon from "@mui/icons-material/SquareOutlined";
import { IconButton } from "@mui/material";
import { AppContext } from "../../context/app-provider";

const Header = () => {
  const { dispatch } = useContext(AppContext);

  const changeShape = (shape = "LINE") => {
    dispatch({ type: "SHAPE", shape });
  };

  return (
    <div className="header">
      <IconButton color="inherit" onClick={() => changeShape("LINE")}>
        <BrushIcon color="inherit" fontSize="medium" />
      </IconButton>
      <IconButton color="inherit" onClick={() => changeShape("CIRCLE")}>
        <PanoramaFishEyeOutlinedIcon color="inherit" fontSize="medium" />
      </IconButton>
      <IconButton color="inherit" onClick={() => changeShape("RECTANGLE")}>
        <RectangleOutlinedIcon color="inherit" fontSize="medium" />
      </IconButton>
      <IconButton color="inherit" onClick={() => changeShape("SQUARE")}>
        <SquareOutlinedIcon color="inherit" fontSize="medium" />
      </IconButton>
    </div>
  );
};

export default Header;
