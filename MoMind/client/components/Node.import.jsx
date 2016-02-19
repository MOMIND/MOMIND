export default class Node extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         dragged: false,
         active: false,
         status: 'drag',
         initialText: this.props.text,
         initialX: this.props.x,
         initialY: this.props.y,
      };

      this.clickHandler = this.clickHandler.bind(this, this.props.id);
   }

   componentWillMount() {
      this.setDivStyle()
   }

   componentDidMount() {
      if(this.props.parent=="top")
         Node._Active(this);

      $(ReactDOM.findDOMNode(this)).draggable({
         start: (event, ui) => {
            Node._Active(this);
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
      this.setDivStyle()
   }

   clickHandler(id,) {
      Node._Active(this);
   }

   setDivStyle() {
      this.divstyle = {
         left: this.state.x,
         top: this.state.y,
      };
   }

   setActiveState(active) {
      this.state.active = active;
      //this.forceUpdate();
   }

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

   static _Active(node) {
      if(node === undefined)
         return;
      if(node === Node._ActiveNodeComp)
         return;
      if(Node._ActiveNodeComp !== undefined){
         Node._ActiveNodeComp.setActiveState(false);
      
      console.log(Node._ActiveNodeComp.props.id);}
      console.log(node.props.id);
      Node._ActiveNodeComp = node;
      Node._ActiveNodeComp.setActiveState(true);
   }
}

Node.propTypes = {
   id:React.PropTypes.string.isRequired,
   initialText: React.PropTypes.string.isRequired,
   parent: React.PropTypes.string.isRequired,
   creator: React.PropTypes.string,
   initialX:React.PropTypes.number.isRequired,
   initialY:React.PropTypes.number.isRequired,
};

Node._ActiveNodeComp = undefined;


/*shouldComponentUpdate(nextProps, nextState) {
      console.log("Should");
      console.log(nextProps);
      console.log(nextState);
      return true;
}

componentWillUpdate(nextProps, nextState) {
   console.log("Will");
   console.log(nextProps);
   console.log(nextState);

}

componentDidUpdate(prevProps, prevState) {
   console.log("Did");
   console.log(prevProps);
   console.log(prevState);
}*/