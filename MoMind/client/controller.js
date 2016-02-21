// ===========================================================
// Globals
// ===========================================================

mapId = null; //Id of this Node is the MapId and the URL
localId = null; //A UserId, tied to LocalStorage
initialSave = false; //if the initial node has been saved
saved = true; //will show client if he is uptodate/saved changes on server (not yet implemented)
Store = null;

System.import('/client/lib/reducer').then((reducer) => Store = Redux.createStore(reducer.default));

// ===========================================================
// Hooks
// ===========================================================

MoMindReady = () => {     
   Meteor.call('InitMoMap', function(e,r){});
}
MoMindRename = (id, newName) => {  
   CreatedChange("MoMindRename", {id: id, name: newName});
}
MoMindSetPosition = (id, x, y) => {     
   CreatedChange("MoMindSetPosition", {id: id, x: x, y: y});
}
MoMindDelete = (id) => {
   CreatedChange("MoMindDelete", {id: id});
}
MoMindAdd = (id, name, x, y) => {//parentid missing
   CreatedChange("MoMindAdd", {id: id, name: name, x: x, y: y});
}
   
// ===========================================================
// Wrapper
// ===========================================================

Init = (id, name) => {
   SendAction("Init",id,name,undefined,undefined,undefined);
   console.log(`Initialize with ID ${id}`);
}

RenameNode = (id, name) => {
   SendAction("RenameNode",id,name,undefined,undefined,undefined);
}

AddNode = (parentId, childId, name, x, y)  => {
   SendAction("AddNode",parentId,name,x,y,childId);
}

SetPosition = (id, name, x, y) => {
   SendAction("SetPosition", id, name, x, y,undefined);
}

DeleteNode = (id) => {
   SendAction("DeleteNode",id,undefined,undefined,undefined,undefined);
}

// ===========================================================
// Helper
// ===========================================================

SendAction = (action, id, name, x, y, childId) => {
   const nodeAction = 
   {
      Action: action, 
      Id: id, 
      Name: name, 
      X: x, 
      Y: y, 
      ChildId: childId
   };
   const jsonString = JSON.stringify(nodeAction);
   //SendMessage("MoMind","ReadAction",jsonString);
}

CreatedChange = (action, params) =>
{
   if(params === undefined || action === undefined)
   {
      console.log("No params or action defined");
      return;
   }

   saved = false;

   if(mapId != null && initialSave != true)
   {
      console.log(`Saved MoMap ${mapId}`);
      Meteor.call('SaveInitialNode', mapId, "MoMind", localId,
      (e,r) => {
         if(e === undefined)
            initialSave = true;
      });
   }

   console.log(params);

   switch(action)
   {
      case "MoMindRename":
         console.log(`MoMindRename ${params.id}`);
         Meteor.call('RenameNode', params.id, params.name, mapId,
         (e,r) => {
            if(e === undefined) 
               Meteor.call('RecordHistory', action, params, new Date(), mapId, localId,
               (e,r) => {
                  if(e === undefined)
                     saved=true;
               });
         });
         break;
      case "MoMindSetPosition":
         console.log(`MoMindSetPosition ${params.id}`);
         Meteor.call('MoveNode', params.id, params.x, params.y, mapId, 
         (e,r) => {
            if(e === undefined) 
               Meteor.call('RecordHistory', action, params, new Date(), mapId, localId,
               (e,r) => {
                  if(e === undefined)
                     saved=true;
               });
         });
         break;
      case "MoMindDelete":
         console.log(`MoMindDelete ${params.id}`);
         Meteor.call('DeleteNode', params.id, mapId,
         (e,r) => {
            if(e === undefined) 
               Meteor.call('RecordHistory', action, params, new Date(), mapId, localId,
               (e,r) => {
                  if(e === undefined)
                     saved=true;
               });
         });
         break;
      case "MoMindAdd":
         console.log(`MoMindAdd ${params.id}`);
         Meteor.call('AddChildNode', params.id, params.name, params.x, params.y, /*parentid!!!*/mapId, mapId, localId,
         (e,r) => {
            if(e === undefined) 
               Meteor.call('RecordHistory', action, params, new Date(), mapId, localId,
               (e,r) => {
                  if(e === undefined)
                     saved=true;
               });
         });
         break;
      default:
         return;
   }
}