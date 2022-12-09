import React, { useState } from 'react'
import SlidingButton from '../../button/SlidingButton'
import "./CaesarCipher.css"
import WordBoxes from './word_boxes/WordBoxes'
import { motion } from "framer-motion"

function caesarCipherFunction(str, key) {
    
    const engAlphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
                        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var result = [];
    str = str.toUpperCase();

    for(let i = 0; i < str.length; i++){
        var charCode = str[i].charCodeAt();
        result.push(engAlphabets[ (charCode - 65 + key) % engAlphabets.length]);
    }

    return result.join("");
};

function Step2(props){
    var text = document.getElementById("input-text").value;
    var key = document.getElementById("input-key").value;

    return(
        <WordBoxes text = {caesarCipherFunction(text.substr(0, props.substep[1]), Number(key))}/>
    );
}

function Step4(props){
    var text = document.getElementById("input-text").value;
    var key = document.getElementById("input-key").value;
    
    return(
        <div className='Step4'>
            <div className='InputField'>{key}</div>
            <WordBoxes text = {caesarCipherFunction(text, Number(key))}/>
            <WordBoxes text = {text.substr(0, props.substep[3])}/>
        </div>
    );
}

function Step5(){
    var text = document.getElementById("input-text").value;

    return(
        <div className='InputField'>{text}</div>
    )
}

export default function CaesarsCipher() {
    const [stage, setStage] = useState(1);
    const [substep, setSubstep] = useState([0,0,0,0,0]);
    const [wordBoxes, setBoxes] = useState([]);

    incrementStage = incrementStage.bind(this);
    decrementStage = decrementStage.bind(this);
    GetWordBoxes = GetWordBoxes.bind(this);


    var stages = {
        "1": "Ввод данных",
        "2": "Смещение значение каждого символа",
        "3": "Отправка сообщения",
        "4": "Обратное смещение значения каждого символа",
        "5": "Вывод данных"
    }

    function incrementStage(){
        var text = document.getElementById("input-text").value;
        var key = document.getElementById("input-key").value;
        var substepMax = [1, text.length, 1, text.length, 1]

        if(stage == 1 && substep[0] <= substepMax[0] && text.length > 0 && key.length > 0){
            if (substep[0] == substepMax[0]){
                setStage(stage + 1);
                return;
            }
            substep[0]++
            const newSubstep = {...substep};
            setSubstep(newSubstep);
            if (substep[0] == substepMax[0])
                setStage(stage + 1);
            return;
        }

        if(stage == 2 && substep[1] <= substepMax[1]){
            if (substep[1] == substepMax[1]){
                setStage(stage + 1);
                return;
            }
            substep[1]++;
            const newSubstep = {...substep};
            setSubstep(newSubstep);
            if (substep[1] == substepMax[1])
                setStage(stage + 1);
            return;
        }

        if(stage == 3){
            if (substep[2] == substepMax[2]){
                setStage(stage + 1);
                return;
            }
            substep[2]++
            const newSubstep = {...substep};
            setSubstep(newSubstep);
            if (substep[2] == substepMax[2])
                setStage(stage + 1);
            return;
        }

        if(stage == 4 && substep[1] <= substepMax[1]){
            if (substep[3] == substepMax[3]){
                setStage(stage + 1);
                return;
            }
            substep[3]++;
            const newSubstep = {...substep};
            setSubstep(newSubstep);
            if (substep[3] == substepMax[3])
                setStage(stage + 1);
            return;
        }
    }

    function decrementStage(){
        const newSubstep = {...substep};

        switch(stage){
            case 1:
                if (substep[0] == 0){
                    return;
                }
                newSubstep[0]--;
                setSubstep(newSubstep);
                break
            case 2:
                if (substep[1] == 0){
                    setStage(stage - 1);
                    return;
                }
                newSubstep[1]--;
                setSubstep(newSubstep);
                break;
            case 3:
                if (substep[2] == 0){
                    setStage(stage - 1);
                    return;
                }
                newSubstep[2]--;
                setSubstep(newSubstep);
                break;
            case 4:
                if (substep[3] == 0){
                    setStage(stage - 1);
                    return;
                }
                newSubstep[3]--;
                setSubstep(newSubstep);
                break;
            case 5:
                if (substep[4] == 0){
                    setStage(stage - 1);
                    return;
                }
                newSubstep[4]--;
                setSubstep(newSubstep);
                break;

        }
    }

    function GetWordBoxes(){
        var text = document.getElementById("input-text").value.toUpperCase();

        setBoxes(WordBoxes({"text": text}));
    }

    return(
        <motion.div 
            className = 'CaesarCipher'
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
                <p className='CCstage'> Шифр Цезаря. Этап {stage} - {stages[stage]}</p>
            </div>
            <div className='MainCipherArea'>
                <div className='CCFunctionPanel'>
                    <input 
                        id='input-text' 
                        maxLength="9" 
                        className='InputField' 
                        onChange={GetWordBoxes} 
                        type = "text" 
                        placeholder='Input text...'
                    /> 
                    <input 
                        id = "input-key"
                        className='InputField' 
                        type = "text" 
                        placeholder='Input key...'
                    /> 
                    {wordBoxes}
                    {stage > 1 &&
                        <Step2 substep = {substep}/>
                    }                    
                </div>
                <div className='ccDescription'>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Caesar3.svg/320px-Caesar3.svg.png'/>
                    <p> Шифр Цезаря — это вид шифра подстановки, в котором каждый символ в открытом тексте заменяется символом, находящимся на некотором постоянном числе позиций левее или правее него в алфавите. Например, в шифре со сдвигом вправо на 3, А была бы заменена на Г, Б станет Д, и так далее </p>
                    <p> Если сопоставить каждому символу алфавита его порядковый номер (нумеруя с 0), то шифрование и дешифрование можно выразить формулами модульной арифметики:</p>
                    <img src='https://wikimedia.org/api/rest_v1/media/math/render/svg/2417bfd08b8fa32adcabd255bb9a6b20832ca47f' />
                    <br/>
                    <img src='https://wikimedia.org/api/rest_v1/media/math/render/svg/ec7a78025d3d44bece6d9880ad58ad131ac013fa' />
                    <p>где x — символ открытого текста, y — символ шифрованного текста, n — мощность алфавита, а k — ключ.</p>
                </div>
                <div className='CCFunctionPanel2'>
                    {stage > 3 &&
                        <Step4 className = "Step4" substep = {substep}/>}      
                    {stage > 4 &&
                        <Step5 className = "Step5"/>}              
                </div>          
            </div>
        </motion.div>
    );
}