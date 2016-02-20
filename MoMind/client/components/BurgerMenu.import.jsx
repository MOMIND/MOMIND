export default class BurgerMenu extends React.Component {
   // --------------------------------------------------------------------- //
   // ---------------------- Class Initialization ------------------------- //
   // --------------------------------------------------------------------- //

   static propTypes = {
      wrapId: React.PropTypes.string.isRequired,
      outerId: React.PropTypes.string.isRequired,
      width: React.PropTypes.number,
   };

   static defaultProps = {
      width:250
   };

   constructor(props) {
      super(props);
   }

   state = {
   };
 
   // --------------------------------------------------------------------- //
   // -------------------------- Class Methods ---------------------------- //
   // --------------------------------------------------------------------- //
  

   // --------------------------------------------------------------------- //
   // -------------------------- Event Handler ---------------------------- //
   // --------------------------------------------------------------------- //

   showSettings(event) {
      event.preventDefault();
   }

   // --------------------------------------------------------------------- //
   // ------------------------------ Render ------------------------------- //
   // --------------------------------------------------------------------- //

   render() {
      return (
         <RBurgerMenu width={this.props.width} pageWrapId={this.props.wrapId} outerContainerId={this.props.containerId}>
            <div className="burger-div header">
               <img src="/img/mowe.png" alt="MoMind"/><span>MoMind</span>
            </div>
            <div className="burger-div actions">
               <a href="#" className="burger-item" id="newNode">New Node</a>
               <a href="#" className="burger-item" id="newSubNode">New Subnode</a>
               <a href="#" className="burger-item" id="renameNode">Rename Node</a>
               <a href="#" className="burger-item" id="deleteNode">Delete Node</a>
            </div>
            <div className="burger-div settings">
               <a href="#" className="burger-item" id="downloadPdf">Download PDF</a>
            </div>
            <div className="burger-div footer">
               <a href="#" className="burger-item" id="info"></a>
            </div>
         </RBurgerMenu>
      );
   }
}