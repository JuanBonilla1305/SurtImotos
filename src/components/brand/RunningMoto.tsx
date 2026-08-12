// Coordenadas del logo fuente (500x500) obtenidas por análisis de píxeles.
const SOURCE_SIZE = 500;
const WHEELS = [
  { cx: 151, cy: 226.5, r: 44 }, // rueda trasera
  { cx: 404, cy: 225, r: 43 }, // rueda delantera
];

export default function RunningMoto({ size = 100 }: { size?: number }) {
  const scale = size / SOURCE_SIZE;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* cuerpo de la moto */}
      <div
        className="absolute inset-0 splash-bob"
        style={{
          backgroundImage: "url(/brand/logo-transparent.png)",
          backgroundSize: `${size}px ${size}px`,
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* ruedas girando */}
      {WHEELS.map((w, i) => {
        const wheelSize = 2 * w.r * scale;
        const left = (w.cx - w.r) * scale;
        const top = (w.cy - w.r) * scale;
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
                width: size,
                height: size,
                left: -left,
                top: -top,
                backgroundImage: "url(/brand/wheels-layer.png)",
                backgroundSize: `${size}px ${size}px`,
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
