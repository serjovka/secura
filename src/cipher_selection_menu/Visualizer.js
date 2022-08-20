import React, { Component } from 'react';
import CaesarsCipher from './ciphers_components/CaesarCipher';
import Rsa from './ciphers_components/Rsa';

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
                return(<Rsa/>);
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