import {ActionConstants, ObjectShape} from '/client/lib/actions';

export const initialState = IMap({
   nodes : IMap({

   }),
   links : IMap({

   }),
   moment: IMap({
      mapId : null,
      userId: null,
      active: IMap({
         shape: ObjectShape.NULL,
         ref: null
      })
   })  
})

let obj = null;

function MoNodesReducer(state = IMap({}), action) {
   switch(action.type) {
      case ActionConstants.ADD_NODE:
         obj = IMap({
            text: action.text,
            x: action.x,
            y: action.y,
            root: action.root,
            creator: action.creator,
            parent: ISet([action.parent]),
            child: ISet([])
         });
         return state.set(action.id, obj);
      case ActionConstants.ADD_SUBNODE:
         obj = IMap({
               text: action.text,
               x: action.x,
               y: action.y,
               root: action.root,
               creator: action.creator,
               parent: ISet([action.parent]),
               child: ISet([])
            });
         state = state.set(action.id, obj);

         obj = state.getIn([action.parent, 'child']).add(action.id);
         state = state.setIn([action.parent, 'child'], obj);
         return state;
      case ActionConstants.RENAME_NODE:
         return state.setIn([action.id, 'text'], action.text);
      case ActionConstants.MOVE_NODE:
         return state.setIn([action.id, 'x'], action.x)
                     .setIn([action.id, 'y'], action.y);
      case ActionConstants.DELETE_NODE:
         return state.delete(action.id);
      default:
         return state;
   }
}

function MoMentReducer(state = IMap({}), action)
{
   switch(action.type) {
      case ActionConstants.SET_MAPID:
         return state.set('mapId', action.id);
      case ActionConstants.SET_CREATORID:
         return state.set('userId', action.id);
      case ActionConstants.SET_ACTIVE_OBJECT:
         return state.setIn(['active', 'ref'], action.ref)
                     .setIn(['active', 'shape'], action.shape);
      default:
         return state;
   }
}

function MoLinkReducer(state = IMap({}), action)
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
   if(action.type === ActionConstants.RESET_STATE)
      return initialState;
   else
      return state.set('nodes', MoNodesReducer(state.get('nodes'), action))
                  .set('moment', MoMentReducer(state.get('moment'), action))
                  .set('links', MoLinkReducer(state.get('link'), action))
}
/*
   Split Reducer
 function MoMindReducer(state = initialState, action) {
   switch(action.type)
   {
      case ActionConstants.SET_MAPID:
      case ActionConstants.SET_CREATORID:
      case ActionConstants.SET_ACTIVE_OBJECT:
         return state.set('moment',
            MoMentReducer(state.get('moment'), action))
      case ActionConstants.ADD_NODE:
      case ActionConstants.ADD_SUBNODE:
      case ActionConstants.RENAME_NODE:
      case ActionConstants.MOVE_NODE:
      case ActionConstants.DELETE_NODE:
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
      case ActionConstants.SET_MAPID:
         return state.set('mapId', action.id);
      case ActionConstants.SET_CREATORID:
         return state.set('userId', action.id);
      case ActionConstants.SET_ACTIVE_OBJECT:
         return state.setIn(['active', 'ref'], action.ref)
                     .setIn(['active', 'shape'], action.shape);
      case ActionConstants.ADD_NODE:
         let node = IMap({
            id: action.id,
            text: action.text,
            x: action.x,
            y: action.y,
            root: action.root,
            creator: action.creator
         });
         return state.set('nodes', state.get('nodes').push(node));
      case ActionConstants.ADD_SUBNODE:
         return state;
      case ActionConstants.RENAME_NODE:
         return state.set('nodes', state.get('nodes').forEach(
            (node) => {
               if(node.id === action.id)
               {
                  node.text = action.text;
                  return;
               }
            }));
      case ActionConstants.MOVE_NODE:
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
      case ActionConstants.DELETE_NODE:
         let index = state.get('nodes').findIndex(
            (node) => node.id === action.id
         );
         return state.set('nodes', state.get('nodes').delete(index));
      default:
         return state;
   }
}*/