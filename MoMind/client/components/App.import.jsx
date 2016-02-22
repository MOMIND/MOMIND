import Board from '/client/components/Board';
import BurgerMenu from '/client/components/BurgerMenu';
import {Actions} from '/client/lib/actions';

class App extends React.Component {

   // --------------------------------------------------------------------- //
   // ---------------------- Class Initialization ------------------------- //
   // --------------------------------------------------------------------- //

   constructor(props) {
      super(props);
   }

   state = {

   };
   static defaultProps = {
      store: Store,
   };

   // --------------------------------------------------------------------- //
   // ------------------------- React Lifecycle --------------------------- //
   // --------------------------------------------------------------------- //

   componentDidMount() {
      $(document).bind("click", (event) => $("div.custom-menu").hide());


      //this.StoreTest();
   }

   // --------------------------------------------------------------------- //
   // -------------------------- Class Methods ---------------------------- //
   // --------------------------------------------------------------------- //

   getMeteorData() {
      return {
         null
      };
   }

   RightClickMenu(event) {
      event.preventDefault();

      $("<div class='custom-menu'>MoMind Menu</div>")
        .appendTo("body")
        .css({top: event.pageY + "px", left: event.pageX + "px"});
   }

   StoreTest() {
      //let unsubscribe = Store.subscribe(() => console.log(Store.getState().toJSON()) );

      console.assert(IMap.isMap(Store.getState().get('nodes')) === true, "Nodes not a Map" );
      console.assert(IMap.isMap(Store.getState().get('links')) === true, "Links not a Map" );
      console.assert(IMap.isMap(Store.getState().get('moment')) === true, "Moment not a Map" );
      console.assert(IMap.isMap(Store.getState().getIn(['moment', 'active'])) === true, "Active not a Map" );

      Store.dispatch(Actions.SetMapId(mapId));
      console.assert(Store.getState().getIn(['moment', 'mapId'])===mapId, "Set MapId" );

      Store.dispatch(Actions.SetCreatorId(localId));
      let creator = Store.getState().getIn(['moment', 'userId']);
      console.assert(creator===localId, "Set Creator" );
      
      Store.dispatch(Actions.AddNode('a1', 'Test1', 10, 10, true, creator));
      Store.dispatch(Actions.AddNode('a2', 'Test2', 100, 100, true, creator));
      Store.dispatch(Actions.AddNode('a3', 'Test3', 500, 500, true, creator));
      Store.dispatch(Actions.AddNode('a4', 'Test4', 250, 250, false, creator));
      console.assert(Store.getState().getIn(['nodes']).size===4, "Add Nodes" );
      console.assert(IMap.isMap(Store.getState().getIn(['nodes', 'a4'])) === true, "Node not a Map" );
      
      Store.dispatch(Actions.MoveNode('a3', 200, 100));
      console.assert(Store.getState().getIn(['nodes', 'a3']).get('x')===200, "Set X" );
      console.assert(Store.getState().getIn(['nodes', 'a3']).get('y')===100, "Set Y" );
      
      Store.dispatch(Actions.DeleteNode('a2'));
      console.assert(Store.getState().getIn(['nodes', 'a2']) === undefined, "Delete Node" );
      
      Store.dispatch(Actions.RenameNode('a1', 'Renamed'));
      console.assert(Store.getState().getIn(['nodes', 'a1']).get('text')==='Renamed', "Rename Node" );

      Store.dispatch(Actions.ResetState());
      console.log("Test Finished");
      //unsubscribe();
   }

   StoreComponentTest() {
      //let unsubscribe = Store.subscribe(() => console.log(Store.getState().toJSON()) );

      console.assert(IMap.isMap(this.props.nodes), "Nodes not a Map" );
      console.assert(IMap.isMap(this.props.links), "Links not a Map" );
      console.assert(IMap.isMap(this.props.active), "Active not a Map" );

      this.props.Action.SetMapId(mapId);
      console.assert(this.props.mapId===mapId, "Set MapId" );

      this.props.Action.SetCreatorId(localId);
      let creator = this.props.userId;
      console.assert(creator===localId, "Set Creator" );
      
      this.props.Action.AddNode('a1', 'Test1', 10, 10, true, creator);
      this.props.Action.AddNode('a2', 'Test2', 100, 100, true, creator);
      this.props.Action.AddNode('a3', 'Test3', 500, 500, true, creator);
      this.props.Action.AddNode('a4', 'Test4', 250, 250, false, creator);
      console.assert(this.props.nodes.size===4, "Add Nodes" );
      console.assert(IMap.isMap(this.props.nodes.get('a4')), "Node not a Map" );
      
      this.props.Action.MoveNode('a3', 200, 100);
      console.assert(this.props.nodes.getIn(['a3','x'])===200, "Set X" );
      console.assert(this.props.nodes.getIn(['a3','y'])===100, "Set Y" );
      
      this.props.Action.DeleteNode('a2');
      console.assert(this.props.nodes.get('a2') === undefined, "Delete Node" );
      
      this.props.Action.RenameNode('a1', 'Renamed');
      console.assert(this.props.nodes.getIn(['a1','text'])==='Renamed', "Rename Node" );

      this.props.Action.ResetState();
      console.log("Test Finished");
      //unsubscribe();
   }

   // --------------------------------------------------------------------- //
   // -------------------------- Event Handler ---------------------------- //
   // --------------------------------------------------------------------- //


   // --------------------------------------------------------------------- //
   // ------------------------------ Render ------------------------------- //
   // --------------------------------------------------------------------- //

   renderBoard() {
      return (
         <BurgerMenu 
         />
      );
   }

   renderMenu() {
      return (
         <Board 
            ref={(me) => this.Board = me} 
            nodes = {this.props.nodes}
            links = {this.props.links}
            active = {this.props.active}
         />
      );
   }

   render() {
      return (
         <div id="outer-container">
           {this.renderMenu()}
           {this.renderBoard()}
         </div>
      );
  }
}

RMixIn(App.prototype, ReactMeteorData);

// --------------------------------------------------------------------- //
// ------------------------- Redux Management -------------------------- //
// --------------------------------------------------------------------- //

   const MapStateToProps = (state) => {
      return {
         nodes: state.get('nodes'), 
         links: state.get('links'),
         active: state.getIn(['moment', 'active']),
         mapId: state.getIn(['moment', 'mapId']),
         userId: state.getIn(['moment', 'userId']),
      }
   };

   const MapDispatchToProps = (dispatch) => {
      return {
         Action: Redux.bindActionCreators(Actions, dispatch)
      }
   };

export default ConnectProvider(MapStateToProps, MapDispatchToProps)(App);