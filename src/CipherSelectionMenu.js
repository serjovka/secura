import './CipherSelectionMenu.css'
import React, { Component } from 'react';
import SlidingButton from './SlidingButton'
import Visualizer from './Visualizer';

export default class CipherSelectionMenu extends React.Component {

    constructor(props) {
        super(props);
        this.cipherCases = { Nothing: 0, RSA: 1, AES: 2, CaesarsCipher: 3};
        this.state = {activeСipher: this.cipherCases.Nothing};

        this.chooseRSA = this.chooseRSA.bind(this);
        this.chooseAES = this.chooseAES.bind(this);
        this.chooseCaesarsCipher = this.chooseCaesarsCipher.bind(this);
    }

    chooseAES(){
        if(this.state.activeСipher != this.cipherCases.AES){
            this.setState(state => ({
                activeСipher: this.cipherCases.AES
            }));
            this.props.updateData(this.cipherCases.AES)
        }
        else{
            this.setState(state => ({
                activeСipher: this.cipherCases.Nothing
            }));
            this.props.updateData(this.cipherCases.Nothing)
        }
    }

    chooseRSA(){
        if(this.state.activeСipher != this.cipherCases.RSA){
            this.setState(state => ({
                activeСipher: this.cipherCases.RSA
            }));
            this.props.updateData(this.cipherCases.RSA)
        }
        else{
            this.setState(state => ({
                activeСipher: this.cipherCases.Nothing
            }));
            this.props.updateData(this.cipherCases.Nothing)
        }

    }

    chooseCaesarsCipher(){
        if(this.state.activeСipher != this.cipherCases.CaesarsCipher){
            this.setState(state => ({
                activeСipher: this.cipherCases.CaesarsCipher
            }));
            this.props.updateData(this.cipherCases.CaesarsCipher)
        }
        else{
            this.setState(state => ({
                activeСipher: this.cipherCases.Nothing
            }));
            this.props.updateData(this.cipherCases.Nothing)
        }
    }

    render() {
      return(
        <div className='visualization'>
            <div className='CipherSelection-header'>
                <p className='SuggestionСhoosingCipher'>
                    It's time to choose a cipher for visualization
                </p>
                <div className='CipherSelectionMenu'>
                    <SlidingButton buttonName = "RSA" 
                    buttonFunction = {this.chooseRSA}/>
                    <SlidingButton buttonName = "AES"
                    buttonFunction = {this.chooseAES}/>
                    <SlidingButton buttonName = "Сaesar's cipher"
                    buttonFunction = {this.chooseCaesarsCipher}/>
                </div>
            </div>
            <hr className='Separator'/>
        </div>
      );
    }
}