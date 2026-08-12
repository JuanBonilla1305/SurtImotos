// Coordenadas del logo fuente (500x500) obtenidas por análisis de píxeles.
const SOURCE_SIZE = 500;
const WHEELS = [
  { cx: 151, cy: 226.5, r: 44 }, // rueda trasera
  { cx: 404, cy: 225, r: 43 }, // rueda delantera
];

// Recorte con relleno alrededor del bbox real del contenido (x:22-481, y:115-360).
const CROP = { left: 15, top: 100, width: 470, height: 270 };

export default function RunningMoto({ width = 100 }: { width?: number }) {
  const scale = width / CROP.width;
  const height = CROP.height * scale;
  const sourceSize = SOURCE_SIZE * scale;

  return (
    <div style={{ position: "relative", width, height, overflow: "hidden" }}>
      {/* cuerpo de la moto */}
      <div
        className="absolute splash-bob"
        style={{
          width: sourceSize,
          height: sourceSize,
          left: -CROP.left * scale,
          top: -CROP.top * scale,
          backgroundImage: "url(/brand/logo-transparent.png)",
          backgroundSize: `${sourceSize}px ${sourceSize}px`,
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* ruedas girando */}
      {WHEELS.map((w, i) => {
        const wheelSize = 2 * w.r * scale;
        const left = (w.cx - w.r - CROP.left) * scale;
        const top = (w.cy - w.r - CROP.top) * scale;
        return (
          <div
            key={i}
            className="absolute overflow-hidden rounded-full"
            style={{ width: wheelSize, height: wheelSize, left, top }}
          >
            <div
              className="splash-spin"
              style={{
                position: "absolute",
                width: sourceSize,
                height: sourceSize,
                left: -(w.cx - w.r) * scale,
                top: -(w.cy - w.r) * scale,
                backgroundImage: "url(/brand/wheels-layer.png)",
                backgroundSize: `${sourceSize}px ${sourceSize}px`,
                backgroundRepeat: "no-repeat",
                transformOrigin: `${w.cx * scale}px ${w.cy * scale}px`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
