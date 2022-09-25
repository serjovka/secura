import React, { useState } from 'react'
import SlidingButton from '../../button/SlidingButton'
import { motion } from "framer-motion"

export default function VigenereCipher() {
    var stages = {
        "1": "Ввод данных",
        "2": "Смещение значение каждого символа",
        "3": "Отправка сообщения",
        "4": "Обратное смещение значения каждого символа",
        "5": "Вывод данных"
    }

    let [stage, setStage] = useState(1);

    incrementStage = incrementStage.bind(this);
    decrementStage = decrementStage.bind(this);

    function incrementStage(){
        setStage(++stage);
    }

    function decrementStage(){
        setStage(--stage);
    }

    return(
        <motion.div
            className = 'VigenereCipher'
            initial = {{ opacity: 0, scale: 0.5 }}
            animate = {{ opacity: 1, scale: 1 }}
            transition = {{ duration: 0.5 }}
        >
        <div className='CCControlMenu'>
            <SlidingButton 
                buttonName = "←" 
                buttonFunction = {decrementStage}
            />
            <SlidingButton 
            buttonName = "→" 
            buttonFunction = {incrementStage}
            />
            <p className='CCstage'> Шифр Вижинера. Этап {stage} - {stages[stage]}</p>
        </div>
        <div className='MainCipherArea'>
            <div className='CCFunctionPanel'>
                <input 
                                id='input-text' 
                                maxLength="9" 
                                className='InputField' 
                                //onChange={GetWordBoxes} 
                                type = "text" 
                                placeholder='Input text...'
                />   
            <SlidingButton
                buttonName = "Random key" 
            />
            </div>
        </div>
        </motion.div>
    );
}