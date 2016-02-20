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

//ACTION: Add a Node to the Mindmap
const ADD_NODE = 'ADD_NODE';
export const AddNode = ActionCreater(ADD_NODE, 'id', 'text', 'x', 'y');





/*Template:
export function AddNode(id, text, x, y) {
   return {
      type: ADD_NODE,
      id, text, x, y
   }
}*/