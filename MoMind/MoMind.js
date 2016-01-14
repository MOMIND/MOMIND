MoMaps = new Mongo.Collection("MoMaps");
MoNodes = new Mongo.Collection("MoNodes");
MoHist = new Mongo.Collection("MoHist");

if(Meteor.isServer)
{
	Meteor.publish('MoNodes', function(mapid)
	{
		return MoNodes.find({mapid: mapid});
	});

	Meteor.publish('MoHist', function(mapid)
	{
		return MoHist.find({mapid: mapid});
	});

	Meteor.startup(function()
	{
		Meteor.methods
		({
			//Remove all Collections
			RemoveAll: function(sure, nsure)
			{
				if(sure === true && nsure === false)
				{
					MoMaps.remove({});
					MoNodes.remove({});
					MoHist.remove({});
				}
			},

			//Check if there is already a Map with the Id specified - if yes, return it.
			CheckMapId: function(urlId)
			{
				var moMapId = urlId;

			 	if(moMapId == "")
			 		return undefined;

				var moFound = MoMaps.find({mapid: moMapId});

				if(moFound.count() == 1)	
					return moFound.fetch()[0].mapid;;
				
				return undefined;
			},

			SaveInitialNode: function(mapid, nodetext, localid) //todo: check other params for validity
			{
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

			AddChildNode: function(nodeid, nodetext, x, y, parentid, mapid, localid) //todo: check other params for validity
			{
				var node = MoNodes.find({nodeid: parentid}).fetch()[0];

				if(node.mapid != mapid)
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
			
			RenameNode: function(nodeid, newname, mapid, localid) //todo: check other params for validity
			{
				var node = MoNodes.find({nodeid: nodeid}).fetch()[0];

				if(node.mapid != mapid)
					throw new Meteor.Error("not-allowed-mapid","Not Allowed to make Changes");

				MoNodes.update(node._id, 
				{
					$set: {nodetext: newname, localid: localid}
				});
			},

			MoveNode: function(nodeid, newx, newy, mapid, localid) //todo: check other params for validity
			{
				var node = MoNodes.find({nodeid: nodeid}).fetch()[0];

				if(node.mapid != mapid)
					throw new Meteor.Error("not-allowed-mapid","Not Allowed to make Changes");

				MoNodes.update(node._id, 
				{
					$set: {x: newx, y: newy, localid: localid}
				});
			},

			DeleteNode: function(nodeid, mapid, localid) //todo: make remove child nodes & check other params for validity
			{
				var node = MoNodes.find({nodeid: nodeid}).fetch()[0];

				if(node.mapid != mapid)
					throw new Meteor.Error("not-allowed-mapid","Not Allowed to make Changes");

				MoNodes.remove(node._id);
			},

			RecordHistory: function(action, params, date, mapid, localid)
			{
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

  	});
}

if(Meteor.isClient)
{
	mapId = undefined; //Id of this Node is the MapId and the URL
	nodePointer = undefined; //Observer Pointer
	localId = undefined; //A UserId, tied to LocalStorage

	initialSave = false; //if the initial node has been saved
	saved = true; //will show client if he is uptodate/saved changes on server (not yet implemented)

	Meteor.startup(function()
	{
		//Get a valid mapId (from url or generated) and subscribe on Collections with limited view
		Meteor.call('CheckMapId',location.href.split('/')[3], 
			function(e,r){if(e != undefined || r===undefined) return;
					mapId = r; 
					Meteor.subscribe('MoNodes', mapId);
					Meteor.subscribe('MoHist', mapId);
				});

		
		localId = Random.id(8);/*(function()
		{
			if(!localStorage.momindlocal)
				return localStorage.momindlocal = Random.id(8);

			return localStorage.momindlocal;
		})();*/
	});

	Meteor.methods
	({
		//Method Call when MoMindReady is received at client.js
  		InitMoMap : function()
  		{
  			var nodeText = "MoMind";

  			//If mapId is undefined (new map), create a new id and change url
  			if(mapId === undefined)
  			{
				mapId = Random.id(10);
				window.history.pushState('MoMap' + mapId, 'MoMind', '/' + mapId);
  			}
  			else //else get the text of the center module and prevent initial-saving
  			{
  				nodeText = MoNodes.find({nodeid: mapId}).fetch()[0].nodetext;;
  				initialSave = true;
  			}

			Init(mapId, nodeText);

			nodePointer = MoNodes.find({});
			//Observer makes no Change if the Change comes from the local client or, for some reasons, a different mapId
			nodePointer.observeChanges
			({
				added: function(id, field)
				{
					if(field.localid === localId || field.mapid != mapId)
						return;

					console.log("detected change");

					AddNode(field.parentid, field.nodeid, field.nodetext, field.x, field.y);
				}
			});

			//Another Observer, to get more Information on changed Events
			nodePointer.observe
			({
				changedAt: function(newNode, oldNode, id)
				{
					if(oldNode.localid === localId || oldNode.mapid != mapId || newNode.nodeid != oldNode.nodeid)
						return;

					console.log("detected change");

					if(newNode.nodetext != oldNode.nodetext)
						RenameNode(newNode.nodeid, newNode.nodetext);

					if(newNode.x != oldNode.x || newNode.y != oldNode.y)
						SetPosition(newNode.nodeid, newNode.nodetext, newNode.x, newNode.y);
				},
				removedAt: function(oldNode, id)
				{
					if(field.localid === localId || field.mapid != mapId)
						return;

					console.log("detected change");

					DeleteNode(field.nodeid);
				}
			});
  		}
	});
}