Meteor.methods({
   RemoveAll(sure, nsure) { //Remove all Collections lol
      if(sure === true && nsure === false) {
         MoMaps.remove({});
         MoNodes.remove({});
         MoHist.remove({});
      }
   },

   CheckMapId(urlId) { //Check if map with this id exists - if yes, return it.
      const moMapId = urlId;

      if(moMapId === "")
         return undefined;

      const moFound = MoMaps.find({mapid: moMapId});

      if(moFound.count() === 1)   
         return moFound.fetch()[0].mapid;

      return undefined;
   }
});