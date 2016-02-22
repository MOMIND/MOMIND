import CustomTypes from '/client/lib/propTypes';
import {ObjectShape, NodeMode} from '/client/lib/actions';

export default class Node extends React.Component {

   // --------------------------------------------------------------------- //
   // ---------------------- Class Initialization ------------------------- //
   // --------------------------------------------------------------------- //

   static propTypes = {
      id: CustomTypes.literal,
      node: CustomTypes.IMap,

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
      onChangeText: (event, shape, id, text) => console.log("Node ChangeText"),
      onRightClick: (event, shape, id) => console.log("Node RightClick"),
   };

   constructor(props) {
      super(props);
      this.onClick = this.onClick.bind(this);
      this.onAcceptEdit = this.onAcceptEdit.bind(this);
      this.onDeclineEdit = this.onDeclineEdit.bind(this);
   }

   state = {
      dragged: false,
      active: false,
      status: NodeMode.DRAG,
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
         },
         distance: 5,
         opacity: 0.5,
      });

      $(ReactDOM.findDOMNode(this)).dblclick((event) => this.onDoubleClick(event));

      $(ReactDOM.findDOMNode(this)).bind("contextmenu", (event) => this.onRightClick(event));
   }



   // --------------------------------------------------------------------- //
   // -------------------------- Class Methods ---------------------------- //
   // --------------------------------------------------------------------- //

   setDivStyle() {
      this.divstyle = {
         left: this.props.node.get('x'),
         top: this.props.node.get('y'),
      };
   }
   setActiveState(active) {
      this.setState({active: active});
      this.forceUpdate();
   }

   setEditMode(bool, fn) {
      if(bool)
         this.setState({status: NodeMode.EDIT}, () => fn);
      else
         this.setState({status: NodeMode.DRAG}, () => fn);
   }

   // --------------------------------------------------------------------- //
   // -------------------------- Event Handler ---------------------------- //
   // --------------------------------------------------------------------- //

   onClick(event) {
      this.props.onClick(event, ObjectShape.NODE, this.props.id);
   }

   onDragStart(event){
      this.onClick();

      this.setState({dragged: true});
      this.props.onDragStart(event, ObjectShape.NODE, this.props.id);
   }

   onDragStop(event, x, y){
      this.setState({dragged: false});
      this.props.onDragStop(event, ObjectShape.NODE, this.props.id, x, y);
   }

   onDoubleClick(event) {
      this.props.onDoubleClick(event, ObjectShape.NODE, this.props.id);
      this.setEditMode(true, () => {this.forceUpdate()});
   }

   onRightClick(event) {
      this.props.onRightClick(event, ObjectShape.NODE, this.props.id);
   }

   onAcceptEdit() {
      this.props.onChangeText(null, ObjectShape.NODE, this.props.id, this.editText.value);
      this.setEditMode(false, this.forceUpdate());
   }

   onDeclineEdit() {
      this.setEditMode(false, this.forceUpdate());
   }

   // --------------------------------------------------------------------- //
   // ------------------------------ Render ------------------------------- //
   // --------------------------------------------------------------------- //

   renderEditMode(text){
      return (
         <div>
            <textarea 
            className="edit" 
            defaultValue={text}
            ref={(me) => this.editText = me}
            onClick={() => this.editText.focus()}
            />
            <button 
            className="btn btn-primary glypicon glyphicon-ok"
            onClick={this.onAcceptEdit}
            />
            <button 
            className="btn btn-danger glypicon glyphicon-remove"
            onClick={this.onDeclineEdit}
            />
         </div>
      );
   }

   renderText(text) {
      if(this.state.status == NodeMode.DRAG) {
         return (
            <div><p className="drag">{text}</p></div>
         );
      } else if (this.state.status == NodeMode.EDIT) {
         return this.renderEditMode(text);
      }
   }

   render() {
      const dclass = "RNode" 
         + (this.props.node.get('root')   ? " root"   : "")
         + (this.state.active ? " active" : "");
      return (
         <div className={dclass} style={this.divstyle} onClick={this.onClick}>
            {this.renderText(this.props.node.get('text'))}
         </div>
      );
   }
}