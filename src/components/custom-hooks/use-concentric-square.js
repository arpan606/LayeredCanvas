import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/app-provider";
import shapes from "../../utils/shape-type";

function useConcentricSquare({ board, ctx, updateState }) {
  const { state } = useContext(AppContext);

  const [isDrawing, setIsDrawing] = useState(false);
  const [initialCoordinate, setInitialCoordinate] = useState({ x: 0, y: 0 });
  const [lastCoordinate, setLastCoordinate] = useState({ x: -1, y: -1 });

  useEffect(() => {
    if (!board || !ctx || state.shape !== shapes.concentric_square) return;

    const drawSquare = (e) => {
      setLastCoordinate({ x: e.offsetX, y: e.offsetY });

      if (lastCoordinate.x === -1 && lastCoordinate.y === -1) return;

      ctx.strokeRect(
        initialCoordinate.x,
        initialCoordinate.y,
        e.offsetX - initialCoordinate.x,
        e.offsetX - initialCoordinate.x
      );

      updateState({
        x1: initialCoordinate.x,
        y1: initialCoordinate.y,
        length: lastCoordinate.x - initialCoordinate.x,
        type: "SQUARE",
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
      drawSquare(e);
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
    lastCoordinate.x,
    lastCoordinate.y,
  ]);

  return {};
}

export default useConcentricSquare;
