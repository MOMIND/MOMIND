Meteor.startup(function(){
  console.log('Client Meteor Ready');
  //Get a valid mapId (from url or generated) and subscribe on Collections with limited view

  let urlId = location.href.split('/')[3];

  Meteor.call('CheckMapId', urlId,
  (err,result) => {
    if(err !== undefined || result === undefined)
      return;

    mapId = result;
    localId = Random.id(8);
    MoMindReady();

    /*Meteor.subscribe('MoNodes', mapId, {
      onReady() {
        
      }
    });

    Meteor.subscribe('MoHist', mapId);*/
  });
});