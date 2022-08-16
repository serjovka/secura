import React, { Component } from 'react';
import CipherSelectionMenu from './CipherSelectionMenu';
import Rsa from './Rsa';

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