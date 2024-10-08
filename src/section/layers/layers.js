import React, { useContext } from "react";
import Preview from "../../components/preview/preview";
import "./layers.css";
import { AppContext } from "../../context/app-provider";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";

const Layers = () => {
  const { state, dispatch } = useContext(AppContext);

  const toggleScreen = (id) => {
    dispatch({ type: "CHANGE_SCREEN_ID", id });
  };

  return (
    state?.screens?.length > 0 && (
      <div className="layers-section">
        {state.screens.map((screen, id) => (
          <Preview
            key={id}
            width={100}
            height={100}
            idx={id}
            screen={screen}
            onClick={toggleScreen}
            selected={id === state.currentScreenId}
          />
        ))}
        <AddLayer />
      </div>
    )
  );
};

const AddLayer = () => {
  const { state, dispatch } = useContext(AppContext);

  const addLayer = () => {
    dispatch({ type: "ADD_SCREEN" });
    dispatch({ type: "CHANGE_SCREEN_ID", id: state?.screens?.length });
  };

  if (state?.screens?.length === 3) return "";

  return (
    <div className="add-layers-section">
      <IconButton color="inherit" onClick={addLayer}>
        <AddIcon htmlColor="#fff" fontSize="medium" />
      </IconButton>
    </div>
  );
};

export default Layers;
