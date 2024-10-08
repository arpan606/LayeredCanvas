import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/app-provider";
import shapes from "../../utils/shape-type";

function useSquare({ updateState, overlayBoard, overlayCtx }) {
  const { state } = useContext(AppContext);

  const [isDrawing, setIsDrawing] = useState(false);
  const [initialCoordinate, setInitialCoordinate] = useState({ x: -1, y: -1 });
  const [lastCoordinate, setLastCoordinate] = useState({ x: -1, y: -1 });

  useEffect(() => {
    if (!overlayBoard || !overlayCtx || state.shape !== shapes.square) return;

    const drawSquare = (e) => {
      overlayCtx.clearRect(0, 0, overlayBoard.width, overlayBoard.height);
      setLastCoordinate({ x: e.offsetX, y: e.offsetY });

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
        e.offsetX - initialCoordinate.x
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
          y1: initialCoordinate.y,
          length: lastCoordinate.x - initialCoordinate.x,
          type: "SQUARE",
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
      drawSquare(e);
    };

    overlayBoard.addEventListener("mousedown", handleMouseDown);
    overlayBoard.addEventListener("mouseup", handleMouseUp);
    overlayBoard.addEventListener("mousemove", handleMouseMove);

    return () => {
      overlayBoard.removeEventListener("mousedown", handleMouseDown);
      overlayBoard.removeEventListener("mouseup", handleMouseUp);
      overlayBoard.removeEventListener("mousemove", handleMouseMove);
    };
  }, [overlayBoard, overlayCtx, isDrawing, initialCoordinate, state, updateState, lastCoordinate.x, lastCoordinate.y]);

  return {};
}

export default useSquare;
