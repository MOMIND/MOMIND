import CustomTypes from '/client/lib/propTypes';

export default class _temp extends React.Component {

   // --------------------------------------------------------------------- //
   // ---------------------- Class Initialization ------------------------- //
   // --------------------------------------------------------------------- //

   static propTypes = {
      id: CustomTypes.literal.isRequired,
      name: React.PropTypes.string.isRequired,
   };

   static defaultProps = {
      id: 0,
      name: '_temp'
   };

   constructor(props) {
      super(props);
      this.clickHandler = this.clickHandler.bind(this);
   }

   state = {
      temp: false,
   };

   // --------------------------------------------------------------------- //
   // ------------------------- React Lifecycle --------------------------- //
   // --------------------------------------------------------------------- //

   componentWillMount() {
      this.setDivStyle();
   }

   componentDidMount() {
      this.setState({
         temp: true,
      });
   }

   /*shouldComponentUpdate(nextProps, nextState) {
      console.log("Should Update");
      console.log(nextProps);
      console.log(nextState);
   }*/

   componentWillUpdate(nextProps, nextState) {
      console.log("Will Update");
      console.log(nextProps);
      console.log(nextState);
   }

   componentDidUpdate(prevProps, prevState) {
      console.log("Did Update");
      console.log(prevProps);
      console.log(prevState);
   }

   // --------------------------------------------------------------------- //
   // -------------------------- Class Methods ---------------------------- //
   // --------------------------------------------------------------------- //

   setDivStyle() {
      this.divstyle = {
         display: block
      };
   }

   // --------------------------------------------------------------------- //
   // -------------------------- Event Handler ---------------------------- //
   // --------------------------------------------------------------------- //

   clickHandler() {
      this.props.onClick(this);
   }

   // --------------------------------------------------------------------- //
   // ------------------------------ Render ------------------------------- //
   // --------------------------------------------------------------------- //

   render() {
      const c = '_temp';
      return (
         <div className={c} style={this.divstyle} onClick={this.clickHandler}>
         </div>
      );
   }
}