import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/app-provider";
import shapes from "../../utils/shape-type";

function useRectangle({ updateState, overlayBoard, overlayCtx }) {
  const { state } = useContext(AppContext);

  const [isDrawing, setIsDrawing] = useState(false);
  const [initialCoordinate, setInitialCoordinate] = useState({ x: -1, y: -1 });
  const [lastCoordinate, setLastCoordinate] = useState({ x: -1, y: -1 });

  useEffect(() => {
    if (!overlayBoard || !overlayCtx || state.shape !== shapes.rectangle)
      return;

    const drawRectangle = (e) => {
      setLastCoordinate({ x: e.offsetX, y: e.offsetY });
      overlayCtx.clearRect(0, 0, overlayBoard.width, overlayBoard.height);

      if (
        (lastCoordinate.x === -1 && lastCoordinate.y === -1) ||
        (initialCoordinate.x === -1 && initialCoordinate.y === -1)
      ) {
        return;
      }

      overlayCtx.strokeRect(
        initialCoordinate.x,
        initialCoordinate.y,
        e.offsetX - initialCoordinate.x,
        e.offsetY - initialCoordinate.y
      );
    };

    const handleMouseDown = (e) => {
      setInitialCoordinate({ x: e.offsetX, y: e.offsetY });
      setIsDrawing(true);
    };

    const handleMouseUp = () => {
      if (
        lastCoordinate.x !== -1 &&
        lastCoordinate.y !== -1 &&
        initialCoordinate.x !== -1 &&
        initialCoordinate.y !== -1
      ) {
        updateState({
          x1: initialCoordinate.x,
          x2: lastCoordinate.x,
          y1: initialCoordinate.y,
          y2: lastCoordinate.y,
          type: "RECTANGLE",
          strokeStyle: overlayCtx.strokeStyle,
          lineWidth: overlayCtx.lineWidth,
        });
      }

      setLastCoordinate({ x: -1, y: -1 });
      setInitialCoordinate({ x: -1, y: -1 });
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
