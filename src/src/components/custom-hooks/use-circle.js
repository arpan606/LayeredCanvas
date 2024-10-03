import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/app-provider";
import shapes from "../../utils/shape-type";

function useCircle({ updateState, overlayBoard, overlayCtx }) {
  const { state } = useContext(AppContext);

  const [isDrawing, setIsDrawing] = useState(false);
  const [initialCoordinate, setInitialCoordinate] = useState({ x: 0, y: 0 });
  const [lastCoordinate, setLastCoordinate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!overlayBoard || !overlayCtx || state.shape !== shapes.circle) return;

    const getRadius = (x1, x2, y1, y2) => {
      const r = Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
      return Math.sqrt(r);
    };

    const drawCircle = (e) => {
      overlayCtx.clearRect(0, 0, overlayBoard.width, overlayBoard.height);

      overlayCtx.beginPath();

      overlayCtx.arc(
        initialCoordinate.x,
        initialCoordinate.y,
        getRadius(
          initialCoordinate.x,
          e.offsetX,
          initialCoordinate.y,
          e.offsetY
        ),
        0,
        2 * Math.PI
      );

      overlayCtx.stroke();
      setLastCoordinate({ x: e.offsetX, y: e.offsetY });
    };

    const handleMouseDown = (e) => {
      setInitialCoordinate({ x: e.offsetX, y: e.offsetY });
      setIsDrawing(true);
    };

    const handleMouseUp = () => {
      updateState({
        x1: initialCoordinate.x,
        y1: initialCoordinate.y,
        radius: getRadius(
          initialCoordinate.x,
          lastCoordinate.x,
          initialCoordinate.y,
          lastCoordinate.y
        ),
        type: "CIRCLE",
        strokeStyle: overlayCtx.strokeStyle,
        lineWidth: overlayCtx.lineWidth,
      });
      setIsDrawing(false);
    };

    const handleMouseMove = (e) => {
      if (!isDrawing) {
        return;
      }
      drawCircle(e);
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
    isDrawing,
    initialCoordinate,
    state,
    updateState,
    lastCoordinate.x,
    lastCoordinate.y,
    overlayCtx,
  ]);

  return {};
}

export default useCircle;
