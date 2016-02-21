import * as Actions from '/client/lib/actions';

export const initialState = IMap({
   nodes : IList([

   ]),
   links : IList([

   ]),
   moment: IMap({
      mapId : null,
      userId: null,
      active: IMap({
         shape: Actions.ObjectShape.NULL,
         ref: null
      })
   })  
})

function findObj(state, id) {
   return state.findIndex(
            (o) => o.get('id') === id
   );
}
let index = -1;
let obj = null;

function MoNodesReducer(state = IList([]), action) {
   switch(action.type) {
      case Actions.ADD_NODE:
         obj = IMap({
            id: action.id,
            text: action.text,
            x: action.x,
            y: action.y,
            root: action.root,
            creator: action.creator
         });
         return state.push(obj);
      case Actions.ADD_SUBNODE:
         return state;
      case Actions.RENAME_NODE:
         index = findObj(state, action.id);
         return state.set(index, 
            state.get(index)
               .set('text', action.text)
         );
      case Actions.MOVE_NODE:
         index = findObj(state, action.id);
         return state.set(index,
            state.get(index)
               .set('x', action.x)
               .set('y', action.y)
         );
      case Actions.DELETE_NODE:
         return state.delete(findObj(state, action.id));
      default:
         return state;
   }
}

function MoMentReducer(state = IMap({}), action)
{
   switch(action.type) {
      case Actions.SET_MAPID:
         return state.set('mapId', action.id);
      case Actions.SET_CREATORID:
         return state.set('userId', action.id);
      case Actions.SET_ACTIVE_OBJECT:
         return state.setIn(['active', 'ref'], action.ref)
                     .setIn(['active', 'shape'], action.shape);
      default:
         return state;
   }
}

function MoLinkReducer(state = IList([]), action)
{
   switch(action.type) {
      default:
         return state;
   }
}

/*const MoMindReducer = CombineReduxReducers({
   MoNodesReducer,
   MoMentReducer,
   MoLinkReducer
})*/



/*Combine Reducers*/


export default function MoMindReducer(state = initialState, action) {
   return state.set('nodes', MoNodesReducer(state.get('nodes'), action))
               .set('moment', MoMentReducer(state.get('moment'), action))
               .set('links', MoLinkReducer(state.get('link'), action))
}
/*
   Split Reducer
 function MoMindReducer(state = initialState, action) {
   switch(action.type)
   {
      case Actions.SET_MAPID:
      case Actions.SET_CREATORID:
      case Actions.SET_ACTIVE_OBJECT:
         return state.set('moment',
            MoMentReducer(state.get('moment'), action))
      case Actions.ADD_NODE:
      case Actions.ADD_SUBNODE:
      case Actions.RENAME_NODE:
      case Actions.MOVE_NODE:
      case Actions.DELETE_NODE:
         return state.set('nodes', 
            MoNodesReducer(state.get('nodes'), action));
      default:
         return state;
   }
}
   Big Reducer
 function MoMind(state=initialState, action) {
   switch(action.type)
   {
      case Actions.SET_MAPID:
         return state.set('mapId', action.id);
      case Actions.SET_CREATORID:
         return state.set('userId', action.id);
      case Actions.SET_ACTIVE_OBJECT:
         return state.setIn(['active', 'ref'], action.ref)
                     .setIn(['active', 'shape'], action.shape);
      case Actions.ADD_NODE:
         let node = IMap({
            id: action.id,
            text: action.text,
            x: action.x,
            y: action.y,
            root: action.root,
            creator: action.creator
         });
         return state.set('nodes', state.get('nodes').push(node));
      case Actions.ADD_SUBNODE:
         return state;
      case Actions.RENAME_NODE:
         return state.set('nodes', state.get('nodes').forEach(
            (node) => {
               if(node.id === action.id)
               {
                  node.text = action.text;
                  return;
               }
            }));
      case Actions.MOVE_NODE:
         return state.set('nodes', state.get('nodes').forEach(
            (node) => {
               if(node.id === action.id)
               {
                  node.x = action.x;
                  node.y = action.y;
                  return;
               }
            }
         ));
      case Actions.DELETE_NODE:
         let index = state.get('nodes').findIndex(
            (node) => node.id === action.id
         );
         return state.set('nodes', state.get('nodes').delete(index));
      default:
         return state;
   }
}*/