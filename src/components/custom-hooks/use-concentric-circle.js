import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/app-provider";
import shapes from "../../utils/shape-type";

function useConcentricCircle({ board, ctx, updateState }) {
  const { state } = useContext(AppContext);

  const [isDrawing, setIsDrawing] = useState(false);
  const [initialCoordinate, setInitialCoordinate] = useState({ x: 0, y: 0 });
  const [lastCoordinate, setLastCoordinate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!board || !ctx || state.shape !== shapes.concentric_circle) return;

    const getRadius = (x1, x2, y1, y2) => {
      const r = Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
      return Math.sqrt(r);
    };

    const drawCircle = (e) => {
      ctx.beginPath();

      const radius = getRadius(
        initialCoordinate.x,
        e.offsetX,
        initialCoordinate.y,
        e.offsetY
      );

      ctx.arc(initialCoordinate.x, initialCoordinate.y, radius, 0, 2 * Math.PI);

      ctx.stroke();

      // update state
      updateState({
        x1: initialCoordinate.x,
        y1: initialCoordinate.y,
        radius: radius,
        type: "CIRCLE",
        strokeStyle: ctx.strokeStyle,
        lineWidth: ctx.lineWidth,
      });

      setLastCoordinate({ x: e.offsetX, y: e.offsetY });
    };

    const handleMouseDown = (e) => {
      setInitialCoordinate({ x: e.offsetX, y: e.offsetY });
      setIsDrawing(true);
    };

    const handleMouseUp = () => {
      setIsDrawing(false);
    };

    const handleMouseMove = (e) => {
      if (!isDrawing) {
        return;
      }
      drawCircle(e);
    };

    board.addEventListener("mousedown", handleMouseDown);
    board.addEventListener("mouseup", handleMouseUp);
    board.addEventListener("mousemove", handleMouseMove);

    return () => {
      board.removeEventListener("mousedown", handleMouseDown);
      board.removeEventListener("mouseup", handleMouseUp);
      board.removeEventListener("mousemove", handleMouseMove);
    };
  }, [
    board,
    isDrawing,
    initialCoordinate,
    state,
    updateState,
    lastCoordinate.x,
    lastCoordinate.y,
    ctx,
  ]);

  return {};
}

export default useConcentricCircle;
