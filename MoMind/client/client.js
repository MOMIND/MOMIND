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

    let App = React.createElement(AppModule);
    let Element = ReactDOM.render(App, document.getElementById('app'));
    console.log('Client React Ready');
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