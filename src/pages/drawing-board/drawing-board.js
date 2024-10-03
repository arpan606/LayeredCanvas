import React, { useEffect, useState, useContext, useCallback } from "react";
import { useRef } from "react";
import "./drawing-board.css";
import { AppContext } from "../../context/app-provider";
import useLine from "../../components/custom-hooks/use-line";
import useCircle from "../../components/custom-hooks/use-circle";
import useRectangle from "../../components/custom-hooks/use-rectangle";
import useSquare from "../../components/custom-hooks/use-square";

const DrawingBoard = () => {
  const { state } = useContext(AppContext);

  // Main and overlay canvas refs
  const canvasRef = useRef();
  const overlayCanvasRef = useRef();

  // Store canvas state for all shapes
  const [canvasState, setCanvasState] = useState([]);
  const prevShapes = useRef([]);

  // Initialize canvas contexts
  const initializeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const overlayCanvas = overlayCanvasRef.current;
    if (!canvas || !overlayCanvas) return { ctx: null, overlayCtx: null };

    const ctx = canvas.getContext("2d");
    const overlayCtx = overlayCanvas.getContext("2d");

    ctx.strokeStyle = "blue";
    ctx.lineWidth = 1;
    overlayCtx.strokeStyle = "blue";
    overlayCtx.lineWidth = 1;

    return { ctx, overlayCtx };
  }, []);

  const { ctx, overlayCtx } = initializeCanvas();

  // Render all shapes
  useEffect(() => {
    if (!ctx) return;

    const newShapes = canvasState.slice(prevShapes.current.length);

    const drawShapes = (shape) => {
      ctx.strokeStyle = shape.strokeStyle;
      ctx.lineWidth = shape.lineWidth;

      ctx.beginPath();
      switch (shape.type) {
        case "LINE":
          ctx.moveTo(shape.x1, shape.y1);
          ctx.lineTo(shape.x2, shape.y2);
          break;
        case "CIRCLE":
          ctx.arc(shape.x1, shape.y1, shape.radius, 0, 2 * Math.PI);
          break;
        case "RECTANGLE":
          const width = shape.x2 - shape.x1;
          const height = shape.y2 - shape.y1;
          ctx.rect(shape.x1, shape.y1, width, height);
          break;
        case "SQUARE": {
          ctx.rect(shape.x1, shape.y1, shape.length, shape.length);
          break;
        }
        default:
          break;
      }
      ctx.stroke();
    };

    newShapes.forEach(drawShapes);
    prevShapes.current = canvasState;
  }, [ctx, canvasState]);

  // Apply overlay visibility as per state
  useEffect(() => {
    if (!overlayCanvasRef.current) return;
    overlayCanvasRef.current.style.display = [
      "CIRCLE",
      "SQUARE",
      "RECTANGLE",
    ].includes(state?.shape)
      ? "flex"
      : "none";
  }, [state?.shape]);

  // Store canvas state
  const handleCanvasState = useCallback((drawEvent) => {
    setCanvasState((prev) => [...prev, drawEvent]);
  }, []);

  // Custom hooks to draw shapes
  useLine({ board: canvasRef.current, ctx, updateState: handleCanvasState });
  useCircle({
    updateState: handleCanvasState,
    overlayBoard: overlayCanvasRef.current,
    overlayCtx,
  });
  useRectangle({
    updateState: handleCanvasState,
    overlayBoard: overlayCanvasRef.current,
    overlayCtx,
  });
  useSquare({
    updateState: handleCanvasState,
    overlayBoard: overlayCanvasRef.current,
    overlayCtx,
  });

  return (
    <div className="canvas-component">
      <canvas
        className="board-component"
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      ></canvas>
      <canvas
        className="overlay-board-component"
        ref={overlayCanvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      ></canvas>
    </div>
  );
};

export default DrawingBoard;
