import { createContext, useReducer } from "react";
import shapes from "../utils/shape-type";

// INIITAL STATE
const initialState = {
  shape: shapes.line,
  screens: [
    {
      screenHeight: window.innerHeight,
      screenWidth: window.innerWidth,
      points: [],
    },
  ],
  currentScreenId: 0,
  strokeStyle: "",
  strokeWidth: 0,
  color: "#3700BC",
  opacity: 1,
  slopinessFactor: 0,
};

// REDUCER
const reducer = (state, action) => {
  switch (action.type) {
    case "SHAPE":
      return { ...state, shape: action.shape };
    case "UPDATE_SCREEN":
      let newScreens = [...state.screens];
      newScreens[action.idx] = action.screen;
      return { ...state, screens: newScreens };
    case "ADD_SCREEN":
      const screen = {
        screenHeight: window.innerHeight,
        screenWidth: window.innerWidth,
        points: [],
      };
      return { ...state, screens: [...state.screens, screen] };
    case "CHANGE_SCREEN_ID":
      return { ...state, currentScreenId: action.id };
    case "STROKE_STYLE":
      return { ...state, strokeStyle: action.style };
    case "STROKE_WIDTH":
      return { ...state, strokeWidth: action.width };
    case "OPACITY":
      return { ...state, opacity: action.opacity };
    case "SLOPPINESS_FACTOR":
      return { ...state, slopinessFactor: action.slopinessFactor };
    case "COLOR":
      return { ...state, color: action.color };
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
