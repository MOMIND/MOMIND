let nodePointer = null; //Observer Pointer 

Meteor.methods({
   InitMoMap() { //Method Call when MoMindReady is received at client.js
      let nodeText = "MoMind";

      //If mapId is undefined (new map), create a new id and change url
      if(mapId === null) {
         mapId = Random.id(10);
         console.log("Make New Map");
         window.history.pushState('MoMap' + mapId, 'MoMind', '/' + mapId);
      } else { //else get the text of the center module and prevent initial-saving
         //let nodes = MoNodes.find({nodeid: mapId}).fetch();
         //nodeText = nodes[0].nodetext;
         console.log("Loaded Existing Map");
         initialSave = true;
      }

      LoadReact();
      Init(mapId, nodeText);
      /*
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
      });*/
   }
});


function LoadReact() {
   System.import('/client/components/App').then(function(module) {
    const AppModule = module.default;

     let App = React.createElement(AppModule, {store: Store});
     AppElement = ReactDOM.render(App, document.getElementById('app'), () => {
      
      console.log('Client React Ready');
      //jsPlumb.bind("ready", () => AppElement._reactInternalInstance._renderedComponent._instance.jsPlumbDraw());
     });
     jQuery('img.svg').each(() => {
       var $img = jQuery(this);
       var imgID = $img.attr('id');
       var imgClass = $img.attr('class');
       var imgURL = $img.attr('src');

       jQuery.get(imgURL, function(data) {
           // Get the SVG tag, ignore the rest
           var $svg = jQuery(data).find('svg');

           // Add replaced image's ID to the new SVG
           if(typeof imgID !== 'undefined') {
               $svg = $svg.attr('id', imgID);
           }
           // Add replaced image's classes to the new SVG
           if(typeof imgClass !== 'undefined') {
               $svg = $svg.attr('class', imgClass+' replaced-svg');
           }

           // Remove any invalid XML tags as per http://validator.w3.org
           $svg = $svg.removeAttr('xmlns:a');

           // Replace image with new SVG
           $img.replaceWith($svg);

       }, 'xml');
     });
   });
}


/*//For parallel loading
function StartLoad() {
  System.import('/client/components/App').then(function(module) {
    const AppModule = module.default;

    function run() {
      let App = React.createElement(AppModule);
      ReactDOM.render(App, document.getElementById('app'));
      console.log('Client React Ready');
    }

    const loadedStates = ['complete', 'loaded', 'interactive'];

    if (loadedStates.includes(document.readyState) && document.body) {
      run();
    } else {
      window.addEventListener('DOMContentLoaded', run, false);
    }
  });
}*/