import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sameer Shahid Siddiqui - Frontend Developer Portfolio",
    short_name: "Sameer Siddiqui",
    description: "Professional portfolio of Sameer Shahid Siddiqui, Frontend Developer specializing in React, Next.js, and TypeScript.",
    start_url: "/",
    display: "standalone",
    background_color: "#040506",
    theme_color: "#040506",
    icons: [
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
