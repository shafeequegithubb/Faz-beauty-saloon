import { useEffect, useState } from "react";

export default function SmokeCursor() {
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPoints((prev) => [...prev.slice(-30), { x: e.clientX, y: e.clientY }]);
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      {points.map((point, index) => (
        <div
          key={index}
          style={{
            position: "fixed",
            left: point.x,
            top: point.y,
            width: 30,
            height: 30,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(212,175,55,0.3), transparent)",
            filter: "blur(15px)",
            pointerEvents: "none",
            zIndex: 9999,
            transform: "translate(-50%, -50%)",
            opacity: index / points.length,
          }}
        />
      ))}

      {points.length > 0 && (
        <div
          style={{
            position: "fixed",
            left: points[points.length - 1].x,
            top: points[points.length - 1].y,
            width: 20,
            height: 20,
            border: "2px solid #d4af37",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 10000,
            boxShadow: "0 0 20px #d4af37",
          }}
        />
      )}
    </>
  );
}