import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/header/header";
import DrawingBoard from "./pages/drawing-board/drawing-board";
import "./App.css";
import { AppProvider } from "./context/app-provider";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Layers from "./section/layers/layers";

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="body-section">
          <Header />
          <DrawingBoard />
          <Layers/>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
