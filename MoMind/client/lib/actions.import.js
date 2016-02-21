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

const ADD_NODE = 'ADD_NODE'; //ACTION: Add a free Node to the Mindmap, root is special styling 
const AddNode = ActionCreator(ADD_NODE, 'id', 'text', 'x', 'y', 'root', 'creator');

const ADD_SUBNODE = 'ADD_SUBNODE'; //ACTION: Add a Node to the Mindmap as a Child of another Node
const AddSubNode = ActionCreator(ADD_SUBNODE, 'id', 'text', 'x', 'y', 'parent', 'creator');

const RENAME_NODE = 'RENAME_NODE'; //ACTION: Change the displayed name of the Node
const RenameNode = ActionCreator(RENAME_NODE, 'id', 'text');

const MOVE_NODE = 'MOVE_NODE'; //ACTION: Update the position of the node
const MoveNode = ActionCreator(MOVE_NODE, 'id', 'x', 'y');

const DELETE_NODE = 'DELETE_NODE'; //ACTION: Add a Node to the Mindmap as a Child of another Node
const DeleteNode = ActionCreator(DELETE_NODE, 'id');

const CHANGE_NODE_MODE = 'CHANGE_NODE_MODE'; //ACTION: Change the mode of a node
const ChangeNodeMode = ActionCreator(CHANGE_NODE_MODE, 'id', 'mode');

// ------------------------------------------------------------ //
// ------------------- Link Manipulation ---------------------- //
// ------------------------------------------------------------ //
const CREATE_LINK = 'CREATE_LINK'; //ACTION: Create a Link between two nodes
const CreateLink = ActionCreator(CREATE_LINK, 'parent', 'child', 'mode', 'id');

const REMOVE_LINK = 'REMOVE_LINK'; //ACTION: Remove a Link by Id
const RemoveLink = ActionCreator(REMOVE_LINK, 'id');

const REMOVE_LINK_BY_NODE = 'REMOVE_LINK_BY_NODE'; //ACTION: Remove every Link with this Id as a Child or Parent
const RemoveLinkByNode = ActionCreator(REMOVE_LINK_BY_NODE, 'nodeid');

// ------------------------------------------------------------ //
// ------------------- State Manipulation --------------------- //
// ------------------------------------------------------------ //

const SET_MAPID = 'SET_MAPID'; //ACTION: Set ID of this Map in State
const SetMapId = ActionCreator(SET_MAPID, 'id');

const SET_CREATORID = 'SET_CREATORID'; //ACTION: Set Id for the Curent Semi-User in State
const SetCreatorId = ActionCreator(SET_CREATORID, 'id');

const SET_ACTIVE_OBJECT = 'SET_ACTIVE_OBJECT'; //ACTION: Set Reference and Type of Active Object
const SetActiveObject = ActionCreator(SET_ACTIVE_OBJECT, 'ref', 'shape');

// ------------------------------------------------------------ //
// -------------------- Export Constants ---------------------- //
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

export const Actions = {
   AddNode,
   AddSubNode,
   RenameNode,
   MoveNode,
   DeleteNode,
   ChangeNodeMode,
   CreateLink,
   RemoveLink,
   RemoveLinkByNode,
   SetMapId,
   SetCreatorId,
   SetActiveObject,
}

export const ActionConstants = {
   ADD_NODE,
   ADD_SUBNODE,
   RENAME_NODE,
   MOVE_NODE,
   DELETE_NODE,
   CHANGE_NODE_MODE,
   CREATE_LINK,
   REMOVE_LINK,
   REMOVE_LINK_BY_NODE,
   SET_MAPID,
   SET_CREATORID,
   SET_ACTIVE_OBJECT,
}
/*Template:
export function AddNode(id, text, x, y) {
   return {
      type: ADD_NODE,
      id, text, x, y
   }
}*/