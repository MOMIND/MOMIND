System.import('/client/components/App').then(function(module) {
    var App = module.default;

    function run() {
      ReactDOM.render(React.createElement(App), document.getElementById('app'));
      console.log('Client React Ready');
    }

    const loadedStates = ['complete', 'loaded', 'interactive'];

    if (loadedStates.includes(document.readyState) && document.body) {
      run();
    } else {
      window.addEventListener('DOMContentLoaded', run, false);
    }
});

Meteor.startup(function(){
  console.log('Client Meteor Ready');
  //Get a valid mapId (from url or generated) and subscribe on Collections with limited view

  let urlId = location.href.split('/')[3];

  Meteor.call('CheckMapId', urlId,
  (err,result) => {
    if(err !== undefined || result === undefined)
      return;

    mapId = result;

    Meteor.subscribe('MoNodes', mapId, {
      onReady() {
        MoMindReady();
      }
    });

    Meteor.subscribe('MoHist', mapId);
  });

  localId = Random.id(8);
});
