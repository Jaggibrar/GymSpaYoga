import { useEffect } from "react";

/**
 * Best-effort image/screenshot protection.
 * Note: True screenshot prevention is impossible in browsers,
 * but we deter casual saving/copying via right-click, drag, selection,
 * keyboard shortcuts, and PrintScreen detection.
 */
const ImageProtection = () => {
  useEffect(() => {
    const blockContextOnImage = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === "IMG" || target.closest("img, picture, [data-protected]"))) {
        e.preventDefault();
      }
    };

    const blockDrag = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === "IMG" || target.closest("img, picture"))) {
        e.preventDefault();
      }
    };

    const blockKeys = (e: KeyboardEvent) => {
      // Block PrintScreen
      if (e.key === "PrintScreen") {
        try {
          navigator.clipboard.writeText("");
        } catch {}
        e.preventDefault();
      }
      // Block Ctrl/Cmd+S, Ctrl+Shift+S (save), Ctrl+P (print), Ctrl+Shift+I/J/C (devtools)
      const ctrl = e.ctrlKey || e.metaKey;
      if (
        (ctrl && ["s", "p", "u"].includes(e.key.toLowerCase())) ||
        (ctrl && e.shiftKey && ["s", "i", "j", "c"].includes(e.key.toLowerCase())) ||
        e.key === "F12"
      ) {
        e.preventDefault();
      }
    };

    const blurOnPrintScreen = () => {
      // When window loses focus (e.g., snipping tool), briefly hide images
      document.body.classList.add("hide-protected-images");
      setTimeout(() => document.body.classList.remove("hide-protected-images"), 1500);
    };

    document.addEventListener("contextmenu", blockContextOnImage);
    document.addEventListener("dragstart", blockDrag);
    document.addEventListener("keydown", blockKeys);
    window.addEventListener("blur", blurOnPrintScreen);

    return () => {
      document.removeEventListener("contextmenu", blockContextOnImage);
      document.removeEventListener("dragstart", blockDrag);
      document.removeEventListener("keydown", blockKeys);
      window.removeEventListener("blur", blurOnPrintScreen);
    };
  }, []);

  return null;
};

export default ImageProtection;
