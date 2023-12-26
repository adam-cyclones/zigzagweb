import React, { useContext } from "react";
import { render } from "@testing-library/react";
import { ResponsiveProvider, ResponsiveContext } from "./component";
import { describe, beforeAll, test, expect } from "bun:test";
import { Window } from "happy-dom";

let window: Window;
let document;

function TestComponent() {
  const { isSmall, isMedium, isLarge } = useContext(ResponsiveContext);

  return (
    <div>
      {isSmall && <div data-testid="small">Small Screen</div>}
      {isMedium && <div data-testid="medium">Medium Screen</div>}
      {isLarge && <div data-testid="large">Large Screen</div>}
    </div>
  );
}

describe("ResponsiveProvider", () => {
  beforeAll(() => {
    window = new Window({
      url: "https://localhost:8080",
      width: 601,
      height: 768,
    });

    document = window.document;
    document.body.innerHTML = '<div class="container"></div>';
  });

  test("provides isSmall context for small screens", async () => {
    expect(window.matchMedia("(max-width: 600px)").matches).toBe(2);
    const { getByTestId, findByText } = render(
      <ResponsiveProvider>
        <TestComponent />
      </ResponsiveProvider>
    );

    expect(await findByText("Small Screen")).toBeDefined(2);
  });
});
