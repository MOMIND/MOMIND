export default class BurgerMenu extends React.Component {
   // --------------------------------------------------------------------- //
   // ---------------------- Class Initialization ------------------------- //
   // --------------------------------------------------------------------- //

   static propTypes = {
      wrapId: React.PropTypes.string,
      outerId: React.PropTypes.string,
      width: React.PropTypes.number,
      onClickLogo: React.PropTypes.func,
      onClickAdd: React.PropTypes.func,
      onClickAddSub: React.PropTypes.func,
      onClickRename: React.PropTypes.func,
      onClickDelete: React.PropTypes.func,
      onClickDownload: React.PropTypes.func,
      onClickLink: React.PropTypes.func,
      onClickSettings: React.PropTypes.func,
      onOpenMenu: React.PropTypes.func,
      onCloseMenu: React.PropTypes.func,
   };

   static defaultProps = {
      wrapId: 'page-wrap',
      outerId: 'outer-container',
      width: 250,
      onClickLogo: () => console.log("Default Logo"),
      onClickAdd: () => console.log("Default AddNode"),
      onClickAddSub: () => console.log("Default AddSubNode"),
      onClickRename: () => console.log("Default RenameNode"),
      onClickDelete: () => console.log("Default DeleteNode"),
      onClickDownload: () => console.log("Default DownloadPDF"),
      onClickLink: () => console.log("Default ShareMap"),
      onClickSettings: () => console.log("Default Settings"),
      onOpenMenu: () => console.log("Default OpenMenu"),
      onCloseMenu: () => console.log("Default CloseMenu"),
   };

   constructor(props) {
      super(props);
   }

   state = {
      open: false,
   };
 
   // --------------------------------------------------------------------- //
   // -------------------------- Class Methods ---------------------------- //
   // --------------------------------------------------------------------- //
  
   showSettings(event) {
      event.preventDefault();
   }

   // --------------------------------------------------------------------- //
   // -------------------------- Event Handler ---------------------------- //
   // --------------------------------------------------------------------- //

   clickLogo = () => {
      this.props.onClickLogo();
   }
   clickAdd = () => {
      this.props.onClickAdd();
   }
   clickAddSub = () => {
      this.props.onClickAddSub();
   }
   clickRename = () => {
      this.props.onClickRename();
   }
   clickDelete = () => {
      this.props.onClickDelete();
   }
   clickDownload = () => {
      this.props.onClickDownload();
   }
   clickLink = () => {
      this.props.onClickLink();
   }
   clickSettings = () => {
      this.props.onClickSettings();
   }
   isMenuOpen = (state) => {
      if(state.isOpen) {
         this.setState({ open:true });
         this.props.onOpenMenu();
      } else {
         this.setState({ open:false });
         this.props.onCloseMenu();
      }

   }

   // --------------------------------------------------------------------- //
   // ------------------------------ Render ------------------------------- //
   // --------------------------------------------------------------------- //

   render() {
      return (
         <RBurgerMenu 
         width={this.props.width} 
         pageWrapId={this.props.wrapId} 
         outerContainerId={this.props.containerId}
         onStateChange={this.isMenuOpen}>
            <div className="burger-div header">
               <img src="/img/mowe.png" alt="MoMind" onClick={this.clickLogo}/><span>MoMind</span>
            </div>
            <div className="burger-div actions">
               <a className="burger-item" id="newNode" onClick={this.clickAdd}>
                  <img className="svg" src="/img/add2.svg"/> New Node</a>
               <a className="burger-item" id="newSubNode" onClick={this.clickAddSub}>
                  <img className="svg" src="/img/add1.svg"/> New Subnode</a>
               <a className="burger-item" id="renameNode" onClick={this.clickRename}>
                  <img className="svg" src="/img/edit.svg"/> Rename Node</a>
               <a className="burger-item" id="deleteNode" onClick={this.clickDelete}>
                  <img className="svg" src="/img/delete.svg"/> Delete Node</a>
            </div>
            <div className="burger-div options">
               <a className="burger-item" id="downloadPdf" onClick={this.clickDownload}>
                  <img className="svg" src="/img/download.svg"/> Download PDF</a>
               <a className="burger-item" id="getLink" onClick={this.clickLink}>
                  <img className="svg" src="/img/bookmark.svg"/>Share Mindmap</a>
            </div>
            <div className="burger-div footer">
               <a className="burger-item" id="settings" onClick={this.clickSettings}>
                  <img className="svg" src="/img/settings.svg" alt="Settings and Information"/></a>
            </div>
         </RBurgerMenu>
      );
   }
}