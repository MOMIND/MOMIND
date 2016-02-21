import CustomTypes from '/client/lib/propTypes';
import {ObjectShape, NodeMode} from '/client/lib/actions';

export default class Node extends React.Component {

   // --------------------------------------------------------------------- //
   // ---------------------- Class Initialization ------------------------- //
   // --------------------------------------------------------------------- //

   static propTypes = {
      id: CustomTypes.literal,
      node: CustomTypes.IMap,
      initialText: CustomTypes.literal,
      creator: CustomTypes.literal.isRequired,
      initialX:React.PropTypes.number.isRequired,
      initialY:React.PropTypes.number.isRequired,

      onClick:React.PropTypes.func,
      onDoubleClick: React.PropTypes.func,
      onDragStart: React.PropTypes.func,
      onDragStop: React.PropTypes.func,
      onChangeText: React.PropTypes.func,
      onRightClick: React.PropTypes.func,
   };

   static defaultProps = {
      onClick: (event, shape, id) => console.log("Node Click"),
      onDoubleClick: (event, shape, id) => console.log("Node DoubleClick"),
      onDragStart: (event, shape, id) => console.log("Node DragStart"),
      onDragStop: (event, shape, id, x, y) => console.log("Node DragStop"),
      onChangeText: (text, shape, id) => console.log("Node ChangeText"),
      onRightClick: (event, shape, id) => console.log("Node RightClick"),
   };

   constructor(props) {
      super(props);
      this.onClick = this.onClick.bind(this, this.props.id);
   }

   state = {
      dragged: false,
      active: false,
      status: NodeMode.DRAG,
      text: this.props.initialText,
      x: this.props.initialX,
      y: this.props.initialY,
   };

   // --------------------------------------------------------------------- //
   // ------------------------- React Lifecycle --------------------------- //
   // --------------------------------------------------------------------- //

   componentWillMount() {
      this.setDivStyle();
   }

   componentDidMount() {
      $(ReactDOM.findDOMNode(this)).draggable({
         start: (event, ui) => {
            this.onDragStart(event);
         },

         stop: (event, ui) => {
            this.onDragStop(event, ui.position.left, ui.position.top);
         }
      });

      $(ReactDOM.findDOMNode(this)).dblclick((event) => this.onDoubleClick(event));

      $(ReactDOM.findDOMNode(this)).bind("contextmenu", (event) => this.onRightClick(event));
   }



   // --------------------------------------------------------------------- //
   // -------------------------- Class Methods ---------------------------- //
   // --------------------------------------------------------------------- //

   setDivStyle() {
      this.divstyle = {
         left: this.state.x,
         top: this.state.y,
      };
   }
   setActiveState(active) {
      this.state.active = active;
      this.forceUpdate();
   }

   changeText(newText) {
      this.state({
         text: newText,
      });
   }

   // --------------------------------------------------------------------- //
   // -------------------------- Event Handler ---------------------------- //
   // --------------------------------------------------------------------- //

   onClick() {
      this.props.onClick(null, ObjectShape.NODE, this.props.id);
   }

   onDragStart(event){
      this.onClick();

      this.setState({dragged: true});
      this.props.onDragStart(event, ObjectShape.NODE, this.props.id);
   }

   onDragStop(event, x, y){
      this.setState({
         dragged: false,
         x: x,
         y: y,
      });
      this.props.onDragStop(event, ObjectShape.NODE, this.props.id, x, y);
   }

   onDoubleClick(event) {
      this.props.onDoubleClick(event, ObjectShape.NODE, this.props.id);
   }

   onRightClick(event) {
      this.props.onRightClick(event, ObjectShape.NODE, this.props.id);
   }

   // --------------------------------------------------------------------- //
   // ------------------------------ Render ------------------------------- //
   // --------------------------------------------------------------------- //

   render() {
      const dclass = "RNode" 
         + (this.props.parent == "top" ? " root"   : "")
         + (this.state.active          ? " active" : "");
      const pclass = this.state.status == NodeMode.DRAG ? "drag" : "edit";
      return (
         <div className={dclass} style={this.divstyle} onClick={this.onClick}>
            <p className={pclass}>{this.state.text}</p>
         </div>
      );
   }
}