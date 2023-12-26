import { offCanvasMenuMachine } from "./machine";
import { useMachine } from "@xstate/react";

function OffCanvasMenu() {
  const [state, send] = useMachine(offCanvasMenuMachine);

  const toggleMenu = () => {
    if (state.context.isEnabled) {
      send({ type: "TOGGLE" });
    }
  };

  return (
    <div role="dialog">
      <button onClick={toggleMenu}>
        {state.matches("closed") ? "Open Menu" : "Close Menu"}
      </button>
      {state.matches("open") && <div>{/* Menu Content Here */}</div>}
    </div>
  );
}
