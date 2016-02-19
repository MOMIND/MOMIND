let nodePointer = undefined; //Observer Pointer 

Meteor.methods({
   InitMoMap() { //Method Call when MoMindReady is received at client.js
      let nodeText = "MoMind";

      //If mapId is undefined (new map), create a new id and change url
      if(mapId === undefined) {
         mapId = Random.id(10);
         console.log("New MoMap");
         window.history.pushState('MoMap' + mapId, 'MoMind', '/' + mapId);
      } else { //else get the text of the center module and prevent initial-saving
         let nodes = MoNodes.find({nodeid: mapId}).fetch();
         nodeText = nodes[0].nodetext;
         console.log("Loaded MoMap");
         initialSave = true;
      }

      Init(mapId, nodeText);

      nodePointer = MoNodes.find({});
      //Observer makes no Change if the Change comes from the local client or, for some reasons, a different mapId
      nodePointer.observeChanges({
         added(id, field) {
            if(field.localid === localId || field.mapid !== mapId)
               return;

            console.log("Detected Add");

            AddNode(field.parentid, field.nodeid, field.nodetext, field.x, field.y);
         }
      });

      //Another Observer, to get more Information on changed Events
      nodePointer.observe ({
         changedAt(newNode, oldNode, id) {
            if(oldNode.localid === localId || oldNode.mapid !== mapId || newNode.nodeid !== oldNode.nodeid)
               return;

            console.log("Detected Change");

            if(newNode.nodetext !== oldNode.nodetext)
               RenameNode(newNode.nodeid, newNode.nodetext);

            if(newNode.x !== oldNode.x || newNode.y !== oldNode.y)
               SetPosition(newNode.nodeid, newNode.nodetext, newNode.x, newNode.y);
         },
         removedAt(oldNode, id) {
            if(field.localid === localId || field.mapid !== mapId)
               return;

            console.log("Detected Delete");

            DeleteNode(field.nodeid);
         }
      });
   }
});