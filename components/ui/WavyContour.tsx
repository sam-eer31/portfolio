import React from "react";

export const WavyContour = ({ color, isActive }: { color: string; isActive: boolean }) => {
  return (
    <div
      className="absolute top-[-10%] left-[-15%] w-[130%] h-[60%] overflow-visible pointer-events-none z-0 transition-opacity duration-500"
      style={{ opacity: isActive ? 0.7 : 0.15 }}
    >
      <svg className="w-full h-full" viewBox="0 0 1200 700" preserveAspectRatio="none" aria-hidden="true" style={{ animation: isActive ? 'drift 18s ease-in-out infinite alternate' : 'none' }}>

        {/* dim contour */}
        <path d="M-80 35 C80 -20 150 30 240 70 C360 125 440 120 550 45 C690 -50 790 5 900 65 C1030 135 1100 110 1280 35" fill="none" strokeLinecap="round" stroke={color} strokeWidth="1" opacity="0.35" />
        <path d="M-130 395 C-10 325 90 330 180 385 C290 455 390 465 500 375 C620 275 750 285 865 360 C995 445 1130 455 1330 355" fill="none" strokeLinecap="round" stroke={color} strokeWidth="1" opacity="0.35" />
        <path d="M-150 515 C-30 445 70 450 165 505 C275 575 375 585 485 495 C605 395 735 405 850 480 C980 565 1145 575 1350 475" fill="none" strokeLinecap="round" stroke={color} strokeWidth="1" opacity="0.35" />
        <path d="M995 -50 C970 35 1030 80 1110 120 C1200 165 1250 220 1220 295 C1190 365 1240 430 1350 485" fill="none" strokeLinecap="round" stroke={color} strokeWidth="1" opacity="0.35" />

        {/* normal contour */}
        <path d="M-80 95 C40 35 125 50 215 105 C325 172 420 170 535 90 C665 -5 770 25 875 92 C1000 172 1100 170 1280 82" fill="none" strokeLinecap="round" stroke={color} strokeWidth="1.4" opacity="0.65" />
        <path d="M-100 215 C0 145 105 145 195 205 C305 280 405 285 515 195 C640 92 765 105 875 180 C1005 270 1115 275 1300 180" fill="none" strokeLinecap="round" stroke={color} strokeWidth="1.4" opacity="0.65" />
        <path d="M-120 335 C-5 265 95 270 185 325 C295 400 395 405 505 315 C625 215 755 225 870 300 C1000 385 1125 395 1320 295" fill="none" strokeLinecap="round" stroke={color} strokeWidth="1.4" opacity="0.65" />
        <path d="M-140 455 C-20 385 80 390 175 445 C285 515 385 525 495 435 C615 335 745 345 860 420 C990 505 1135 515 1340 415" fill="none" strokeLinecap="round" stroke={color} strokeWidth="1.4" opacity="0.65" />
        <path d="M935 -50 C910 30 970 75 1050 110 C1140 150 1190 215 1160 285 C1130 355 1180 420 1290 475" fill="none" strokeLinecap="round" stroke={color} strokeWidth="1.4" opacity="0.65" />

        {/* bright contour */}
        <path d="M-90 155 C20 85 115 85 205 145 C310 215 410 225 525 135 C650 38 760 65 875 135 C1010 218 1110 220 1290 125" fill="none" strokeLinecap="round" stroke={color} strokeWidth="2.5" opacity="0.95" />
        <path d="M-110 275 C0 205 100 205 190 265 C300 340 400 345 510 255 C635 150 760 165 875 240 C1000 325 1120 335 1310 235" fill="none" strokeLinecap="round" stroke={color} strokeWidth="2.5" opacity="0.95" />
        <path d="M875 -50 C850 30 910 70 990 105 C1090 150 1140 205 1110 280 C1080 350 1130 410 1240 465" fill="none" strokeLinecap="round" stroke={color} strokeWidth="2.5" opacity="0.95" />
      </svg>

      {/* Fade out the bottom of the waves */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#060913]/30 to-[#060913] z-10" />
    </div>
  );
};
