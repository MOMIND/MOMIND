import Node from '/client/components/Node';
import CustomTypes from '/client/lib/propTypes';
import {ObjectShape, NodeMode, LinkMode} from '/client/lib/actions';

export default class Board extends React.Component {

   // --------------------------------------------------------------------- //
   // ---------------------- Class Initialization ------------------------- //
   // --------------------------------------------------------------------- //

   static propTypes = {
      elementId: React.PropTypes.string,
      onClick: React.PropTypes.func,
      onDoubleClick: React.PropTypes.func,
      onRightClick: React.PropTypes.func,
      onNodeClick: React.PropTypes.func,
      onNodeDoubleClick: React.PropTypes.func,
      onNodeRightClick: React.PropTypes.func,
      onNewActiveObject: React.PropTypes.func,
      onNodeChangeText: React.PropTypes.func,
      onNodeDragStop: React.PropTypes.func,
      nodes: CustomTypes.IMap,
      links: CustomTypes.IMap,
      active: CustomTypes.IMap,
      mapId: CustomTypes.literal,
   };

   static defaultProps = {
      elementId: 'page-wrap',
      onClick: (event, shape) => console.log("Board Click"),
      onDoubleClick: (event, shape) => console.log("Board DoubleClick"),
      onRightClick: (event, shape) => console.log("Board RightClick"),
      onNodeClick: (event, shape, id) => console.log("Node Click"),
      onNodeDoubleClick: (event, shape, id) => console.log("Node DoubleClick"),
      onNodeRightClick: (event, shade, id) => console.log("Node RightClick"),
      onNewActiveObject: (shape, id) => console.log("New Active Object"),
      onNodeChangeText : (event,shape, id, text) => console.log("Default Node Text"),
      onNodeDragStop: (event, shape, id, x, y) => console.log("Default Node Drag Stop"),
      nodes: IMap({}),
      links: IMap({}),
      active: IMap({}),
   };

   constructor(props) {
      super(props);

      this.onClick = this.onClick.bind(this);
      this.onNodeClick = this.onNodeClick.bind(this);
      this.onNodeRightClick = this.onNodeRightClick.bind(this);
      this.onNodeDoubleClick = this.onNodeDoubleClick.bind(this);
      this.onNodeChangeText = this.onNodeChangeText.bind(this);
      this.onNodeDragStop = this.onNodeDragStop.bind(this);
      this.onNodeDrawLineRequest = this.onNodeDrawLineRequest.bind(this);
      this.onNodeDrag = this.onNodeDrag.bind(this);
   }

   state = {
      _bubbleDoubleClick: false,
      _bubbleRightClick: false,
      _bubbleClick: false,
   };

   // --------------------------------------------------------------------- //
   // -------------------------- Class Methods ---------------------------- //
   // --------------------------------------------------------------------- //

   getRef(shape, ref) {
      let r = null;

      if(shape === ObjectShape.NODE) {
         r = `noderef_${ref}`;
      } else if(shape === ObjectShape.LINK) {
         r = `linkref_${ref}`;
      }

      return r === null ? null: this[r];
   }

   setBubbleRightClick(bool) {//state and setState is asynchronous and thus too slow 
      this._bubbleRightClick = bool;
   }

   setBubbleDoubleClick(bool) {//state and setState is asynchronous and thus too slow 
      this._bubbleDoubleClick = bool;
   }

   setBubbleClick(bool) {//state and setState is asynchronous and thus too slow 
      this._bubbleClick = bool;
   }

   setActiveObject(shape, ref) 
   {
      let oldRef = this.getRef(this.props.active.get('shape'), this.props.active.get('ref'));
      let newRef = this.getRef(shape, ref);

      if(oldRef === newRef) //IF nothing changed, exit early
         return;

      if(newRef !== undefined && newRef !== null)//IF Ref is valid, eg. a Node or Link, set it Active
         newRef.setActiveState(true);
      else if(shape !== ObjectShape.BOARD) //IF Ref is not valid and is not a Board -> cancel
         return;

      if(oldRef !== null && oldRef !== undefined) //IF old Ref is valid, disable activeState.
         oldRef.setActiveState(false);

      this.props.onNewActiveObject(shape, ref);
   }

