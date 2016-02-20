import Node from '/client/components/Node';

export default class Board extends React.Component {

   // --------------------------------------------------------------------- //
   // ---------------------- Class Initialization ------------------------- //
   // --------------------------------------------------------------------- //

   static propTypes = {
      elementId: React.PropTypes.string,

   };

   static defaultProps = {
      elementId: 'page-wrap',
   };

   constructor(props) {
      super(props);

      this.setActiveObject = this.setActiveObject.bind(this);
   }

   state = {
      activeObject: {
            id: null,
            type: null,
         },
   };

   // --------------------------------------------------------------------- //
   // -------------------------- Class Methods ---------------------------- //
   // --------------------------------------------------------------------- //

   getMeteorData() {
      return {
         nodes: MoNodes.find().fetch()
      };
   }

   getRef(id, type) {
      let ref = null;

      if(type === 'Node') {
         ref = `noderef_${id}`;
      } else if(type === 'Link') {
         ref = `linkref_${id}`;
      }

      return this.refs[ref];
   }
   // --------------------------------------------------------------------- //
   // ------------------------- React Lifecycle --------------------------- //
   // --------------------------------------------------------------------- //

   componentWillMount() {
   }

   componentDidMount() {
   }

   // --------------------------------------------------------------------- //
   // -------------------------- Event Handler ---------------------------- //
   // --------------------------------------------------------------------- //

   setActiveObject(id, type) 
   {
      let oldRef = this.getRef(this.state.activeObject.id, this.state.activeObject.type);
      let newRef = this.getRef(id, type);

      if(newRef === undefined || newRef === null || oldRef === newRef)
         return;

      if(oldRef !== null && oldRef !== undefined)
         oldRef.setActiveState(false);

      newRef.setActiveState(true);

      this.setState({
         activeObject: {
            id: id,
            type: type,
         },
      });


   }

   setDefaultActiveNode() {
      this.setActiveObject(mapId, 'Node');
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