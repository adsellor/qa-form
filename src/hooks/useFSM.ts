import { useReducer, useCallback, useEffect } from "react";
import { MachineDefinition, State, InternalEvent, EventObject, EventType } from "../types";
import { right, left, fold } from "../utils";

const createInitialState = <ContextType>(definition: MachineDefinition<ContextType>): State<ContextType> => {
  return {
    value: definition.initial,
    context: definition.context,
    event: { type: 'INITIAL' as EventType },
  };
};

const createReducer = <ContextType>(definition: MachineDefinition<ContextType>) =>
  (state: State<ContextType>, internalEvent: InternalEvent<ContextType>): State<ContextType> => {
    if (internalEvent.type === 'SET_CONTEXT') {
      const nextContext = internalEvent.updater(state.context);
      return { ...state, context: nextContext };
    }

    if (internalEvent.type === 'SEND') {
      const sendable = internalEvent.sendable;
      const event = typeof sendable === 'string' ? { type: sendable } : sendable;
      const stateNode = definition.states[state.value];
      const resolvedTransition = stateNode.on?.[event.type] ?? definition.on?.[event.type];

      if (!resolvedTransition) {
        return state;
      }

      const transitionResult = typeof resolvedTransition === 'string'
        ? right(resolvedTransition)
        : resolvedTransition.guard && !resolvedTransition.guard({ event, context: state.context })
          ? left('Guard denied transition')
          : right(resolvedTransition.target);

      return fold<any, any, any>(
        transitionResult,
        (error) => {
          console.log(error);
          return state;
        },
        (nextStateValue) => ({
          value: nextStateValue,
          context: state.context,
          event,
        })
      );
    }

    throw new Error(`Unhandled event type: ${internalEvent}`);
  };

export const useFSM = <ContextType>(definition: MachineDefinition<ContextType>) => {
  const [state, dispatch] = useReducer(createReducer(definition), createInitialState(definition));

  const send = useCallback((sendable: EventType | EventObject) => {
    console.log(sendable)
    dispatch({ type: 'SEND', sendable });
  }, []);

  const setContext = useCallback((updater: (context: ContextType) => ContextType) => {
    dispatch({ type: 'SET_CONTEXT', updater });
  }, []);

  useEffect(() => {
    const entry = definition.states[state.value]?.effect;
    if (entry) {
      const exit = entry({
        send,
        setContext,
        event: state.event,
        context: state.context,
      });

      return exit;
    }
  }, [state.value, state.event, send, setContext, definition.states]);

  return { state, send, setContext };
};
