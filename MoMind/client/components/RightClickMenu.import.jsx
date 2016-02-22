import {ObjectShape, NodeMode} from '/client/lib/actions';

export default class RightClickMenu extends React.Component {
   // --------------------------------------------------------------------- //
   // ---------------------- Class Initialization ------------------------- //
   // --------------------------------------------------------------------- //

   static propTypes = {
      onClickAdd: React.PropTypes.func,
      onClickRename: React.PropTypes.func,
      onClickDelete: React.PropTypes.func,
      clickAddSub: React.PropTypes.func,
   };
   static defaultProps = {
      onClickAdd: (event, shape, id) => console.log("Context AddNode", shape, id),
      onClickRename: (event, shape, id) => console.log("Context RenameNode", shape, id),
      onClickDelete: (event, shape, id) => console.log("Context DeleteNode", shape, id),
      clickAddSub: (event, shape, id) => console.log("Context AddSubNode", shape, id),
   };
   
   constructor(props) {
      super(props);
   }

   state = {
      show: false,
      shape: ObjectShape.NULL,
      id: -1,
   };

   // --------------------------------------------------------------------- //
   // -------------------------- Class Methods ---------------------------- //
   // --------------------------------------------------------------------- //

   hideMenu() {
      this.setState({show: false});
      this.forceUpdate();
   }

   showMenu() {
      this.setState({show: true});
      this.forceUpdate();
   }

   setContext(shape, id) {
      this.setState({
         shape: shape,
         id: id,
      });
   }


   // --------------------------------------------------------------------- //
   // -------------------------- Event Handler ---------------------------- //
   // --------------------------------------------------------------------- //

   clickAdd = (event) => {
      this.hideMenu();
      this.props.onClickAdd(event, this.state.shape, this.state.id);
   }
   clickAddSub = (event) => {
      this.hideMenu();
      this.props.onClickAddSub(event, this.state.shape, this.state.id);
   }
   clickRename = (event) => {
      this.hideMenu();
      this.props.onClickRename(event, this.state.shape, this.state.id);
   }
   clickDelete = (event) => {
      this.hideMenu();
      this.props.onClickDelete(event, this.state.shape, this.state.id);
   }

   renderNodeMenu() {
      return (
         <div className="context-items">
            <a className="context-menu-item" id="deleteNode" onClick={this.clickDelete}>Delete this Node</a>
            <a className="context-menu-item" id="renameNode" onClick={this.clickRename}>Rename this Node</a>
            <a className="context-menu-item" id="renameNode" onClick={this.clickAddSub}>Create Subnode</a>
         </div>
      );
   }

   renderBoardMenu() {
      return (
         <div className="context-items">
            <a className="context-menu-item" id="newNode" onClick={this.clickAdd}>Create new Node</a>
         </div>
      );
   }

   renderMenu() {
      if(this.state.shape === ObjectShape.NODE) {
         return this.renderNodeMenu();
      } else if(this.state.shape === ObjectShape.BOARD) {
         return this.renderBoardMenu();
      }
      return (
         <div/>
      );
   }

   render() {

      const c = 'custom-menu' + (this.state.show===true ? ' show-menu' : ' hide-menu');
      return(
         <div className={c}>
            <p>MoMind Menu</p>
            {this.renderMenu()}
         </div>
      );
   }
}