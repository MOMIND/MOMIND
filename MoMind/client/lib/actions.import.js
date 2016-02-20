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

const ADD_NODE = 'ADD_NODE'; //ACTION: Add a Node to the Mindmap
export const AddNode = ActionCreater(ADD_NODE, 'id', 'text', 'x', 'y', 'root', 'creator');

const ADD_SUBNODE = 'ADD_SUBNODE'; //ACTION: Add a Node to the Mindmap as a Child of another Node
export const AddSubNode = ActionCreater(ADD_SUBNODE, 'id', 'text', 'x', 'y', 'parent', 'creator');

const RENAME_NODE = 'RENAME_NODE'; //ACTION: Change the displayed name of the Node
export const RenameNode = ActionCreater(RENAME_NODE, 'id', 'text');

const MOVE_NODE = 'MOVE_NODE'; //ACTION: Update the position of the node
export const MoveNode = ActionCreater(MOVE_NODE, 'id', 'x', 'y');

const DELETE_NODE = 'DELETE_NODE'; //ACTION: Add a Node to the Mindmap as a Child of another Node
export const DeleteNode = ActionCreater(DELETE_NODE, 'id');

// ------------------------------------------------------------ //
// ------------------- Link Manipulation ---------------------- //
// ------------------------------------------------------------ //
const CREATE_LINK = 'CREATE_LINK'; //ACTION: Create a Link between two nodes
export const CreateLink = ActionCreater(CREATE_LINK, 'parent', 'child', 'type', 'id');

const REMOVE_LINK = 'REMOVE_LINK'; //ACTION: Remove a Link by Id
export const RemoveLink = ActionCreater(REMOVE_LINK, 'id');

const REMOVE_LINK_BY_NODE = 'REMOVE_LINK_BY_NODE'; //ACTION: Remove every Link with this Id as a Child or Parent
export const RemoveLinkByNode = ActionCreater(REMOVE_LINK_BY_NODE, 'nodeid');


// ------------------------------------------------------------ //
// ------------------- State Manipulation --------------------- //
// ------------------------------------------------------------ //

const SET_MAPID = 'SET_MAPID'; //ACTION: Set ID of this Map in State
export const SetMapId = ActionCreater(SET_MAPID, 'id');

const SET_CREATOR_ID = 'SET_CREATOR_ID'; //ACTION: Set Id for the Curent Semi-User in State
export const SetCreatorId = ActionCreater(SET_CREATOR_ID, 'id');

const SET_ACTIVE_OBJECT = 'SET_ACTIVE_OBJECT'; //ACTION: Set Reference and Type of Active Object
export const SetActiveObject = ActionCreater(SET_ACTIVE_OBJECT, 'ref', 'type');

// ------------------------------------------------------------ //
// -------------------- Type Constants ------------------------ //
// ------------------------------------------------------------ //

export const ActiveObjectTypes = {
   NODE: 'NODE',
   LINK: 'LINK'
};

export const LinkTypes = {
   FULL: 'FULL',
   DOTTED: 'DOTTED'
};


/*Template:
export function AddNode(id, text, x, y) {
   return {
      type: ADD_NODE,
      id, text, x, y
   }
}*/