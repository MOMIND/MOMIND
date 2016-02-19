import Node from '/client/components/Node';

export default class Board extends React.Component {
   getMeteorData() {
      return {
         nodes: MoNodes.find().fetch()
      };
   }

   constructor(props) {
      super(props);
      this.state = {
      };
   }

   renderNode(node, i) {
      const dbId = node._id;
      const id = node.nodeid;
      const text = node.nodetext;
      const parent = node.parentid || 'top';
      const creator = node.localid;
      const x = parent==='top'?0:node.x;
      const y = parent==='top'?0:node.y;
      let Element = (
         <Node 
         key={dbId}
         ref= {'noderef_'+i}
         index={i}
         id={id}
         initialText={text}
         parent={parent}
         creator={creator}
         initialX={x}
         initialY={y}
         />
      );

      this.state.ad
      return Element;
   }



   render() {
      return (
         <div>
            {this.data.nodes.map(this.renderNode)}
         </div>
      );
   }
}

RMixIn(Board.prototype, ReactMeteorData);