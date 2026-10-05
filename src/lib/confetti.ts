"use client";

import confetti from "canvas-confetti";

/** Themed celebration burst — uses current CSS primary color. */
export function celebrate(intensity: "small" | "big" = "small") {
  const styles = getComputedStyle(document.documentElement);
  const primary =
    styles.getPropertyValue("--primary").trim() || "oklch(0.62 0.21 355)";
  const accent =
    styles.getPropertyValue("--accent").trim() || "oklch(0.94 0.05 15)";

  const colors = [primary, accent, "#fbbf24", "#34d399"];

  if (intensity === "big") {
    const end = Date.now() + 900;
    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.7 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors,
    });
  } else {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.65 },
      colors,
    });
  }
}
