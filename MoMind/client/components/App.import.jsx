import Board from '/client/components/Board';
import BurgerMenu from '/client/components/BurgerMenu';

export default class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {

      };
   }

   getMeteorData() {
      return {
         null
      };
   }

   render() {
      return (
         <div id="outer-container">
            <BurgerMenu className="RRBurgerMenu" wrapId="page-wrap" outerId="outer-container"/>
            <Board ref={(me) => this.Board = me} elementId="page-wrap"/>
         </div>
      );
  }
}

RMixIn(App.prototype, ReactMeteorData);