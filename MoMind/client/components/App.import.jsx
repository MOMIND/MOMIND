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
      jsPlumbReady: false,
   };

   // --------------------------------------------------------------------- //
   // ------------------------- React Lifecycle --------------------------- //
   // --------------------------------------------------------------------- //

   componentDidMount() {
      this.props.Action.SetMapId(mapId);
      this.props.Action.SetCreatorId(localId);

      jsPlumb.bind("ready", () => this.jsPlumbDraw());
   }

   // --------------------------------------------------------------------- //
   // -------------------------- Class Methods ---------------------------- //
   // --------------------------------------------------------------------- //

   getMeteorData() {
      return {
         null
      };
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
      this.doDeleteNode();
   }

   doRenameNodeContext = (event, shape, id) => {
      this.doRenameNode();
   }

   doAddSubNodeContext = (event, shape, id) => {
      this.doAddSubNode();
   }
   // -------------------------- Burger Handler --------------------------- //
   doAddNode = () => {
      const x = window.pageXOffset + 250 + Math.floor(Math.random() * 350);
      const y = window.pageYOffset + 250 + Math.floor(Math.random() * 350);
      const creator = this.props.userId;
      const mapId = this.props.mapId;

      this.props.Action.AddNode(Random.id(12), 'New Node', x, y, true, creator, mapId);
   }

   doDeleteNode = () => {
      const ref = this.mapRefToNode();

      if(ref !== false){
         console.log(this.Board.getRef(ObjectShape.NODE, ref));
         this.Board.getRef(ObjectShape.NODE, ref).deleteEndpoint();
         this.props.Action.DeleteNode(ref);
      }
   }

   doRenameNode = () => {
      const ref = this.mapRefToNode();

      if(ref !== false)
         this.Board['noderef_'+ref].setEditMode(true);
   }

   doAddSubNode = () => {
      const ref = this.mapRefToNode();
      if(ref !== false){
         const parent = this.props.nodes.get(ref);
         const x = parent.get('x') - 150 + Math.floor(Math.random() * 300);
         const y = parent.get('y') - 150 + Math.floor(Math.random() * 300);
         const creator = this.props.userId;
         this.props.Action.AddSubNode(Random.id(12), 'New Node', x, y, true, creator, ref);
      }
   }

   // -------------------------- Board Handler ---------------------------- //
   doAddNodeOnBoard = (event) => {
      const x = event.pageX + (-30 + Math.floor(Math.random() * 60));
      const y = event.pageY + (-30 + Math.floor(Math.random() * 60));
      const creator = this.props.userId;
      const mapId = this.props.mapId;

      this.props.Action.AddNode(Random.id(12), 'New Node', x, y, true, creator, mapId);
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
         onClickAddSub = {this.doAddSubNode}
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
         mapId={this.props.mapId+""}
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
         onClickAddSub = {this.doAddSubNodeContext}
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

   jsPlumbDraw = () => {
      this.setState({
         jsPlumbReady: true,
      })
   }
}


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