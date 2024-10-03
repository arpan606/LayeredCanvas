import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/app-provider";
import shapes from "../../utils/shape-type";

function useRectangle({ board, ctx, updateState }) {
  const { state } = useContext(AppContext);

  const [isDrawing, setIsDrawing] = useState(false);
  const [initialCoordinate, setInitialCoordinate] = useState({ x: 0, y: 0 });
  const [lastCoordinate, setLastCoordinate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!board || !ctx || state.shape !== shapes.concentric_recatangle) return;

    const drawRectangle = (e) => {
      setLastCoordinate({ x: e.offsetX, y: e.offsetY });

      if (lastCoordinate.x === -1 && lastCoordinate.y === -1) return;

      ctx.strokeRect(
        initialCoordinate.x,
        initialCoordinate.y,
        e.offsetX - initialCoordinate.x,
        e.offsetY - initialCoordinate.y
      );

      updateState({
        x1: initialCoordinate.x,
        x2: lastCoordinate.x,
        y1: initialCoordinate.y,
        y2: lastCoordinate.y,
        type: "RECTANGLE",
        strokeStyle: ctx.strokeStyle,
        lineWidth: ctx.lineWidth,
      });
    };

    const handleMouseDown = (e) => {
      setInitialCoordinate({ x: e.offsetX, y: e.offsetY });
      setIsDrawing(true);
    };

    const handleMouseUp = () => {
      setIsDrawing(false);
      setLastCoordinate({ x: -1, y: -1 });
    };

    const handleMouseMove = (e) => {
      if (!isDrawing) return;
      drawRectangle(e);
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
    ctx,
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
