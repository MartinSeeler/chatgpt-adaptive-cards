import React from "react";
import { createRoot } from "react-dom/client";

export const reactDomRender = (
  reactElement: React.ReactElement
): HTMLElement | undefined => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(reactElement);
  return div;
};
