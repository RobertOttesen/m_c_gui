import { writable, readable } from "svelte/store";
import { interpret, createMachine } from "@xstate/fsm";

// ui
export const selectedTab = writable("");
export const selectedWidget = writable("");

// widgets
export const solaceConnectionWidgetMachine = writable(
  useMachine(
    createMachine({
      id: "connectMachine",
      initial: "disconnected",
      states: {
        disconnected: {
          on: {
            CONNECT_REQUEST: "connecting",
          },
        },
        connecting: {
          on: {
            DISCONNECTED: "disconnected",
            UP_NOTICE: "connected",
            ERROR: "error",
          },
        },
        connected: {
          on: {
            DISCONNECTED: "disconnected",
          },
        },
        error: {
          on: {
            CONNECT_REQUEST: "connecting",
          },
        },
      },
    })
  )
);

// utils

/**
 * useMachine.js
 * I'm not the author of this file, source here: https://codesandbox.io/s/yb6lq?file=/useMachine.js:0-465
 *
 * ajr notes:
 * This util takes a state machine object, interprets it, and starts a service that is configured to
 * update a Svelte store every time its state changes. See the codesandbox for an example of how to use this,
 * but be sure to use $state whenever you reference the exposed state property since it's a Svelte store;
 *
 **/
export function useMachine(machine, options) {
  const service = interpret(machine, options);

  const store = readable(machine.initialState, (set) => {
    service.subscribe((state) => {
      if (state.changed) {
        set(state);
      }
    });

    service.start();

    return () => {
      service.stop();
    };
  });

  return {
    state: store,
    send: service.send,
  };
}
