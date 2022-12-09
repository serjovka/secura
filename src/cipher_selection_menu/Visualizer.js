import React, { Component } from 'react';
import CaesarsCipher from './ciphers_components/CaesarCipher';
import VigenereCipher from './ciphers_components/VigenereCipher';
import PairCipher from "./ciphers_components/PairCipher"

export default class Visualizer extends React.Component {

    constructor(props) {
        super(props);
        this.GetActivCipherComponent = this.GetActivCipherComponent.bind(this);

    }

    GetActivCipherComponent(){
        switch(this.props.activeСipher){
            case 0:
                return;
            case 1:
                return(<VigenereCipher/>)
            case 2:
                return(<PairCipher />)
            case 3:
                return(<CaesarsCipher/>)
        }
        
    }

    render() {
        return(
            <div className='Visualizer'>
                <this.GetActivCipherComponent/>
            </div>
        );
    }
}