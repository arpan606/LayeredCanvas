import React, { useContext } from "react";
import "./header.css";
import BrushIcon from "@mui/icons-material/Brush";
import PanoramaFishEyeOutlinedIcon from "@mui/icons-material/PanoramaFishEyeOutlined";
import RectangleOutlinedIcon from "@mui/icons-material/RectangleOutlined";
import SquareOutlinedIcon from "@mui/icons-material/SquareOutlined";
import { IconButton } from "@mui/material";
import { AppContext } from "../../context/app-provider";
import shapes from "../../utils/shape-type";
import AnimationOutlinedIcon from "@mui/icons-material/AnimationOutlined";
import AutoAwesomeMotionOutlinedIcon from "@mui/icons-material/AutoAwesomeMotionOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";

const Header = () => {
  const { dispatch } = useContext(AppContext);

  const changeShape = (shape = "LINE") => {
    dispatch({ type: "SHAPE", shape });
  };

  return (
    <div className="header">
      <IconButton color="inherit" onClick={() => changeShape(shapes.line)}>
        <BrushIcon color="inherit" fontSize="medium" />
      </IconButton>
      <IconButton color="inherit" onClick={() => changeShape(shapes.circle)}>
        <PanoramaFishEyeOutlinedIcon color="inherit" fontSize="medium" />
      </IconButton>
      <IconButton color="inherit" onClick={() => changeShape(shapes.rectangle)}>
        <RectangleOutlinedIcon color="inherit" fontSize="medium" />
      </IconButton>
      <IconButton color="inherit" onClick={() => changeShape(shapes.square)}>
        <SquareOutlinedIcon color="inherit" fontSize="medium" />
      </IconButton>
      <IconButton
        color="inherit"
        onClick={() => changeShape(shapes.concentric_circle)}
      >
        <RadioButtonCheckedOutlinedIcon color="inherit" fontSize="medium" />
      </IconButton>
      <IconButton
        color="inherit"
        onClick={() => changeShape(shapes.concentric_recatangle)}
      >
        <ContentCopyOutlinedIcon color="inherit" fontSize="medium" />
      </IconButton>
      <IconButton
        color="inherit"
        onClick={() => changeShape(shapes.concentric_square)}
      >
        <AutoAwesomeMotionOutlinedIcon color="inherit" fontSize="medium" />
      </IconButton>
      <IconButton
        color="inherit"
        onClick={() => changeShape(shapes.animated_circle)}
      >
        <AnimationOutlinedIcon color="inherit" fontSize="medium" />
      </IconButton>
    </div>
  );
};

export default Header;
