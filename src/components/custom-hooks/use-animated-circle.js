import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/app-provider";
import shapes from "../../utils/shape-type";

function useAnimatedCircle({ board, ctx, updateState }) {
  const { state } = useContext(AppContext);

  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (!board || !ctx || state.shape !== shapes.animated_circle) return;

    const drawCircle = (e) => {
      ctx.beginPath();

      const radius = 15;

      ctx.arc(e.offsetX, e.offsetY, radius, 0, 2 * Math.PI);

      ctx.stroke();

      // update state
      updateState({
        x1: e.offsetX,
        y1: e.offsetY,
        radius: radius,
        type: "CIRCLE",
        strokeStyle: ctx.strokeStyle,
        lineWidth: ctx.lineWidth,
      });

    };

    const handleMouseDown = (e) => {
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
  }, [board, isDrawing, state, updateState, ctx]);

  return {};
}

export default useAnimatedCircle;
