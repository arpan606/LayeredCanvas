import React, { useRef, useCallback, useEffect, useState } from "react";
import "./preview.css";
import shapes from "../../utils/shape-type";

const Preview = ({
  height = 250,
  width = 250,
  idx = 0,
  screen,
  onClick,
  selected,
}) => {
  const [canvasScreen, setcanvasScreen] = useState(screen);

  const widthPercentage = width / canvasScreen.screenWidth;
  const heightPercentage = height / canvasScreen.screenHeight;

  const canvasRef = useRef();

  useEffect(() => {
    setcanvasScreen(screen);
  }, [screen]);

  // Initialize canvas contexts
  const initializeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return { ctx: null, overlayCtx: null };

    const ctx = canvas.getContext("2d");
    return { ctx };
  }, []);

  const { ctx } = initializeCanvas();

  // Render all shapes
  useEffect(() => {
    if (!ctx) return;

    const drawShapes = (shape) => {
      ctx.strokeStyle = shape.strokeStyle;
      ctx.lineWidth = shape.lineWidth;

      ctx.beginPath();
      const x1 = shape.x1 * widthPercentage;
      const x2 = shape.x2 * widthPercentage;
      const y1 = shape.y1 * heightPercentage;
      const y2 = shape.y2 * heightPercentage;

      switch (shape.type) {
        case shapes.line:
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          break;
        case shapes.circle:
          ctx.arc(x1, y1, shape.radius * widthPercentage, 0, 2 * Math.PI);
          break;
        case shapes.rectangle:
          const width = x2 - x1;
          const height = y2 - y1;
          ctx.rect(x1, y1, width, height);
          break;
        case shapes.square:
          ctx.rect(
            x1,
            y1,
            shape.length * widthPercentage,
            shape.length * widthPercentage
          );
          break;
        case shapes.animated_circle:
        case shapes.concentric_circle:
          ctx.arc(x1, y1, shape.radius * widthPercentage, 0, 2 * Math.PI);
          break;
        case shapes.concentric_rectangle:
          const cWidth = x2 - x1;
          const cHeight = y2 - y1;
          ctx.rect(x1, y1, cWidth, cHeight);
          break;
        case shapes.concentric_square:
          ctx.rect(
            x1,
            y1,
            shape.length * widthPercentage,
            shape.length * widthPercentage
          );
          break;
        default:
          break;
      }
      ctx.stroke();
    };

    canvasScreen.points.forEach(drawShapes);
  }, [ctx, canvasScreen, widthPercentage, heightPercentage]);

  return (
    <div
      className="preview-screen-component"
      style={{ height: height, width: width }}
      onClick={() => onClick(idx)}
      data-selected={selected}
    >
      <canvas
        id={`preview${idx}`}
        ref={canvasRef}
        width={width}
        height={height}
      ></canvas>
    </div>
  );
};

export default Preview;
