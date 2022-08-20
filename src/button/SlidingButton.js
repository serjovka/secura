import './SlidingButton.css'
import { motion } from "framer-motion"

function SlidingButton(props){
    return(
        <motion.button 
            className='SlidingButton' 
            onTap = {props.buttonFunction}
            whileHover={{ 
                scale: 1.2,
            }}
            whileTap={{ 
                scale: 0.8,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 17}}
        >
            {props.buttonName}
        </motion.button>
    );
}

export default SlidingButton;