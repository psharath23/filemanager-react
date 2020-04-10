export const SELECT = "SELECT";
export const PUSH_TO_STACK = "PUSH_TO_STACK";
export const POP_FROM_STACK = "POP_FROM_STACK";
export const ADD_FOLDER = "ADD_FOLDER";
export const REBUILD_STACK = "REBUILD_STACK";
export const TOGGLE_CONTEXT = "TOGGLE_CONTEXT";
export const TOGGLE_PROPERTIES = "TOGGLE_PROPERTIES";
export const select = Selected => ({
  type: SELECT,
  payload: Selected
});

export const pushToSTack = item => ({
  type: PUSH_TO_STACK,
  payload: item
});

export const popFromSTack = item => ({
  type: POP_FROM_STACK
});

export const rebuildStack = stack => ({
  type: REBUILD_STACK,
  payload: stack
});

export const toggleContext = contextName => ({
  type: TOGGLE_CONTEXT,
  payload: contextName
});

export const toggleProperties = item => ({
  type: TOGGLE_PROPERTIES,
  payload: item
});
