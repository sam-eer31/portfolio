import React from 'react';

interface ConnectionProps {
  index: number;
  totalItems: number;
  neonColors: string[];
}

export function DesktopConnections({ index, totalItems, neonColors }: ConnectionProps) {
  if (index >= totalItems - 1) return null;

  const strokeColor = neonColors[index];
  const nextStrokeColor = neonColors[index + 1];
  
  if (index === 2) {
    return (
      <div className="absolute right-[50%] w-[calc(200%+4rem)] h-[350px] top-[40%] pointer-events-none hidden min-[900px]:block -z-10">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible">
          <defs>
            <linearGradient id={`grad-${index}`} x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={strokeColor} />
              <stop offset="100%" stopColor={nextStrokeColor} />
            </linearGradient>
          </defs>
          <path
            d="M 100,0 C 130,0 150,50 50,50 S -50,100 0,100"
            stroke={`url(#grad-${index})`}
            strokeWidth="8"
            opacity="0.2"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 100,0 C 130,0 150,50 50,50 S -50,100 0,100"
            stroke={`url(#grad-${index})`}
            strokeWidth="1.5"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div
          className="absolute right-0 top-0 w-2.5 h-2.5 -mr-[5px] -mt-[5px] rounded-full z-10"
          style={{ backgroundColor: strokeColor, boxShadow: `0 0 15px 2px ${strokeColor}`, willChange: "transform" }}
        />
        <div
          className="absolute left-0 bottom-0 w-2.5 h-2.5 -ml-[5px] -mb-[5px] rounded-full z-10"
          style={{ backgroundColor: nextStrokeColor, boxShadow: `0 0 15px 2px ${nextStrokeColor}`, willChange: "transform" }}
        />
      </div>
    );
  }

  const isFirstCol = index % 3 === 0;
  const yOffsetPx = isFirstCol ? 64 : -64;
  const yOffsetViewBox = yOffsetPx / 1.5;
  const isUpCurve = index === 1 || index === 3;
  const pathD = isUpCurve
            ? `M 0,50 C 30,-50 70,-50 100,${50 + yOffsetViewBox}`
            : `M 0,50 C 30,150 70,150 100,${50 + yOffsetViewBox}`;

  return (
    <div className="absolute top-[40%] left-[50%] w-[calc(100%+2rem)] h-[150px] -translate-y-1/2 pointer-events-none hidden min-[900px]:block -z-10">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible">
        <defs>
          <linearGradient id={`grad-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={strokeColor} />
            <stop offset="100%" stopColor={nextStrokeColor} />
          </linearGradient>
        </defs>
        <path
          d={pathD}
          stroke={`url(#grad-${index})`}
          strokeWidth="8"
          opacity="0.2"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={pathD}
          stroke={`url(#grad-${index})`}
          strokeWidth="1.5"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div
        className="absolute left-0 w-2.5 h-2.5 -ml-[5px] rounded-full z-10"
        style={{ top: '50%', marginTop: '-5px', backgroundColor: strokeColor, boxShadow: `0 0 15px 2px ${strokeColor}`, willChange: "transform" }}
      />
      <div
        className="absolute right-0 w-2.5 h-2.5 -mr-[5px] rounded-full z-10"
        style={{ top: `calc(50% + ${yOffsetPx}px)`, marginTop: '-5px', backgroundColor: nextStrokeColor, boxShadow: `0 0 15px 2px ${nextStrokeColor}`, willChange: "transform" }}
      />
    </div>
  );
}

export function TabletConnections({ index, totalItems, neonColors }: ConnectionProps) {
  if (index >= totalItems - 1) return null;

  const strokeColor = neonColors[index];
  const nextStrokeColor = neonColors[index + 1];

  if (index === 1 || index === 3) {
    return (
      <div className="absolute right-[50%] w-[calc(100%+2rem)] h-[350px] top-[40%] pointer-events-none hidden min-[300px]:max-[899px]:block -z-10">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible">
          <defs>
            <linearGradient id={`grad-2c-${index}`} x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={strokeColor} />
              <stop offset="100%" stopColor={nextStrokeColor} />
            </linearGradient>
          </defs>
          <path
            d="M 100,0 C 150,0 150,50 50,50 S -50,100 0,100"
            stroke={`url(#grad-2c-${index})`}
            strokeWidth="8"
            opacity="0.2"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 100,0 C 150,0 150,50 50,50 S -50,100 0,100"
            stroke={`url(#grad-2c-${index})`}
            strokeWidth="1.5"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className="absolute top-0 right-0 w-2 h-2 rounded-full translate-x-1/2 -translate-y-1/2 bg-white" style={{ boxShadow: `0 0 15px 2px ${strokeColor}`, willChange: "transform" }} />
        <div className="absolute bottom-0 left-0 w-2 h-2 rounded-full -translate-x-1/2 translate-y-1/2 bg-white" style={{ boxShadow: `0 0 15px 2px ${nextStrokeColor}`, willChange: "transform" }} />
      </div>
    );
  }

  const yOffsetPx = 64;
  const yOffsetViewBox = yOffsetPx / 1.5;
  const pathD = `M 0,50 C 40,50 60,${50 + yOffsetViewBox} 100,${50 + yOffsetViewBox}`;

  return (
    <div className="absolute top-[40%] left-[50%] w-[calc(100%+2rem)] h-[150px] -translate-y-1/2 pointer-events-none hidden min-[300px]:max-[899px]:block -z-10">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible">
        <defs>
          <linearGradient id={`grad-2c-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={strokeColor} />
            <stop offset="100%" stopColor={nextStrokeColor} />
          </linearGradient>
        </defs>
        <path
          d={pathD}
          stroke={`url(#grad-2c-${index})`}
          strokeWidth="8"
          opacity="0.2"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={pathD}
          stroke={`url(#grad-2c-${index})`}
          strokeWidth="1.5"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="absolute top-1/2 left-0 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 bg-white" style={{ boxShadow: `0 0 15px 2px ${strokeColor}`, willChange: "transform" }} />
      <div className="absolute left-full w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 bg-white" style={{ top: `calc(50% + ${yOffsetPx}px)`, boxShadow: `0 0 15px 2px ${nextStrokeColor}`, willChange: "transform" }} />
    </div>
  );
}
