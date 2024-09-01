# Project Overview

Create a "Hover Player" feature. If a user hovers over a paragraph, a play button should appear next to the paragraph. Clicking on this button should start playback.

The only requirement for correctness of functionality is that the core tests (unit and integration) pass, however making improvements to the solution is still encouraged.

### Example of Final Result

Check out this demo video of a working prototype example of the final result:

![Example](demo.gif)

## Task Details

- `index.html` file contains a simple HTML document consisting of various different kinds of html elements like blockquotes, paragraphs etc. This is the mark up that will render when you run the project and for integration tests.
- The main.tsx file contains the boiler-plate needed, to render the `HoverPlayer` component.
- The play.ts file contains `speechify` function which can be used to perform playback on an element.
- A list of elements to be ignored while parsing readable elements for hover player is also provided in the `./src/lib/parser.ts`. All parsing code should be implemented in this file.

### Implementation Checklist

- [ ] **getTopLevelReadableElements:** Implement a parsing mechanism that gets all the top level readable elements based on heuristics provided. (`./src/lib/parser.ts`)
- [ ] **useHoveredParagraphCoordinate:** Implement functions and hook that lets you get information about the currently hovered element. (`./src/lib/hook.ts`)
- [ ] **UI:** Implement hover player react component. (`./src/lib/HoverPlayer.tsx`). For playback, utilise the `speechify` function in ./src/lib/play.ts
- [ ] **A working prototype of Hover Player feature**: The final result should be a working prototype of the Hover Player feature, where hovering over a paragraph should show a play button. Clicking on this button should start playback. You can utilize the built-in `speechify` function on the `play.ts` file to help you with this.

---

## Setup

1. Clone the repository and run `npm install` to install the dependencies.
   > Please use Node version 20.x.x.
2. Install playwright using `npx playwright install chromium --with-deps`.
3. Run `npm test` to run unit tests via vite.
4. Run `npm run playwright` to run integration test.
5. Run `npm run dev` to start the dev server.
