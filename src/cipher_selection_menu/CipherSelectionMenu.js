import './CipherSelectionMenu.css'
import React, { Component } from 'react';
import SlidingButton from '../button/SlidingButton'

export default class CipherSelectionMenu extends React.Component {

    constructor(props) {
        super(props);
        this.cipherCases = { Nothing: 0, VigenereCipher: 1, AES: 2, CaesarsCipher: 3};
        this.chooseVigenereCipher = this.chooseVigenereCipher.bind(this);
        this.chooseAES = this.chooseAES.bind(this);
        this.chooseCaesarsCipher = this.chooseCaesarsCipher.bind(this);
        this.chooseNothing = this.chooseNothing.bind(this);
    }

    chooseAES(){
        this.props.updateData(this.cipherCases.AES)
    }

    chooseVigenereCipher(){
        this.props.updateData(this.cipherCases.VigenereCipher)
    }

    chooseCaesarsCipher(){
        this.props.updateData(this.cipherCases.CaesarsCipher)
    }

    chooseNothing(){
        this.props.updateData(this.cipherCases.Nothing)
    }


    render() {
      return(
        <div className='visualization'>
            <div className='CipherSelection-header'>
                <p className='SuggestionСhoosingCipher'>
                    It's time to choose a cipher for visualization
                </p>
                <div className='CipherSelectionMenu'>
                    <SlidingButton 
                        buttonName = "Vigenere cipher" 
                        buttonFunction = {this.chooseVigenereCipher}
                    />
                    <SlidingButton 
                        buttonName = "AES"
                        buttonFunction = {this.chooseAES}
                    />
                    <SlidingButton 
                        buttonName = "Сaesar's cipher"
                        buttonFunction = {this.chooseCaesarsCipher}
                    />
                    <SlidingButton 
                        buttonName = "Back"
                        buttonFunction = {this.chooseNothing}
                    />
                </div>
            </div>
            <hr className='Separator'/>
        </div>
      );
    }
}