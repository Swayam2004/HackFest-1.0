import { useEffect, useRef, useCallback } from 'react';

interface MagneticDotsProps {
  /** CSS color of the dots */
  dotColor?: string;
  /** Spacing between dots in px */
  gap?: number;
  /** Base dot radius in px */
  dotRadius?: number;
  /** Radius of mouse influence area in px */
  mouseRadius?: number;
  /** How strongly dots repel from cursor (px displacement) */
  repelStrength?: number;
}

export default function MagneticDots({
  dotColor = 'rgba(192, 1, 0, 0.3)',
  gap = 24,
  dotRadius = 1.5,
  mouseRadius = 120,
  repelStrength = 14,
}: MagneticDotsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const r2 = mouseRadius * mouseRadius;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = dotColor;

    for (let x = gap / 2; x < width; x += gap) {
      for (let y = gap / 2; y < height; y += gap) {
        const dx = x - mx;
        const dy = y - my;
        const distSq = dx * dx + dy * dy;

        let drawX = x;
        let drawY = y;
        let radius = dotRadius;

        if (distSq < r2 && distSq > 0) {
          const dist = Math.sqrt(distSq);
          // Ease: stronger repel when closer
          const force = (1 - dist / mouseRadius) ** 2;
          const pushX = (dx / dist) * repelStrength * force;
          const pushY = (dy / dist) * repelStrength * force;
          drawX += pushX;
          drawY += pushY;
          // Dots near cursor glow slightly larger
          radius = dotRadius + 1.2 * force;
        }

        ctx.beginPath();
        ctx.arc(drawX, drawY, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    rafRef.current = requestAnimationFrame(draw);
  }, [dotColor, dotRadius, gap, mouseRadius, repelStrength]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ zIndex: 0 }}
    />
  );
}
