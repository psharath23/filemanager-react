import {
  SELECT,
  PUSH_TO_STACK,
  POP_FROM_STACK,
  ADD_FOLDER,
  REBUILD_STACK,
  TOGGLE_CONTEXT,
  TOGGLE_PROPERTIES
} from "../actions/filemanager.actions";
import { data } from "./../data";
const initialState = {
  Stack: [data],
  StackTrace: [0],
  Selected: [],
  Files: data,
  CurrentContext: "",
  CurrentPath: [],
  Info: {}
};
const FileManagerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT: {
      return {
        ...state,
        ...{
          Selected: action.payload
        }
      };
    }
    case PUSH_TO_STACK: {
      return {
        ...state,
        ...{
          Stack: [
            ...state.Stack,
            [...action.payload.children, ...action.payload.folder_files]
          ],
          StackTrace: [
            ...state.StackTrace,
            {
              id: action.payload.id,
              parent_folder_id: action.payload.parent_folder_id
            }
          ],
          CurrentPath: [...state.CurrentPath, action.payload.name]
        }
      };
    }
    case POP_FROM_STACK: {
      return {
        ...state,
        ...{
          Stack: [...state.Stack.slice(0, -1)],
          StackTrace: [...state.StackTrace.slice(0, -1)],
          CurrentPath: [...state.CurrentPath.slice(0, -1)]
        }
      };
    }
    case REBUILD_STACK: {
      return {
        ...state,
        ...{
          Stack: [...action.payload]
        }
      };
    }
    case ADD_FOLDER: {
      return;
    }
    case TOGGLE_CONTEXT: {
      return {
        ...state,
        ...{
          CurrentContext: action.payload
        }
      };
    }
    case TOGGLE_PROPERTIES: {
      return {
        ...state,
        ...{
          Info: action.payload
        }
      };
    }
    default:
      return state;
  }
};

export default FileManagerReducer;
