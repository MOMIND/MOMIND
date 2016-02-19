Meteor.publish('MoNodes', (mapid) => {
   return MoNodes.find({mapid: mapid});
});

Meteor.publish('MoHist', (mapid) => {
   return MoHist.find({mapid: mapid});
});