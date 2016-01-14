// ===========================================================
// Hooks
// ===========================================================

function MoMindReady()
{		
	console.log("MoMindReady");
	Meteor.call('InitMoMap', function(e,r){});
}
function MoMindRename(id, newName)
{		
	CreatedChange("MoMindRename", {id: id, name: newName});

}
function MoMindSetPosition(id, x, y)
{		
	CreatedChange("MoMindSetPosition", {id: id, x: x, y: y});
}
function MoMindDelete(id)
{		
	CreatedChange("MoMindDelete", {id: id});
}
function MoMindAdd(id, name, x, y) //parentid missing
{		
	CreatedChange("MoMindAdd", {id: id, name: name, x: x, y: y});
}
	
// ===========================================================
// Wrapper
// ===========================================================

function EnableDeveloperConsole()
{
	SendMessage("MoMind","EnableDeveloperConsole");
}

function Init(id, name)
{
	SendAction("Init",id,name,undefined,undefined,undefined);
}

function RenameNode(id, name)
{
	SendAction("RenameNode",id,name,undefined,undefined,undefined);
}

function AddNode(parentId, childId, name, x, y)
{
	SendAction("AddNode",parentId,name,x,y,childId);
}

function SetPosition(id, name, x, y)
{
	SendAction("SetPosition", id, name, x, y,undefined);
}

function DeleteNode(id)
{
	SendAction("DeleteNode",id,undefined,undefined,undefined,undefined);
}

// ===========================================================
// Helper
// ===========================================================

function SendAction(action, id, name, x, y, childId)
{
	var nodeAction = 
	{
		Action: action, 
		Id: id, 
		Name: name, 
		X: x, 
		Y: y, 
		ChildId: childId
	};
	var jsonString = JSON.stringify(nodeAction);
	SendMessage("MoMind","ReadAction",jsonString);
}

function CreatedChange(action, params)
{
	if(params === undefined || action === undefined)
	{
		console.log("No params or action defined");
		return;
	}

	saved = false;

	if(mapId != undefined && initialSave != true)
	{
		console.log("Saved MoMap " + mapId);
		Meteor.call('SaveInitialNode', mapId, "MoMind", localId,
			function(e,r){if(e === undefined)
				initialSave = true;});
	}

	console.log(params);

	switch(action)
	{
		case "MoMindRename":
			console.log("MoMindRename " + params.id);
			Meteor.call('RenameNode', params.id, params.name, mapId,
				function(e,r){if(e === undefined) 
					Meteor.call('RecordHistory', action, params, new Date(), mapId, localId,
						function(e,r){if(e === undefined)
							saved=true;});});
			break;
		case "MoMindSetPosition":
			console.log("MoMindSetPosition " + params.id);
			Meteor.call('MoveNode', params.id, params.x, params.y, mapId, 
				function(e,r){if(e === undefined) 
					Meteor.call('RecordHistory', action, params, new Date(), mapId, localId,
						function(e,r){if(e === undefined)
							saved=true;});});
			break;
		case "MoMindDelete":
			console.log("MoMindDelete " + params.id);
			Meteor.call('DeleteNode', params.id, mapId,
				function(e,r){if(e === undefined) 
					Meteor.call('RecordHistory', action, params, new Date(), mapId, localId,
						function(e,r){if(e === undefined)
							saved=true;});});
			break;
		case "MoMindAdd":
			console.log("MoMindAdd " + params.id);
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

