export default function SpeedLines({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none overflow-hidden ${className}`}
    >
      <div
        className="animate-speed-line h-[3px] w-1/3 -skew-x-12 bg-brand-orange"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="animate-speed-line mt-2 h-[2px] w-1/4 -skew-x-12 bg-brand-chrome"
        style={{ animationDelay: "0.4s" }}
      />
      <div
        className="animate-speed-line mt-2 h-[2px] w-1/5 -skew-x-12 bg-brand-orange-light"
        style={{ animationDelay: "0.8s" }}
      />
    </div>
  );
}
