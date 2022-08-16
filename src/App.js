import Description from './Description';
import CipherSelectionMenu from './CipherSelectionMenu';
import Visualizer from './Visualizer';
import './App.css';
import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.cipherCases = { Nothing: 0, RSA: 1, AES: 2, CaesarsCipher: 3};
    this.state = {activeСipher: this.cipherCases.Nothing};
    
    this.GetActivCipherComponent = this.GetActivCipherComponent.bind(this);
  }

  updateData = (value) => {
    this.setState(state =>({
      activeСipher: value
    }));
  }

  GetActivCipherComponent(){
    switch(this.state.activeСipher){
        case 0:
            return (
              <div>
                <Description/>
                <CipherSelectionMenu updateData = {this.updateData}/>
              </div>
            );
        default:
            return(
              <div>
                <CipherSelectionMenu updateData = {this.updateData}/>
                <Visualizer activeСipher = {this.state.activeСipher}/>
              </div>
            );
    }   
  }

  render() {
    return(
      <div className="App">
        <this.GetActivCipherComponent/>
      </div>
    );
  }
}
