// ===========================================================
// Globals
// ===========================================================

mapId = undefined; //Id of this Node is the MapId and the URL
localId = undefined; //A UserId, tied to LocalStorage
initialSave = false; //if the initial node has been saved
saved = true; //will show client if he is uptodate/saved changes on server (not yet implemented)

// ===========================================================
// Hooks
// ===========================================================

MoMindReady = function ()
{     
   Meteor.call('InitMoMap', function(e,r){});
}
MoMindRename = function(id, newName)
{     
   CreatedChange("MoMindRename", {id: id, name: newName});
}
MoMindSetPosition = function(id, x, y)
{     
   CreatedChange("MoMindSetPosition", {id: id, x: x, y: y});
}
MoMindDelete = function(id)
{     
   CreatedChange("MoMindDelete", {id: id});
}
MoMindAdd = function(id, name, x, y) //parentid missing
{     
   CreatedChange("MoMindAdd", {id: id, name: name, x: x, y: y});
}
   
// ===========================================================
// Wrapper
// ===========================================================

Init = function(id, name)
{
   SendAction("Init",id,name,undefined,undefined,undefined);
   console.log(`Initialize with ${id}`);
}

RenameNode = function(id, name)
{
   SendAction("RenameNode",id,name,undefined,undefined,undefined);
}

AddNode = function(parentId, childId, name, x, y)
{
   SendAction("AddNode",parentId,name,x,y,childId);
}

SetPosition = function(id, name, x, y)
{
   SendAction("SetPosition", id, name, x, y,undefined);
}

DeleteNode = function (id)
{
   SendAction("DeleteNode",id,undefined,undefined,undefined,undefined);
}

// ===========================================================
// Helper
// ===========================================================

SendAction = function(action, id, name, x, y, childId)
{
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

CreatedChange = function(action, params)
{
   if(params === undefined || action === undefined)
   {
      console.log("No params or action defined");
      return;
   }

   saved = false;

   if(mapId != undefined && initialSave != true)
   {
      console.log(`Saved MoMap ${mapId}`);
      Meteor.call('SaveInitialNode', mapId, "MoMind", localId,
         function(e,r){if(e === undefined)
            initialSave = true;});
   }

   console.log(params);

   switch(action)
   {
      case "MoMindRename":
         console.log(`MoMindRename ${params.id}`);
         Meteor.call('RenameNode', params.id, params.name, mapId,
            function(e,r){if(e === undefined) 
               Meteor.call('RecordHistory', action, params, new Date(), mapId, localId,
                  function(e,r){if(e === undefined)
                     saved=true;});});
         break;
      case "MoMindSetPosition":
         console.log(`MoMindSetPosition ${params.id}`);
         Meteor.call('MoveNode', params.id, params.x, params.y, mapId, 
            function(e,r){if(e === undefined) 
               Meteor.call('RecordHistory', action, params, new Date(), mapId, localId,
                  function(e,r){if(e === undefined)
                     saved=true;});});
         break;
      case "MoMindDelete":
         console.log(`MoMindDelete ${params.id}`);
         Meteor.call('DeleteNode', params.id, mapId,
            function(e,r){if(e === undefined) 
               Meteor.call('RecordHistory', action, params, new Date(), mapId, localId,
                  function(e,r){if(e === undefined)
                     saved=true;});});
         break;
      case "MoMindAdd":
         console.log(`MoMindAdd ${params.id}`);
         Meteor.call('AddChildNode', params.id, params.name, params.x, params.y, /*parentid!!!*/mapId, mapId, localId,
            function(e,r){if(e === undefined) 
               Meteor.call('RecordHistory', action, params, new Date(), mapId, localId,
                  function(e,r){if(e === undefined)
                     saved=true;});});
         break;
      default:
         return;
   }
}