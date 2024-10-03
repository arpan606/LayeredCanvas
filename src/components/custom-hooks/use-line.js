import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/app-provider";
import shapes from "../../utils/shape-type";

function useLine({ board, ctx, updateState }) {
  const { state } = useContext(AppContext);

  const [isDrawing, setIsDrawing] = useState(false);
  const [lastCoordinate, setLastCoordinate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!board || !ctx || state.shape !== shapes.line) return;

    const drawLine = (e) => {
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 1;

      // begin path
      ctx.beginPath();

      ctx.moveTo(lastCoordinate.x, lastCoordinate.y);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      updateState({
        x1: lastCoordinate.x,
        x2: e.offsetX,
        y1: lastCoordinate.y,
        y2: e.offsetY,
        type: "LINE",
        strokeStyle: ctx.strokeStyle,
        lineWidth: ctx.lineWidth,
      });
      setLastCoordinate({ x: e.offsetX, y: e.offsetY });
    };

    const handleMouseDown = (e) => {
      setLastCoordinate({ x: e.offsetX, y: e.offsetY });
      setIsDrawing(true);
    };

    const handleMouseUp = () => {
      setIsDrawing(false);
    };

    const handleMouseMove = (e) => {
      if (!isDrawing) return;
      drawLine(e);
    };

    board.addEventListener("mousedown", handleMouseDown);
    board.addEventListener("mouseup", handleMouseUp);
    board.addEventListener("mousemove", handleMouseMove);

    return () => {
      board.removeEventListener("mousedown", handleMouseDown);
      board.removeEventListener("mouseup", handleMouseUp);
      board.removeEventListener("mousemove", handleMouseMove);
    };
  }, [board, ctx, isDrawing, lastCoordinate, state, updateState]);

  return {};
}

export default useLine;
