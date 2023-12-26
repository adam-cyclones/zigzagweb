import { createMachine, assign, setup } from "xstate";

// Define the context type
interface OffCanvasMenuContext {
  isEnabled: boolean;
}

// Define the event type
type OffCanvasMenuEvent =
  | { type: "TOGGLE" }
  | { type: "ENABLE" }
  | { type: "DISABLE" };

const offCanvasMenuMachine = setup({
  types: {} as {
    context: OffCanvasMenuContext;
    events: OffCanvasMenuEvent;
  },
}).createMachine({
  id: "offCanvasMenu",
  initial: "closed",
  context: {
    isEnabled: false,
  },
  on: {
    ENABLE: { actions: assign({ isEnabled: true }) },
    DISABLE: { actions: assign({ isEnabled: false }) },
  },
  states: {
    closed: {
      on: {
        TOGGLE: {
          target: "opening",
          guard: (e: { context: OffCanvasMenuContext }) =>
            e.context.isEnabled === true,
        },
      },
    },
    opening: {
      after: {
        300: { target: "open" },
      },
    },
    open: {
      on: { TOGGLE: "closing" },
    },
    closing: {
      after: {
        300: {
          target: "closed",
          guard: (e: { context: OffCanvasMenuContext }) =>
            e.context.isEnabled === true,
        },
      },
    },
  },
});

export { offCanvasMenuMachine };
