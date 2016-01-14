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
			RemoveAll: function(sure, nsure)
			{
				if(sure === true && nsure === false)
				{
					MoMaps.remove({});
					MoNodes.remove({});
					MoHist.remove({});
				}
			},

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

			SaveInitialNode: function(mapid, nodetext, localid)
			{
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

			AddChildNode: function(nodeid, nodetext, x, y, parentid, mapid, localid) //todo: Create check for manipualting nodes from other mapids
			{
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
			
			RenameNode: function(nodeid, newname, mapid) //todo: Create check for manipualting nodes from other mapids
			{
				var node = MoNodes.find({nodeid: nodeid}).fetch()[0];

				MoNodes.update(node._id, 
				{
					$set: {nodetext: newname}
				});
			},

			MoveNode: function(nodeid, newx, newy, mapid) //todo: Create check for manipualting nodes from other mapids
			{
				var node = MoNodes.find({nodeid: nodeid}).fetch()[0];

				MoNodes.update(node._id, 
				{
					$set: {x: newx, y: newy}
				});
			},

			DeleteNode: function(nodeid, mapid) //todo: Create check for manipualting nodes from other mapids and make remove child nodes
			{
				var node = MoNodes.find({nodeid: nodeid}).fetch()[0];

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
		Meteor.call('CheckMapId',location.href.split('/')[3], 
			function(e,r){if(e != undefined || r===undefined) return;
					mapId = r; 
					Meteor.subscribe('MoNodes', mapId);
					Meteor.subscribe('MoHist', mapId);
				});

		localId = (function()
		{
			if(!localStorage.momindlocal)
				return localStorage.momindlocal = Random.id(8);

			return localStorage.momindlocal;
		})();
	});

	Meteor.methods
	({
  		InitMoMap : function()
  		{
  			var nodeText = "MoMind";

  			if(mapId === undefined)
  			{
				mapId = Random.id(10);
				window.history.pushState('MoMap' + mapId, 'MoMind', '/' + mapId);
  			}
  			else
  			{
  				nodeText = MoNodes.find({nodeid: mapId}).fetch()[0].nodetext;;
  				initialSave = true;
  			}

			Init(mapId, nodeText);

			nodePointer = MoNodes.find({});
			nodePointer.observeChanges
			({
				added: function(id, fields)
				{
					console.log("change");
				},
				changed: function(id, fields)
				{
					console.log("change");
				},
				removed: function(id, field)
				{
					console.log("change");
				}
			});
  		}
	});
}