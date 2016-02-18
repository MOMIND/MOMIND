Meteor.methods({   
   SaveInitialNode(mapid, nodetext, localid) {//todo: check other params for validity
      //Save the Map and also save the Node
      MoMaps.insert
      ({
         mapid: mapid,
         localid: localid
      });

      MoNodes.insert
      ({
         nodeid: mapid,
         mapid: mapid,
         nodetext: nodetext,
         localid: localid
      })
   },

   AddChildNode(nodeid, nodetext, x, y, parentid, mapid, localid) {//todo: check other params for validity
      let node = MoNodes.find({nodeid: parentid}).fetch()[0];

      if(node.mapid !== mapid)
         throw new Meteor.Error("not-allowed-mapid","Not Allowed to make Changes");

      MoNodes.insert
      ({
         nodeid: nodeid,
         parentid: parentid,
         mapid: mapid,
         nodetext: nodetext,
         localid: localid,
         x: x,
         y: y
      })
   },
   
   RenameNode(nodeid, newname, mapid, localid) {//todo: check other params for validity
      let node = MoNodes.find({nodeid: nodeid}).fetch()[0];

      if(node.mapid !== mapid)
         throw new Meteor.Error("not-allowed-mapid","Not Allowed to make Changes");

      MoNodes.update(node._id, 
      {
         $set: {nodetext: newname, localid: localid}
      });
   },

   MoveNode(nodeid, newx, newy, mapid, localid) {//todo: check other params for validity
      let node = MoNodes.find({nodeid: nodeid}).fetch()[0];

      if(node.mapid !== mapid)
         throw new Meteor.Error("not-allowed-mapid","Not Allowed to make Changes");

      MoNodes.update(node._id, 
      {
         $set: {x: newx, y: newy, localid: localid}
      });
   },

   DeleteNode(nodeid, mapid, localid) {//todo: make remove child nodes & check other params for validity
      let node = MoNodes.find({nodeid: nodeid}).fetch()[0];

      if(node.mapid !== mapid)
         throw new Meteor.Error("not-allowed-mapid","Not Allowed to make Changes");

      MoNodes.remove(node._id);
   },

   RecordHistory(action, params, date, mapid, localid) {
      MoHist.insert
      ({
         mapid: mapid,
         action: action,
         params: params,
         date: date,
         localid: localid
      });
   }
});