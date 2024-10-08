import React, { useEffect, useState, useContext, useCallback } from "react";
import { useRef } from "react";
import "./drawing-board.css";
import { AppContext } from "../../context/app-provider";
import useLine from "../../components/custom-hooks/use-line";
import useCircle from "../../components/custom-hooks/use-circle";
import useRectangle from "../../components/custom-hooks/use-rectangle";
import useSquare from "../../components/custom-hooks/use-square";
import useConcentricCircle from "../../components/custom-hooks/use-concentric-circle";
import useConcentricRectangle from "../../components/custom-hooks/use-concentric-rectangle";
import useConcentricSquare from "../../components/custom-hooks/use-concentric-square";
import shapes from "../../utils/shape-type";
import useAnimatedCircle from "../../components/custom-hooks/use-animated-circle";

const DrawingBoard = () => {
  const { state, dispatch } = useContext(AppContext);

  // width, height
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Main and overlay canvas refs
  const canvasRef = useRef();
  const overlayCanvasRef = useRef();

  // Store canvas state for all shapes
  const [canvasState, setCanvasState] = useState([]);
  const prevShapes = useRef([]);
  const [canvasId, setCanvasId] = useState(-1);

  const [ctx, setCanvasCtx] = useState(null);
  const [overlayCtx, setCanvasOverlayCtx] = useState(null);

  // Initialize canvas contexts
  useEffect(() => {
    const canvas = canvasRef.current;
    const overlayCanvas = overlayCanvasRef.current;
    if (!canvas || !overlayCanvas) return { ctx: null, overlayCtx: null };

    const ctx = canvas.getContext("2d");
    const overlayCtx = overlayCanvas.getContext("2d");

    setCanvasCtx(ctx);
    setCanvasOverlayCtx(overlayCtx);
  }, []);

  // Render all shapes
  useEffect(() => {
    if (!ctx) return;

    const newShapes = canvasState.slice(prevShapes.current.length);

    const drawShapes = (shape) => {
      ctx.strokeStyle = shape.strokeStyle;
      ctx.lineWidth = shape.lineWidth;

      ctx.beginPath();
      switch (shape.type) {
        case shapes.line:
          ctx.moveTo(shape.x1, shape.y1);
          ctx.lineTo(shape.x2, shape.y2);
          break;
        case shapes.circle:
          ctx.arc(shape.x1, shape.y1, shape.radius, 0, 2 * Math.PI);
          break;
        case shapes.rectangle:
          const width = shape.x2 - shape.x1;
          const height = shape.y2 - shape.y1;
          ctx.rect(shape.x1, shape.y1, width, height);
          break;
        case shapes.square:
          ctx.rect(shape.x1, shape.y1, shape.length, shape.length);
          break;
        case shapes.animated_circle:
        case shapes.concentric_circle:
          ctx.arc(shape.x1, shape.y1, shape.radius, 0, 2 * Math.PI);
          break;
        case shapes.concentric_recatangle:
          const cWidth = shape.x2 - shape.x1;
          const cHeight = shape.y2 - shape.y1;
          ctx.rect(shape.x1, shape.y1, cWidth, cHeight);
          break;
        case shapes.concentric_square:
          ctx.rect(shape.x1, shape.y1, shape.length, shape.length);
          break;
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
      shapes.circle,
      shapes.square,
      shapes.rectangle,
    ].includes(state?.shape)
      ? "flex"
      : "none";
  }, [state?.shape]);

  // Store canvas state
  const handleCanvasState = useCallback(
    (drawEvent) => {
      setCanvasState((prev) => [...prev, drawEvent]);
      dispatch({
        type: "UPDATE_SCREEN",
        idx: state.currentScreenId,
        screen: {
          screenHeight: height,
          screenWidth: width,
          points: canvasState,
        },
      });
    },
    [canvasState, dispatch, height, state.currentScreenId, width]
  );

  // update canvas state depending upon the current selected screen
  useEffect(() => {
    if (canvasId !== state.currentScreenId) {
      const screen = state.screens[state.currentScreenId];
      setCanvasState(screen.points);

      prevShapes.current = [];
      setCanvasId(state.currentScreenId);

      if (ctx) {
        ctx.clearRect(0, 0, screen.screenWidth, screen.screenHeight);
      }
    }
  }, [state.currentScreenId, canvasId, state.screens, canvasState, state, ctx]);

  // update ctx styles
  useEffect(() => {
    if (!ctx || !overlayCtx) return;

    ctx.strokeStyle = state.color;
    ctx.lineWidth = state.strokeWidth;

    overlayCtx.strokeStyle = state.color;
    overlayCtx.lineWidth = state.strokeWidth;
  }, [
    state.strokeStyle,
    state.strokeWidth,
    state.color,
    state.opacity,
    state.sloppinessFactor,
    ctx,
    overlayCtx,
  ]);

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
  useConcentricCircle({
    board: canvasRef.current,
    ctx,
    updateState: handleCanvasState,
  });
  useConcentricRectangle({
    board: canvasRef.current,
    ctx,
    updateState: handleCanvasState,
  });
  useConcentricSquare({
    board: canvasRef.current,
    ctx,
    updateState: handleCanvasState,
  });
  useAnimatedCircle({
    board: canvasRef.current,
    ctx,
    updateState: handleCanvasState,
  });

  return (
    <div className="canvas-component">
      <canvas
        className="board-component"
        ref={canvasRef}
        width={width}
        height={height}
      ></canvas>
      <canvas
        className="overlay-board-component"
        ref={overlayCanvasRef}
        width={width}
        height={height}
      ></canvas>
    </div>
  );
};

export default DrawingBoard;
