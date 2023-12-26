import { createActor, Actor } from "xstate";
import { offCanvasMenuMachine } from "./machine";
import { beforeEach, expect, test } from "bun:test";
import { sleep } from "bun";

let machine: Actor<any>;
beforeEach(() => {
  machine = createActor(offCanvasMenuMachine, {
    input: {
      isEnabled: true,
    },
  }).start();
  machine.send({ type: "ENABLE" });
});

test("The machine can be opened", async () => {
  machine.send({ type: "TOGGLE" });
  await sleep(400);
  expect(machine.getSnapshot().value).toBe("open");
});

test("The machine can be closed", async () => {
  machine.send({ type: "TOGGLE" });
  await sleep(400);
  machine.send({ type: "TOGGLE" });
  await sleep(400);
  expect(machine.getSnapshot().value).toBe("closed");
});

test("The machine can be opening during time", async () => {
  machine.send({ type: "TOGGLE" });
  await sleep(150);
  expect(machine.getSnapshot().value).toBe("opening");
});

test("The machine can be closing during time", async () => {
  machine.send({ type: "TOGGLE" });
  await sleep(350);
  machine.send({ type: "TOGGLE" });
  await sleep(150);
  expect(machine.getSnapshot().value).toBe("closing");
});

test("The machine will not responed when disabled", () => {
  machine.send({ type: "DISABLE" });
  machine.send({ type: "TOGGLE" });
  expect(machine.getSnapshot().value).toBe("closed");
});
