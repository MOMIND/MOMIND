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
      nodes: CustomTypes.IMap,
      links: CustomTypes.IMap,
      active: CustomTypes.IMap
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
   }

   state = {
      active: IMap({
            id: null,
            shape: null,
         }),
      _bubbleDoubleClick: false,
      _bubbleRightClick: false,
      _bubbleClick: false,
   };

   // --------------------------------------------------------------------- //
   // -------------------------- Class Methods ---------------------------- //
   // --------------------------------------------------------------------- //

   getRef(id, shape) {
      let ref = null;

      if(shape === ObjectShape.NODE) {
         ref = `noderef_${id}`;
      } else if(shape === ObjectShape.LINK) {
         ref = `linkref_${id}`;
      }

      return this.refs[ref];
   }

   setBubbleRightClick(bool) {//setState is too slow 
      this.state._bubbleRightClick = bool;
   }

   setBubbleDoubleClick(bool) {//setState is too slow
      this.state._bubbleDoubleClick = bool;
   }

   setBubbleClick(bool) {//setState is too slow
      this.state._bubbleClick = bool;
   }

   setActiveObject(shape, id) 
   {
      let oldRef = this.getRef(this.state.active.get('id'), this.state.active.get('shape'));
      let newRef = this.getRef(id, shape);

      if(oldRef === newRef) //IF nothing changed, exit early
         return;

      if(newRef !== undefined && newRef !== null)//IF Ref is valid, eg. a Node or Link, set it Active
         newRef.setActiveState(true);
      else if(shape !== ObjectShape.BOARD) //IF Ref is not valid and is not a Board -> cancel
         return;

      if(oldRef !== null && oldRef !== undefined) //IF old Ref is valid, disable activeState.
         oldRef.setActiveState(false);

      this.props.onNewActiveObject(shape, id);

      this.setState({
         active: 
            this.state.active
                        .set('id', id)
                        .set('shape', shape)
      });
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

   onClick() {
      if(this.state._bubbleClick)
         return this.setBubbleClick(false);
      this.props.onClick(null, ObjectShape.BOARD);

      this.setActiveObject(ObjectShape.BOARD, -1);
   }

   onDoubleClick(event) {
      if(this.state._bubbleDoubleClick)
         return this.setBubbleDoubleClick(false);
      this.props.onDoubleClick(event, ObjectShape.BOARD);
   }

   onRightClick(event) {
      if(this.state._bubbleRightClick)
         return this.setBubbleRightClick(false);
      this.props.onRightClick(event, ObjectShape.BOARD);
   }

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
   }

   //If Click comes from Node, Bubble will be true, so Board wont throw a Click Event
   onNodeDoubleClick(event, shape, id){
      this.setBubbleDoubleClick(true);
      this.props.onNodeDoubleClick(event, shape, id);
   }

   // --------------------------------------------------------------------- //
   // ------------------------------ Render ------------------------------- //
   // --------------------------------------------------------------------- //

   renderNodePlain(node, i) {
      const dbId = node._id || 'x';
      const id = node.nodeid || 'x';
      const text = node.nodetext || 'New Node';
      const parent = node.parentid || 'top';
      const creator = node.localid || 'anon';
      const x = parent==='top'?0:node.x;
      const y = parent==='top'?0:node.y;

      let Element = (
         <Node 
         key={dbId}
         ref= {'noderef_'+id}
         index={i}
         id={id}
         initialText={text}
         parent={parent}
         creator={creator}
         initialX={x}
         initialY={y}
         onClick={this.onNodeClick}
         onRightClick={this.onNodeRightClick}
         onDoubleClick={this.onNodeDoubleClick}
         />
      );

      return Element;
   }

   renderNode(value, i) {
      let element = (
         <Node
         ref= {'noderef_'+value[0]}
         index={i}
         key={i}
         node={value[1]}
         id={value[0]}
         onClick={this.onNodeClick}
         onRightClick={this.onNodeRightClick}
         onDoubleClick={this.onNodeDoubleClick}
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