import CustomTypes from '/client/lib/propTypes';

export default class Node extends React.Component {

   // --------------------------------------------------------------------- //
   // ---------------------- Class Initialization ------------------------- //
   // --------------------------------------------------------------------- //

   static propTypes = {
      id: CustomTypes.literal.isRequired,
      initialText: CustomTypes.literal.isRequired,
      parent: React.PropTypes.string,
      creator: React.PropTypes.string,
      initialX:React.PropTypes.number.isRequired,
      initialY:React.PropTypes.number.isRequired,
      onClick:React.PropTypes.func,
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
      this.setDivStyle()
   }

   componentDidMount() {
      $(ReactDOM.findDOMNode(this)).draggable({
         start: (event, ui) => {
            this.clickHandler()
            this.setState({dragged: true});
         },

         stop: (event, ui) => {
            this.setState({
               dragged: false,
               x: ui.position.left,
               y: ui.position.top,
            });
         }
      });
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

   // --------------------------------------------------------------------- //
   // -------------------------- Event Handler ---------------------------- //
   // --------------------------------------------------------------------- //

   clickHandler() {
      this.props.onClick(this.props.id, 'Node');
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