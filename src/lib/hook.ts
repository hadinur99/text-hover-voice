import { useEffect, useState } from "react";

/**
 * Gets bounding boxes for an element. This is implemented for you
 */
export function getElementBounds(elem: HTMLElement) {
  const bounds = elem.getBoundingClientRect();
  const top = bounds.top + window.scrollY;
  const left = bounds.left + window.scrollX;

  return {
    x: left,
    y: top,
    top,
    left,
    width: bounds.width,
    height: bounds.height,
  };
}

/**
 * **TBD:** Implement a function that checks if a point is inside an element
 */
export function isPointInsideElement(
  coordinate: { x: number; y: number },
  element: HTMLElement,
): boolean {
  const rect = element.getBoundingClientRect();

  const isInside =
    coordinate.x >= rect.left &&
    coordinate.x <= rect.right &&
    coordinate.y >= rect.top &&
    coordinate.y <= rect.bottom;

  return isInside;
}

/**
 * **TBD:** Implement a function that returns the height of the first line of text in an element
 * We will later use this to size the HTML element that contains the hover player
 */
export function getLineHeightOfFirstLine(element: HTMLElement): number {
  // Create a temporary span element
  const tempSpan = document.createElement("span");

  // Copy styles from the original element to the temporary span
  const computedStyle = window.getComputedStyle(element);
  tempSpan.style.fontFamily = computedStyle.fontFamily;
  tempSpan.style.fontSize = computedStyle.fontSize;
  tempSpan.style.fontWeight = computedStyle.fontWeight;
  tempSpan.style.fontStyle = computedStyle.fontStyle;
  tempSpan.style.lineHeight = computedStyle.lineHeight;
  tempSpan.style.position = "absolute";
  tempSpan.style.visibility = "hidden";
  tempSpan.style.whiteSpace = "nowrap";

  // Add the first line of text to the temporary span
  tempSpan.textContent = element.textContent?.split("\n")[0] || "";

  // Append the temporary span to the body
  document.body.appendChild(tempSpan);

  // Measure the height of the temporary span
  const lineHeight = tempSpan.getBoundingClientRect().height;

  // Remove the temporary span from the body
  document.body.removeChild(tempSpan);

  return lineHeight;
}

export type HoveredElementInfo = {
  element: HTMLElement;
  top: number;
  left: number;
  heightOfFirstLine: number;
};

/**
 * **TBD:** Implement a React hook to be used to help to render hover player
 * Return the absolute coordinates on where to render the hover player
 * Returns null when there is no active hovered paragraph
 * Note: If using global event listeners, attach them window instead of document to ensure tests pass
 */
export function useHoveredParagraphCoordinate(
  parsedElements: HTMLElement[],
): HoveredElementInfo | null {
  const [hoveredElementInfo, setHoveredElementInfo] =
    useState<HoveredElementInfo | null>(null);

  useEffect(() => {
    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (parsedElements.includes(target)) {
        const rect = target.getBoundingClientRect();
        const computedStyle = getComputedStyle(target);
        const lineHeight = parseFloat(computedStyle.lineHeight);

        setHoveredElementInfo({
          element: target,
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          heightOfFirstLine: lineHeight,
        });
      }
    };

    const handleMouseOut = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (parsedElements.includes(target)) {
        setHoveredElementInfo(null);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    // window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.addEventListener("mouseover", handleMouseOver);
      // window.addEventListener("mouseout", handleMouseOut);
    };
  }, [parsedElements]);

  return hoveredElementInfo;
}
