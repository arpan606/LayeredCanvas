import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/app-provider";
import shapes from "../../utils/shape-type";

function useRectangle({ updateState, overlayBoard, overlayCtx }) {
  const { state } = useContext(AppContext);

  const [isDrawing, setIsDrawing] = useState(false);
  const [initialCoordinate, setInitialCoordinate] = useState({ x: 0, y: 0 });
  const [lastCoordinate, setLastCoordinate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!overlayBoard || !overlayCtx || state.shape !== shapes.rectangle)
      return;

    const drawRectangle = (e) => {
      overlayCtx.clearRect(0, 0, overlayBoard.width, overlayBoard.height);

      overlayCtx.strokeRect(
        initialCoordinate.x,
        initialCoordinate.y,
        e.offsetX - initialCoordinate.x,
        e.offsetY - initialCoordinate.y
      );

      setLastCoordinate({ x: e.offsetX, y: e.offsetY });
    };

    const handleMouseDown = (e) => {
      setInitialCoordinate({ x: e.offsetX, y: e.offsetY });
      setIsDrawing(true);
    };

    const handleMouseUp = () => {
      updateState({
        x1: initialCoordinate.x,
        x2: lastCoordinate.x,
        y1: initialCoordinate.y,
        y2: lastCoordinate.y,
        type: "RECTANGLE",
        strokeStyle: overlayCtx.strokeStyle,
        lineWidth: overlayCtx.lineWidth,
      });

      setIsDrawing(false);
    };

    const handleMouseMove = (e) => {
      if (!isDrawing) return;
      drawRectangle(e);
    };

    overlayBoard.addEventListener("mousedown", handleMouseDown);
    overlayBoard.addEventListener("mouseup", handleMouseUp);
    overlayBoard.addEventListener("mousemove", handleMouseMove);

    return () => {
      overlayBoard.removeEventListener("mousedown", handleMouseDown);
      overlayBoard.removeEventListener("mouseup", handleMouseUp);
      overlayBoard.removeEventListener("mousemove", handleMouseMove);
    };
  }, [
    overlayBoard,
    overlayCtx,
    isDrawing,
    initialCoordinate,
    state,
    updateState,
    lastCoordinate.offsetX,
    lastCoordinate.y,
    lastCoordinate.x,
  ]);

  return {};
}

export default useRectangle;
