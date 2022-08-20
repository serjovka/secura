import "./WordBox.css"
import { motion } from "framer-motion"

export default function CaesarsCipher(props) {
    return(
        <motion.div
            className="WordBox"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="Numeric">{props.numeric}</div>
            <div className="Letter">{props.word}</div>
        </motion.div>

    );
}