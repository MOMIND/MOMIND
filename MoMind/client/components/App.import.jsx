import Board from '/client/components/Board';
import BurgerMenu from '/client/components/BurgerMenu';
import {ActionMethods, ObjectShape} from '/client/lib/actions';
import RightClickMenu from '/client/components/RightClickMenu';

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
   }

   // --------------------------------------------------------------------- //
   // -------------------------- Class Methods ---------------------------- //
   // --------------------------------------------------------------------- //

   getMeteorData() {
      return {
         null
      };
   }

   StoreAssertTest() {
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

   mapRefToNode() {
      const ref = this.props.active.get('ref');

      if(this.isRef(ObjectShape.NODE))
         return ref;
      return false;
   }

   mapRefToLink() {
      const ref = this.props.active.get('ref');

      if(this.isRef(ObjectShape.LINK))
         return ref;
      return false;
   }

   isRef(shape){
      const s = this.props.active.get('shape');

      if(s === shape)
         return true;
      return false;
   }

   // --------------------------------------------------------------------- //
   // -------------------------- Event Handler ---------------------------- //
   // --------------------------------------------------------------------- //

   // ------------------------- Context Handler --------------------------- //
   // 
   openContextMenu = (event, shape, id) => {
      event.preventDefault();

      this.ContextMenu.setContext(shape, id);
      this.ContextMenu.showMenu();

      $(ReactDOM.findDOMNode(this.ContextMenu))
         .css({top: event.pageY + "px", left: event.pageX + "px"});
   }

   closeContextMenu = () => {
      this.ContextMenu.hideMenu();
   }

   doAddNodeContext = (event, shape, id) => {
      this.doAddNodeOnBoard(event);
   }

   doDeleteNodeContext = (event, shape, id) => {
      this.doSetActiveObject(shape, id);
      this.doDeleteNode();
   }

   doRenameNodeContext = (event, shape, id) => {
      this.doSetActiveObject(shape, id);
      this.doRenameNode();
   }
   // -------------------------- Burger Handler --------------------------- //
   doAddNode = () => {
      const x = 250 + Math.floor(Math.random() * 350);
      const y = 250 + Math.floor(Math.random() * 350);
      const creator = this.props.userId;

      this.props.Action.AddNode(Random.id(12), 'New Node'+x, x, y, true, creator);
      this.Burger.closeMenu();
   }

   doDeleteNode = () => {
      const ref = this.mapRefToNode();

      if(ref !== false)
         this.props.Action.DeleteNode(ref);

      this.Burger.closeMenu();
   }

   doRenameNode = () => {
      const ref = this.mapRefToNode();

      if(ref !== false)
         this.Board['noderef_'+ref].setEditMode(true);

      this.Burger.closeMenu();
   }

   // -------------------------- Board Handler ---------------------------- //
   doAddNodeOnBoard = (event) => {
      const x = event.pageX + (-30 + Math.floor(Math.random() * 60));
      const y = event.pageY + (-30 + Math.floor(Math.random() * 60));
      const creator = this.props.userId;

      this.props.Action.AddNode(Random.id(12), 'New Node'+x, x, y, true, creator);
   }

   doSetActiveObject = (shape, ref) => {
      this.props.Action.SetActiveObject(shape, ref);
   }

   // -------------------------- Node Handler ----------------------------- //
   doNodeChangeText = (event, shape, id, text) => {
      this.props.Action.RenameNode(id, text);
   }

   doNodeDragStop = (event, shape, id, x, y) => {
      this.props.Action.MoveNode(id, x, y);
   }

   // --------------------------------------------------------------------- //
   // ------------------------------ Render ------------------------------- //
   // --------------------------------------------------------------------- //

   renderMenu() {
      return (
         <BurgerMenu 
         onClickAdd = {this.doAddNode}
         onClickDelete = {this.doDeleteNode}
         onClickRename = {this.doRenameNode}
         ref={(me) => this.Burger = me}
         />
      );
   }

   renderBoard() {
      return (
         <Board 
         ref={(me) => this.Board = me} 
         nodes = {this.props.nodes}
         links = {this.props.links}
         active = {this.props.active}
         onNewActiveObject = {this.doSetActiveObject}
         onDoubleClick = {this.doAddNodeOnBoard}
         onRightClick = {this.openContextMenu}
         onClick = {this.closeContextMenu}

         onNodeChangeText = {this.doNodeChangeText}
         onNodeDragStop = {this.doNodeDragStop}
         onNodeRightClick = {this.openContextMenu}
         onNodeClick = {this.closeContextMenu}
         />
      );
   }

   renderContext() {
      return (
         <RightClickMenu 
         ref={(me) => (this.ContextMenu = me)}
         onClickAdd = {this.doAddNodeContext}
         onClickDelete = {this.doDeleteNodeContext}
         onClickRename = {this.doRenameNodeContext}
         />
      );
   }

   render() {
      return (
         <div id="outer-container">
            {this.renderMenu()}
            {this.renderBoard()}
            {this.renderContext()}
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
         Action: Redux.bindActionCreators(ActionMethods, dispatch)
      }
   };

export default ConnectProvider(MapStateToProps, MapDispatchToProps)(App);