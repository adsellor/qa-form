export type EventType = 'YES' | 'NO' | 'NEXT' | 'END' | 'INITIAL';

export interface EventObject {
  type: EventType;
  payload?: any;
}

export interface AppContext {
  [key: string]: any;
}

export interface Transition<ContextType> {
  target: string;
  guard?: (params: GuardParams<ContextType>) => boolean;
}

export interface MachineDefinition<ContextType> {
  initial: string;
  context: ContextType;
  states: {
    [key: string]: {
      on?: {
        [key in EventType]?: string | Transition<ContextType>;
      };
      effect?: (params: EffectParams<ContextType>) => (() => void) | void;
    };
  };
  on?: {
    [key in EventType]?: string | Transition<ContextType>;
  };
  verbose?: boolean;
  console?: Console;
}

export interface EffectParams<ContextType> {
  send: (event: EventType | EventObject) => void;
  setContext: (updater: (context: ContextType) => ContextType) => void;
  event: EventObject;
  context: ContextType;
}

export interface GuardParams<ContextType> {
  event: EventObject;
  context: ContextType;
}

export interface State<ContextType> {
  value: string;
  context: ContextType;
  event: EventObject;
}

export type InternalEvent<ContextType> = 
  | { type: 'SEND'; sendable: EventType | EventObject }
  | { type: 'SET_CONTEXT'; updater: (context: ContextType) => ContextType }

