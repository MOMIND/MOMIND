Meteor.startup(function(){
  console.log('Client Meteor Ready');
  //Get a valid mapId (from url or generated) and subscribe on Collections with limited view

  let urlId = location.href.split('/')[3];

  Meteor.call('CheckMapId', urlId,
  (err,result) => {
    if(err !== undefined || result === undefined)
      return;

    mapId = result;
    LoadReact();

    Meteor.subscribe('MoNodes', mapId, {
      onReady() {
        MoMindReady();
      }
    });

    Meteor.subscribe('MoHist', mapId);
  });

  localId = Random.id(8);
});

function LoadReact() {
  System.import('/client/components/App').then(function(module) {
    const AppModule = module.default;

    let App = React.createElement(AppModule, {store: Store});
    let Element = ReactDOM.render(App, document.getElementById('app'));
    console.log('Client React Ready');

     jQuery('img.svg').each(function(){
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

//For parallel loading
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

}

