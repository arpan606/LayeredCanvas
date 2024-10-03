import { createContext, useReducer } from "react";

// INIITAL STATE
const initialState = {
  shape: "LINE",
  screens: [],
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
