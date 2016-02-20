import Board from '/client/components/Board';
import BurgerMenu from '/client/components/BurgerMenu';

export default class App extends React.Component {

   // --------------------------------------------------------------------- //
   // ---------------------- Class Initialization ------------------------- //
   // --------------------------------------------------------------------- //

   constructor(props) {
      super(props);
   }

   state = {

   };

   // --------------------------------------------------------------------- //
   // -------------------------- Class Methods ---------------------------- //
   // --------------------------------------------------------------------- //

   getMeteorData() {
      return {
         null
      };
   }

   // --------------------------------------------------------------------- //
   // -------------------------- Event Handler ---------------------------- //
   // --------------------------------------------------------------------- //

   placeHolder = () => {
      console.log("NYI");
   }

   // --------------------------------------------------------------------- //
   // ------------------------------ Render ------------------------------- //
   // --------------------------------------------------------------------- //

   render() {
      return (
         <div id="outer-container">
            <BurgerMenu
            onClickLogo={this.placeHolder}
            onClickAdd={this.placeHolder}
            onClickAddSub={this.placeHolder}
            onClickRename={this.placeHolder}
            onClickDelete={this.placeHolder}
            onClickDownload={this.placeHolder}
            onClickLink={this.placeHolder}
            onClickSettings={this.placeHolder}
            />
            <Board 
            ref={(me) => this.Board = me} 
            elementId="page-wrap"
            />
         </div>
      );
  }
}

RMixIn(App.prototype, ReactMeteorData);