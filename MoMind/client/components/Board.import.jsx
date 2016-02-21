import Node from '/client/components/Node';
import CustomTypes from '/client/lib/propTypes';
import {ObjectShape, NodeMode, LinkMode} from '/client/lib/actions';

export default class Board extends React.Component {

   // --------------------------------------------------------------------- //
   // ---------------------- Class Initialization ------------------------- //
   // --------------------------------------------------------------------- //

   static propTypes = {
      elementId: React.PropTypes.string,
      onDoubleClick: React.PropTypes.func,
      onRightClick: React.PropTypes.func,
      onNodeDoubleClick: React.PropTypes.func,
      onNodeRightClick: React.PropTypes.func,
      onNewActiveObject: React.PropTypes.func,
      nodes: CustomTypes.IList,
      links: CustomTypes.IList,
   };

   static defaultProps = {
      elementId: 'page-wrap',
      onDoubleClick: (event, shape) => console.log("Board DoubleClick"),
      onRightClick: (event, shape) => console.log("Board RightClick"),
      onNodeDoubleClick: (event, shape, id) => console.log("Node DoubleClick"),
      onNodeRightClick: (event, shade, id) => console.log("Node RightClick"),
      onNewActiveObject: (shape, id) => console.log("New Active Object"),
      nodes: IList([]),
      links: IList([]),
   };

   constructor(props) {
      super(props);

      this.setActiveObject = this.setActiveObject.bind(this);
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
   };

   // --------------------------------------------------------------------- //
   // -------------------------- Class Methods ---------------------------- //
   // --------------------------------------------------------------------- //

   getMeteorData() {
      return {
         nodes: MoNodes.find().fetch()
      };
   }

   getRef(id, shape) {
      let ref = null;

      if(shape === ObjectShape.NODE) {
         ref = `noderef_${id}`;
      } else if(shape === ObjectShape.LINK) {
         ref = `linkref_${id}`;
      }

      return this.refs[ref];
   }

   setBubbleRightClick(bubble) {
      this.setState({
         _bubbleRightClick: bubble,
      });
   }

   setBubbleDoubleClick(bubble) {
      this.setState({
         _bubbleDoubleClick: bubble,
      });
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

   setActiveObject(shape, id) 
   {
      let oldRef = this.getRef(this.state.active.get('id'), this.state.active.get('shape'));
      let newRef = this.getRef(id, shape);

      if(newRef === undefined || newRef === null || oldRef === newRef)
         return;

      if(oldRef !== null && oldRef !== undefined)
         oldRef.setActiveState(false);

      newRef.setActiveState(true);

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

   onDoubleClick() {
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
   onNodeRightClick(event, shape, id){
      this.setBubbleRightClick(true);
      this.props.onNodeRightClick(event, shape, id);
   }

   //If Click comes from Node, Bubble will be true, so Board wont throw a Click Event
   onNodeDoubleClick(event, shape, id){
      this.setBubbleDoubleClick(true);
      this.props.onNodeDoubleClick();
   }

   // --------------------------------------------------------------------- //
   // ------------------------------ Render ------------------------------- //
   // --------------------------------------------------------------------- //

   renderNode(node, i) {
      const dbId = node._id;
      const id = node.nodeid;
      const text = node.nodetext;
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
         onClick={this.setActiveObject}
         onRightClick={this.onNodeRightClick}
         onDoubleClick={this.onNodeDoubleClick}
         />
      );

      return Element;
   }

   render() {
      return (
         <div id={this.props.elementId} className="RBoard">
            {this.data.nodes.map(this.renderNode, this)}
         </div>
      );
   }
}

RMixIn(Board.prototype, ReactMeteorData);