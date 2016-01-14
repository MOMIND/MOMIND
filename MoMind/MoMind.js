MoMaps = new Mongo.Collection("MoMaps");
MoNodes = new Mongo.Collection("MoNodes");
MoHist = new Mongo.Collection("MoHist");

if(Meteor.isServer)
{
	Meteor.publish('MoMaps', function()
	{
		return MoMaps.find({});  //todo: make server method for getting mapid instead of all maps (privacy)
	});

	Meteor.publish('MoNodes', function()
	{
		return MoNodes.find({}); //todo: only from this mapid (privacy)
	});

	Meteor.publish('MoHist', function()
	{
		return MoHist.find({});//todo: only from this mapid (privacy)
	});

	Meteor.methods
	({	
			
	});
}

if(Meteor.isClient)
{
	Meteor.subscribe("MoMaps");
	Meteor.subscribe("MoNodes");
	Meteor.subscribe("MoHist");

	var myFirstNode = undefined; //Id of this Node is the MapId and the URL
	var initialSave = false; //if the initial node has been saved
	saved = true; //will show client if he is uptodate/saved changes on server (not yet implemented)

	Meteor.methods
	({
  		InitMoMap : function()
  		{
  			myFirstNode = Meteor.call('FindMapFromUrl');

  			if(myFirstNode == undefined)
  			{
				myFirstNode = {mapid: Random.id(10), nodetext:"MoMind"};
				window.history.pushState('MoMap'+myFirstNode.mapid, 'MoMind', '/'+myFirstNode.mapid);
  			}

			Init(myFirstNode.mapid, myFirstNode.nodetext);	
  		},

		FindMapFromUrl: function()
		{
		 	var moMapId = location.href.split('/')[3];
		 	if(moMapId == "")
		 		return undefined;

			var moFound = MoMaps.find({mapid: moMapId});

			if(moFound.count() == 1)
			{
				console.log("Found MoMap");
				return moFound.fetch()[0];
			}
			else
			{
				console.log("No MoMap");
				return undefined;
			}
		}
	});
}

Meteor.methods
({
	DetectedChange: function(action, params)
	{
		if(params == undefined || action == undefined)
		{
			console.log("No params or action defined");
			return;
		}
	
		saved = false;

		if(myFirstNode != undefined && initialSave != true)
		{
			console.log("Saved MoMap " + myFirstNode.mapid);

			Meteor.call('SaveInitialNode', myFirstNode.mapid, myFirstNode.nodetext, 
				function(e,r){if(e == undefined)initialSave = true;});
		}

		console.log(params);

		switch(action)
		{
			case "MoMindRename":
				console.log("MoMindRename " + params.id);

				Meteor.call('RenameNode', params.id, params.name, 
					function(e,r){if(e == undefined) 
						Meteor.call('RecordHistory', action, params, new Date(), myFirstNode.mapid, 
							function(e,r){if(e == undefined) saved=true;});});
				break;
			case "MoMindSetPosition":
				console.log("MoMindSetPosition " + params.id);

				Meteor.call('MoveNode', params.id, params.x, params.y,  
					function(e,r){if(e == undefined) 
						Meteor.call('RecordHistory', action, params, new Date(), myFirstNode.mapid, 
							function(e,r){if(e == undefined) saved=true;});});
				break;
			case "MoMindDelete":
				console.log("MoMindDelete " + params.id);

				Meteor.call('DeleteNode', params.id, 
					function(e,r){if(e == undefined) 
						Meteor.call('RecordHistory', action, params, new Date(), myFirstNode.mapid, 
							function(e,r){if(e == undefined) saved=true;});});
				break;
			case "MoMindAdd":
				console.log("MoMindAdd " + params.id);
				
				Meteor.call('AddChildNode', params.id, /*parentid!!!*/params.id, myFirstNode.mapid, params.name, params.x, params.y, 
					function(e,r){if(e == undefined) 
						Meteor.call('RecordHistory', action, params, new Date(), myFirstNode.mapid, 
							function(e,r){if(e == undefined) saved=true;});});
				break;
			default:
				return;
		}
	},

	ReceivedChange: function()
	{
		//Create Observer for COllections
		//If Somethings changes, update the client by calling client.js Wrapper Methods.
		//???
		//Profit
	},
	
	/*Server Methods?*/
	SaveInitialNode: function(mapid, nodetext)
	{
		MoMaps.insert
		({
			mapid: mapid
		});

		MoNodes.insert
		({
			nodeid: mapid,
			mapid: mapid,
			nodetext: nodetext
		})
	},

	AddChildNode: function(nodeid, nodetext, x, y, parentid, mapid) //todo: Create check for manipualting nodes from other mapids
	{
		MoNodes.insert
		({
			nodeid: nodeid,
			parentid: parentid,
			mapid: mapid,
			nodetext: nodetext,
			x: x,
			y: y,
		})
	},
	
	RenameNode: function(nodeid, newname) //todo: Create check for manipualting nodes from other mapids
	{
		var node = MoNodes.find({nodeid: nodeid}).fetch()[0];

		MoNodes.update(node._id, 
		{
			$set: {name: newname}
		});
	},

	MoveNode: function(nodeid, newx, newy) //todo: Create check for manipualting nodes from other mapids
	{
		var node = MoNodes.find({nodeid: nodeid}).fetch()[0];

		MoNodes.update(node._id, 
		{
			$set: {x: newx, y: newy}
		});
	},

	DeleteNode: function(nodeid) //todo: Create check for manipualting nodes from other mapids
	{
		var node = MoNodes.find({nodeid: nodeid}).fetch()[0];

		MoNodes.remove(node._id);
	},

	RecordHistory: function(action, params, date, mapid)
	{
		MoHist.insert
		({
			mapid: mapid,
			action: action,
			params: params,
			date: date
		});
	}
});
