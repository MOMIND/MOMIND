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
	if(params === undefined || action === undefined || params === null || action === null || params === "" || action === "")
		throw new Meteor.Error("no-arguments-change","Undefined action or parameters");

	saved = false;

	if(mapId != undefined && initialSave != true) 
	{
		//Save the Map and Initial Node if there was activity, to "prevent" db save spam
		console.log("Saved MoMap " + mapId);
		Meteor.call('SaveInitialNode', mapId, "MoMind", localId,
			function(e,r){if(e === undefined)
				initialSave = true;});
	}

	switch(action)//First make the call with the Parameters, on Success, try to Record History, then finish with saved=true;
	{
		case "MoMindRename":
			console.log("MoMindRename");
			Meteor.call('RenameNode', params.id, params.name, mapId, localId,
				function(e,r){if(e === undefined) 
					Meteor.call('RecordHistory', action, params, new Date(), mapId, localId,
						function(e,r){if(e === undefined)
							saved=true;});});
			break;
		case "MoMindSetPosition":
			console.log("MoMindSetPosition");
			Meteor.call('MoveNode', params.id, params.x, params.y, mapId, localId,
				function(e,r){if(e === undefined) 
					Meteor.call('RecordHistory', action, params, new Date(), mapId, localId,
						function(e,r){if(e === undefined)
							saved=true;});});
			break;
		case "MoMindDelete":
			console.log("MoMindDelete");
			Meteor.call('DeleteNode', params.id, mapId, localId,
				function(e,r){if(e === undefined) 
					Meteor.call('RecordHistory', action, params, new Date(), mapId, localId,
						function(e,r){if(e === undefined)
							saved=true;});});
			break;
		case "MoMindAdd":
			console.log("MoMindAdd");
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