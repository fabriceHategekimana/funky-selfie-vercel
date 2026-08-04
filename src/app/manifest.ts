import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FunkySelfie | Location Photobooth en Suisse",
    short_name: "FunkySelfie",
    description: "Location de photobooth professionnel en Suisse — livré, installé, géré de A à Z.",
    start_url: "/",
    display: "standalone",
    background_color: "#0d1b1e",
    theme_color: "#0d1b1e",
    icons: [
      { src: "/images/favicon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/images/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
