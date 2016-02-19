import Board from '/client/components/Board';
import BurgerMenu from '/client/components/BurgerMenu';

export default class App extends React.Component {
   getMeteorData() {
      return {
         null
      };
   }

   constructor(props) {
      super(props);
      this.state = {

      };
   }



   render() {
      return (
         <div>
            <Board />
         </div>
      );
  }
}

App.defaultProps = {
};

App.propTypes = {
};

RMixIn(App.prototype, ReactMeteorData);