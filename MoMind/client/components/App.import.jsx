import Board from '/client/components/Board';
import BurgerMenu from '/client/components/BurgerMenu';
import * as Actions from '/client/lib/actions';

export default class App extends React.Component {

   // --------------------------------------------------------------------- //
   // ---------------------- Class Initialization ------------------------- //
   // --------------------------------------------------------------------- //

   constructor(props) {
      super(props);
   }

   state = {

   };

   componentDidMount() {
      $(document).bind("click", (event) => $("div.custom-menu").hide());


      this.StoreTest();
   }

   // --------------------------------------------------------------------- //
   // -------------------------- Class Methods ---------------------------- //
   // --------------------------------------------------------------------- //

   getMeteorData() {
      return {
         null
      };
   }

   testing(event) {
      event.preventDefault();

      $("<div class='custom-menu'>Custom Menu</div>")
        .appendTo("body")
        .css({top: event.pageY + "px", left: event.pageX + "px"});
   }

   StoreTest() {
      console.log(Store.getState().toJSON());

      let unsubscribe = Store.subscribe(() =>
        console.log(Store.getState().toJSON())
      )

      Store.dispatch(Actions.SetMapId(mapId));
      Store.dispatch(Actions.SetCreatorId(localId));
      let creator = Store.getState().getIn(['moment', 'userId']);
      Store.dispatch(Actions.AddNode('1', 'Test1', '10', '10', true, creator));
      Store.dispatch(Actions.AddNode('2', 'Test2', '5', '5', true, creator));
      Store.dispatch(Actions.AddNode('3', 'Test3', '5', '5', true, creator));
      Store.dispatch(Actions.AddNode('4', 'Test4', '5', '5', true, creator));
      
      Store.dispatch(Actions.MoveNode('3', 200, 100));
      Store.dispatch(Actions.DeleteNode('2'));
      Store.dispatch(Actions.RenameNode('1', 'Renamed'));


      unsubscribe();
   }

   // --------------------------------------------------------------------- //
   // -------------------------- Event Handler ---------------------------- //
   // --------------------------------------------------------------------- //


   // --------------------------------------------------------------------- //
   // ------------------------------ Render ------------------------------- //
   // --------------------------------------------------------------------- //

   render() {
      return (
         <div id="outer-container">
            <BurgerMenu />
            <Board ref={(me) => this.Board = me} />
         </div>
      );
  }
}

RMixIn(App.prototype, ReactMeteorData);