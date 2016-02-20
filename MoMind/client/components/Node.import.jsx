import CustomTypes from '/client/lib/propTypes';

export default class Node extends React.Component {

   // --------------------------------------------------------------------- //
   // ---------------------- Class Initialization ------------------------- //
   // --------------------------------------------------------------------- //

   static propTypes = {
      id: CustomTypes.literal.isRequired,
      initialText: CustomTypes.literal.isRequired,
      creator: CustomTypes.literal.isRequired,
      initialX:React.PropTypes.number.isRequired,
      initialY:React.PropTypes.number.isRequired,
      onClick:React.PropTypes.func,
      onDoubleClick: React.PropTypes.func,
      onDragStart: React.PropTypes.func,
      onDragStop: React.PropTypes.func,
      onChangeText: React.PropTypes.func,
   };

   static defaultProps = {
      onClick: () => console.log("Default Click"),
      onDoubleClick: () => console.log("Default DoubleClick"),
      onDragStart: () => console.log("Default DragStart"),
      onDragStop: () => console.log("Default DragStop"),
      onChangeText: () => console.log("Default ChangeText"),
   };

   constructor(props) {
      super(props);
      this.clickHandler = this.clickHandler.bind(this, this.props.id);
   }

   state = {
      dragged: false,
      active: false,
      status: 'drag',
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
            this.onDragStart();
         },

         stop: (event, ui) => {
            this.onDragStop(ui.position.left, ui.position.top);
         }
      });

      $(ReactDOM.findDOMNode(this)).dblclick(() => this.onDoubleClick());
   }

   componentWillUpdate(nextProps, nextState) {
      this.setDivStyle();
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

   clickHandler(id) {
      this.props.onClick(id, 'Node');
   }

   onDragStart(){
      this.clickHandler();

      this.setState({dragged: true});
      this.props.onDragStart();
   }

   onDragStop(x, y){
      this.setState({
         dragged: false,
         x: x,
         y: y,
      });
      this.props.onDragStop();
   }

   onDoubleClick() {
      this.props.onDoubleClick();
   }

   // --------------------------------------------------------------------- //
   // ------------------------------ Render ------------------------------- //
   // --------------------------------------------------------------------- //

   render() {
      const dclass = "RNode" 
         + (this.props.parent == "top" ? " root"   : "")
         + (this.state.active          ? " active" : "");
      const pclass = this.state.status;
      return (
         <div className={dclass} style={this.divstyle} onClick={this.clickHandler}>
            <p className={pclass}>{this.props.id}</p>
         </div>
      );
   }
}