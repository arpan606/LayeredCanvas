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
  const { dispatch, state } = useContext(AppContext);

  const changeShape = (shape = "LINE") => {
    dispatch({ type: "SHAPE", shape });
  };

  return (
    <div className="header">
      <IconButton
        color={shapes.line === state.shape ? "primary" : "inherit"}
        onClick={() => changeShape(shapes.line)}
      >
        <BrushIcon fontSize="medium" />
      </IconButton>

      <IconButton
        color={shapes.circle === state.shape ? "primary" : "inherit"}
        onClick={() => changeShape(shapes.circle)}
      >
        <PanoramaFishEyeOutlinedIcon fontSize="medium" />
      </IconButton>
      <IconButton
        color={shapes.rectangle === state.shape ? "primary" : "inherit"}
        onClick={() => changeShape(shapes.rectangle)}
      >
        <RectangleOutlinedIcon fontSize="medium" />
      </IconButton>
      <IconButton
        color={shapes.square === state.shape ? "primary" : "inherit"}
        onClick={() => changeShape(shapes.square)}
      >
        <SquareOutlinedIcon fontSize="medium" />
      </IconButton>
      <IconButton
        color={
          shapes.concentric_circle === state.shape ? "primary" : "inherit"
        }
        onClick={() => changeShape(shapes.concentric_circle)}
      >
        <RadioButtonCheckedOutlinedIcon fontSize="medium" />
      </IconButton>
      <IconButton
        color={
          shapes.concentric_recatangle === state.shape ? "primary" : "inherit"
        }
        onClick={() => changeShape(shapes.concentric_recatangle)}
      >
        <ContentCopyOutlinedIcon fontSize="medium" />
      </IconButton>
      <IconButton
        color={
          shapes.concentric_square === state.shape ? "primary" : "inherit"
        }
        onClick={() => changeShape(shapes.concentric_square)}
      >
        <AutoAwesomeMotionOutlinedIcon fontSize="medium" />
      </IconButton>
      <IconButton
        color={shapes.animated_circle === state.shape ? "primary" : "inherit"}
        onClick={() => changeShape(shapes.animated_circle)}
      >
        <AnimationOutlinedIcon fontSize="medium" />
      </IconButton>
    </div>
  );
};

export default Header;