   setDefaultActiveNode() {
      this.setActiveObject(ObjectShape.NODE, mapId);
   }
   // --------------------------------------------------------------------- //
   // ------------------------- React Lifecycle --------------------------- //
   // --------------------------------------------------------------------- //

   componentWillMount() {
   }

   componentDidMount() {
      $(ReactDOM.findDOMNode(this)).dblclick((event) => this.onDoubleClick(event));

      $(ReactDOM.findDOMNode(this)).bind("contextmenu", (event) => this.onRightClick(event));
   }



   // --------------------------------------------------------------------- //
   // -------------------------- Event Handler ---------------------------- //
   // --------------------------------------------------------------------- //

   // -------------------------- Board Handler ---------------------------- //
   onClick(event) {
      if(this._bubbleClick)
         return this.setBubbleClick(false);
      this.props.onClick(null, ObjectShape.BOARD);

      this.setActiveObject(ObjectShape.BOARD, -1);
   }

   onDoubleClick(event) {
      if(this._bubbleDoubleClick)
         return this.setBubbleDoubleClick(false);
      this.props.onDoubleClick(event, ObjectShape.BOARD);
   }

   onRightClick(event) {
      if(this._bubbleRightClick)
         return this.setBubbleRightClick(false);
      this.props.onRightClick(event, ObjectShape.BOARD);
   }

   // -------------------------- Node Handler ----------------------------- //

   //If Click comes from Node, Bubble will be true, so Board wont throw a Click Event
   onNodeClick(event, shape, id){
      this.setBubbleClick(true);
      this.props.onNodeClick(event, shape, id);

      this.setActiveObject(shape, id);
   }

   //If Click comes from Node, Bubble will be true, so Board wont throw a Click Event
   onNodeRightClick(event, shape, id){
      this.setBubbleRightClick(true);
      this.props.onNodeRightClick(event, shape, id);

      this.setActiveObject(shape, id);
   }

   //If Click comes from Node, Bubble will be true, so Board wont throw a Click Event
   onNodeDoubleClick(event, shape, id){
      this.setBubbleDoubleClick(true);
      this.props.onNodeDoubleClick(event, shape, id);
   }

   onNodeChangeText(event, shape, id, text){
      this.props.onNodeChangeText(event, shape, id, text);
   }

   onNodeDragStop(event, shape, id, x, y) {
      this.props.onNodeDragStop(event, shape, id, x, y);
   }

   onNodeDrawLineRequest(childel, parentid)
   {
      let ref = this.getRef(ObjectShape.NODE, parentid)
      if(ref === null)
         return;
      let endpointOptions = { isSource:true, isTarget:true }; 
      let c = jsPlumb.addEndpoint(ReactDOM.findDOMNode(childel), { anchor:"Center" }, endpointOptions );  
      let p = jsPlumb.addEndpoint(ReactDOM.findDOMNode(ref), { anchor:"Center" }, endpointOptions );  
      childel.setEndpoint(c);
      console.log(c);
      jsPlumb.connect({ 
          source:c,
          target:p,
          connector: "Bezier",
          paintStyle:{ lineWidth:2, strokeStyle:'green'}
      });


   }

   onNodeDrag() {
      jsPlumb.repaintEverything();
   }

   // --------------------------------------------------------------------- //
   // ------------------------------ Render ------------------------------- //
   // --------------------------------------------------------------------- //

   renderNode(value, i) {
      let element = (
         <Node
         ref= {(me) => this['noderef_'+value[0]] = me}
         index={value[0]}
         key={value[0]}
         node={value[1]}
         id={value[0]}
         mapId={this.props.mapId}
         onClick={this.onNodeClick}
         onRightClick={this.onNodeRightClick}
         onDoubleClick={this.onNodeDoubleClick}
         onChangeText={this.onNodeChangeText}
         onDragStop={this.onNodeDragStop}
         onRequestParent={this.onNodeDrawLineRequest}
         onDrag={this.onNodeDrag}
         />
      );
      return element;
   }

   render() {
      return (
         <div 
         id={this.props.elementId} 
         className="RBoard"
         onClick={this.onClick}>
            {this.props.nodes.entrySeq().map(this.renderNode, this)}
         </div>
      );
   }
}