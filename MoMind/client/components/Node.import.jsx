export default class Node extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         dragged: false,
         status: 'drag',
         text: this.props.text,
         x: this.props.x,
         y: this.props.y,
      };
   }

   componentWillMount() {
      this.divstyle = {
         left: this.props.x,
         top: this.props.y,
      };
   }

   componentDidMount() {
      $(ReactDOM.findDOMNode(this)).draggable({
         start: (event, ui) => {
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

   test() {
      console.log("testing");
   }

   render() {
      const dclass = "RNode" + (this.props.parent=="top"?" root":"");
      const pclass = this.state.status;
      return (
         <div className={dclass} style={this.divstyle}>
            <p className={pclass}>{this.props.id}</p>
         </div>
      );
   }
}

Node.propTypes = {
   id:React.PropTypes.string.isRequired,
   text: React.PropTypes.string.isRequired,
   parent: React.PropTypes.string.isRequired,
   creator: React.PropTypes.string,
   x:React.PropTypes.number.isRequired,
   y:React.PropTypes.number.isRequired,
};
