// ===========================================================
// Hooks
// ===========================================================

function MoMindReady()
{		
	console.log("MoMindReady");
}
function MoMindRename(id, newName)
{		
	console.log("MoMindRename"+id);
}
function MoMindSetPosition(id, x, y)
{		
	console.log("MoMindSetPosition"+id);
}
function MoMindDelete(id)
{		
	console.log("MoMindDelete"+id);
}
function MoMindAdd(id, name,x, y)
{		
	console.log("MoMindAdd"+id);
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
