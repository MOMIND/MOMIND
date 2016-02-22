import CustomTypes from '/client/lib/propTypes';
import {ObjectShape, NodeMode} from '/client/lib/actions';

export default class Node extends React.Component {

   // --------------------------------------------------------------------- //
   // ---------------------- Class Initialization ------------------------- //
   // --------------------------------------------------------------------- //

   static propTypes = {
      id: CustomTypes.literal,
      node: CustomTypes.IMap,
      mapId: CustomTypes.literal,
      onClick:React.PropTypes.func,
      onDoubleClick: React.PropTypes.func,
      onDragStart: React.PropTypes.func,
      onDrag: React.PropTypes.func,
      onDragStop: React.PropTypes.func,
      onChangeText: React.PropTypes.func,
      onRightClick: React.PropTypes.func,
      onRequestParent: React.PropTypes.func,
   };

   static defaultProps = {
      onClick: (event, shape, id) => console.log("Node Click"),
      onDoubleClick: (event, shape, id) => console.log("Node DoubleClick"),
      onDragStart: (event, shape, id) => console.log("Node DragStart"),
      onDrag: (event, shape, id, x, y) => console.log("Node Drag"),
      onDragStop: (event, shape, id, x, y) => console.log("Node DragStop"),
      onChangeText: (event, shape, id, text) => console.log("Node ChangeText"),
      onRightClick: (event, shape, id) => console.log("Node RightClick"),
      onRequestParent: (childthis, parentid) => console.log("Want Draw Line"), 
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
      endpoint: null,
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

         drag: (event, ui) => {
            this.onDrag(event, ui.position.left, ui.position.top);
         },

         stop: (event, ui) => {
            this.onDragStop(event, ui.position.left, ui.position.top);
         },
         distance: 10,
         opacity: 0.65,
      });

      $(ReactDOM.findDOMNode(this)).dblclick((event) => this.onDoubleClick(event));
      $(ReactDOM.findDOMNode(this)).bind("contextmenu", (event) => this.onRightClick(event));
   
      this.createLink()
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

   createLink() {
      if(!this.props.node.getIn(['parent', this.props.mapId]) == true)
         this.props.onRequestParent(this, this.props.node.getIn(['parent']).toList().get(0));
   }

   setEndpoint(obj)
   {
      this.setState({
         endpoint: obj,
      })
   }

   deleteEndpoint()
   {
      console.log(this.state.endpoint);
      jsPlumb.deleteEndpoint(this.state.endpoint);
      jsPlumb.repaintEverything();
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

   onDrag(event, x, y) {
      this.props.onDrag(event, ObjectShape.NODE, this.props.id, x, y);
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
         + (!this.props.node.getIn(['parent', this.props.mapId])   ? ""   : " root")
         + (this.state.active ? " active" : "");
      return (
         <div className={dclass} style={this.divstyle} onClick={this.onClick}>
            {this.renderText(this.props.node.get('text'))}
         </div>
      );
   }
}