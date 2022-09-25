import React from "react";
import "./Slider.css"
import { motion, useAnimation } from "framer-motion" 

export default function Slider(props){
    const controls = useAnimation()

    if(!props.setPosition){
        controls.start({x: 0});
    }

    const handlePan = (any, info) => {
        var offsetWidth = document.getElementsByClassName('Slider')[0].clientWidth - 112;
        const x = info.offset.x;
        if(x >= 0)
           controls.set({x: x < offsetWidth ? x : offsetWidth});
    }

    const handlePanEnd = (any, info) => {
        var offsetWidth = document.getElementsByClassName('Slider')[0].clientWidth - 112;
        if(info.offset.x >= offsetWidth){
            props.onConfirm(info.offset.x);
        }
        else
            controls.start({x: 0})
    }


    return(
        <motion.div 
        className="Slider"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <span>{props.label}</span>
            <motion.div 
            className="toggle"
            animate = {controls}
            onPan = {handlePan}
            onPanEnd = {handlePanEnd}> ✉ </motion.div>
        </motion.div>
    );
}