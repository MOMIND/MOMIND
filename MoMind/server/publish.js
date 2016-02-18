Meteor.publish('MoNodes', function(mapid) {
   return MoNodes.find({mapid: mapid});
});

Meteor.publish('MoHist', function(mapid) {
   return MoHist.find({mapid: mapid});
});