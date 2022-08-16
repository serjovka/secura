import './Rsa.css';
import React, { Component } from 'react';
import SlidingButton from './SlidingButton'
import { motion } from "framer-motion"

export default class Rsa extends React.Component {
    constructor(props) {
        super(props);
        this.state = {stageCounter: 1};
        this.minStage = 1;
        this.maxStage = 10;
        this.incrementStage = this.incrementStage.bind(this);
        this.decrementStage = this.decrementStage.bind(this);
    }

    incrementStage(){
        if(this.state.stageCounter < this.maxStage){
            this.setState(state => ({
                stageCounter: state.stageCounter + 1
            }));
        }
    }

    decrementStage(){
        if(this.state.stageCounter > this.minStage){
            this.setState(state => ({
                stageCounter: state.stageCounter - 1
            }));
        }
    }

    render() {
      return(
        <motion.div 
            className='Rsa'
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            exit={{
                opacity: 0, 
                scale: 0.5,
                transition: { duration: 0.5 }
            }}
            key = "RSA"
        >
            <div className='ControlMenu'>
                <SlidingButton buttonName = "←" buttonFunction = {this.decrementStage}></SlidingButton>
                <SlidingButton buttonName = "→" buttonFunction = {this.incrementStage}></SlidingButton>
                <p className='stage'> RSA. Этап {this.state.stageCounter}</p>
            </div>
        </motion.div>
      );
    }
}
