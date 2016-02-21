// Creates Actions for Redux Reducers
function ActionCreator(type, ...argNames) {
  return function(...args) {
    let action = {type};
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  }
}

// ------------------------------------------------------------ //
// ------------------- Node Manipulation ---------------------- //
// ------------------------------------------------------------ //

export const ADD_NODE = 'ADD_NODE'; //ACTION: Add a Node to the Mindmap
export const AddNode = ActionCreator(ADD_NODE, 'id', 'text', 'x', 'y', 'root', 'creator');

export const ADD_SUBNODE = 'ADD_SUBNODE'; //ACTION: Add a Node to the Mindmap as a Child of another Node
export const AddSubNode = ActionCreator(ADD_SUBNODE, 'id', 'text', 'x', 'y', 'parent', 'creator');

export const RENAME_NODE = 'RENAME_NODE'; //ACTION: Change the displayed name of the Node
export const RenameNode = ActionCreator(RENAME_NODE, 'id', 'text');

export const MOVE_NODE = 'MOVE_NODE'; //ACTION: Update the position of the node
export const MoveNode = ActionCreator(MOVE_NODE, 'id', 'x', 'y');

export const DELETE_NODE = 'DELETE_NODE'; //ACTION: Add a Node to the Mindmap as a Child of another Node
export const DeleteNode = ActionCreator(DELETE_NODE, 'id');

export const CHANGE_NODE_MODE = 'CHANGE_NODE_MODE'; //ACTION: Change the mode of a node
export const ChangeNodeMode = ActionCreator(CHANGE_NODE_MODE, 'id', 'mode');

// ------------------------------------------------------------ //
// ------------------- Link Manipulation ---------------------- //
// ------------------------------------------------------------ //
export const CREATE_LINK = 'CREATE_LINK'; //ACTION: Create a Link between two nodes
export const CreateLink = ActionCreator(CREATE_LINK, 'parent', 'child', 'mode', 'id');

export const REMOVE_LINK = 'REMOVE_LINK'; //ACTION: Remove a Link by Id
export const RemoveLink = ActionCreator(REMOVE_LINK, 'id');

export const REMOVE_LINK_BY_NODE = 'REMOVE_LINK_BY_NODE'; //ACTION: Remove every Link with this Id as a Child or Parent
export const RemoveLinkByNode = ActionCreator(REMOVE_LINK_BY_NODE, 'nodeid');


// ------------------------------------------------------------ //
// ------------------- State Manipulation --------------------- //
// ------------------------------------------------------------ //

export const SET_MAPID = 'SET_MAPID'; //ACTION: Set ID of this Map in State
export const SetMapId = ActionCreator(SET_MAPID, 'id');

export const SET_CREATORID = 'SET_CREATORID'; //ACTION: Set Id for the Curent Semi-User in State
export const SetCreatorId = ActionCreator(SET_CREATORID, 'id');

export const SET_ACTIVE_OBJECT = 'SET_ACTIVE_OBJECT'; //ACTION: Set Reference and Type of Active Object
export const SetActiveObject = ActionCreator(SET_ACTIVE_OBJECT, 'ref', 'shape');

// ------------------------------------------------------------ //
// -------------------- Type Constants ------------------------ //
// ------------------------------------------------------------ //

export const ObjectShape = {
   NODE: 'NODE',
   LINK: 'LINK',
   BOARD: 'BOARD',
   NULL: null
};

export const LinkMode = {
   FULL: 'FULL',
   DOTTED: 'DOTTED',
   NULL: null
};

export const NodeMode = {
   'DRAG': 'DRAG',
   'EDIT': 'EDIT'
}

/*Template:
export function AddNode(id, text, x, y) {
   return {
      type: ADD_NODE,
      id, text, x, y
   }
}*/