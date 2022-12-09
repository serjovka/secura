import React, { useState } from 'react'
import SlidingButton from '../../button/SlidingButton'
import { motion } from "framer-motion"
import WordBoxes from './word_boxes/WordBoxes';
import "./VigenereCipher.css";
import SubstageDescription from "./substageDescription/SubstageDescription";
import CipherDescription from "./cipherDescription/CipherDescription";

export default function VigenereCipher() {
    var stages = {
        "1": "Ввод данных",
        "2": "Смещение значение каждого символа",
        "3": "Отправка сообщения",
        "4": "Обратное смещение значения каждого символа",
        "5": "Вывод данных"
    }

    let [textState, setText] = useState("");
    let [keyState, setKey] = useState("");
    let [stage, setStage] = useState(1);
    let [substep, setSubstep] = useState([0,0,0,0,0]);
    let [encryptedText, setEncryptedText] = useState("");
    let [decryptedText, setDecryptedText] = useState("");

    incrementStage = incrementStage.bind(this);
    decrementStage = decrementStage.bind(this);
    ChangeText = ChangeText.bind(this);
    ChangeKey = ChangeKey.bind(this);

    function incrementStage(){
        const text = document.getElementById("input-text").value;
        const key = document.getElementById("input-key").value;
        let substepMax = [1, text.length, 1, text.length, 1]

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
        if(stage == 4 && substep[3] <= substepMax[3]){
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

    function ChangeText(){
        const text = document.getElementById("input-text").value;
        setText(text);
        const cipherText = vigenereCipherEncrypt(text, keyState);
        setEncryptedText(cipherText);
        const decryptedCipher = vigenereCipherDecrypt(cipherText, keyState)
        setDecryptedText(decryptedCipher);
    }

    function ChangeKey(){
        const key = document.getElementById("input-key").value;
        setKey(key);
        const cipherText = vigenereCipherEncrypt(textState, key);
        setEncryptedText(cipherText);
        const decryptedCipher = vigenereCipherDecrypt(cipherText, key)
        setDecryptedText(decryptedCipher);
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
                <p className='areaName'> Шифрование </p>
                <input 
                                id='input-text' 
                                maxLength="9" 
                                className='InputField' 
                                onChange={ChangeText} 
                                type = "text" 
                                placeholder='Input text...'
                />
                <input 
                        id = "input-key"
                        className='InputField' 
                        type = "text" 
                        onChange={ChangeKey} 
                        placeholder='Input key...'
                />
                {stage > 1 &&   
                    <> 
                        <Step2 substep = {  substep[1]} 
                                            text = {textState} 
                                            clue = {keyState}
                                            encryptedText = {encryptedText}/>
                        <SubstageDescription 
                            type = "encription"
                            substep = {substep[1]}
                            text = {textState}
                            clue = {keyState}
                            encryptedText = {encryptedText}
                        />
                    </>
                }
            </div>
            <CipherDescription cipher = "VigenereCipher"/>
            <div className='CCFunctionPanel2'>
                <p className='areaName'> Дешифрование </p>
                {stage > 3 &&
                    <Step4  className = "Step4" 
                            substep = {substep[3]} 
                            encryptedText = {encryptedText}
                            clue = {keyState}
                            decryptedText = {decryptedText}
                    />}   
                    <SubstageDescription 
                            type = "decription"
                            substep = {substep[3]}
                            text = {encryptedText}
                            clue = {keyState}
                            encryptedText = {decryptedText}
                    /> 
                {stage > 4 && <div className='InputField'>{decryptedText}</div>

                }                
            </div> 
        </div>
        </motion.div>
    );
}

function Step2({substep, text, clue, encryptedText}){
    let modifiedKey = "";

    for(let k = 0; k < text.length; k++){
        modifiedKey += clue[k % clue.length];
    }

    return(
        <>
            <WordBoxes text = {text} />
            <WordBoxes text = {modifiedKey} />
            <WordBoxes text = {encryptedText.substr(0, substep)}/>
        </>
    );
    
}

function Step4({substep, encryptedText, clue, decryptedText}){
    let modifiedKey = "";

    for(let k = 0; k < encryptedText.length; k++){
        modifiedKey += clue[k % clue.length];
    }

    return(
        <>
            <WordBoxes text = {encryptedText}/>
            <WordBoxes text = {modifiedKey}/>
            <WordBoxes text = {decryptedText.substr(0, substep)}/>
    
        </>
    );
}

function vigenereCipherEncrypt(text, keyword) {
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
                      'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
                      'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    let cipherText = [];
    for (let i = 0; i < text.length; i++) {
        let letter = text[i];
        let letterIndex = alphabet.indexOf(letter);
        let keywordLetter = keyword[i % keyword.length];
        let keywordLetterIndex = alphabet.indexOf(keywordLetter);
        cipherText.push(alphabet[(letterIndex + keywordLetterIndex) % alphabet.length]);
    }
        
    return cipherText.join("");
}

function vigenereCipherDecrypt(cipherText, keyword) {
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
                      'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
                      'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    
    let text = [];

    for (let i = 0; i < cipherText.length; i++) {
        let newLetter = cipherText[i];
        let newLetterIndex = alphabet.indexOf(newLetter);
        let keywordLetter = keyword[i % keyword.length];
        let keywordLetterIndex = alphabet.indexOf(keywordLetter);
        text.push(alphabet[(newLetterIndex - keywordLetterIndex + alphabet.length) % alphabet.length]);
    }

    //console.log("dec:", cipherText, keyword, text.join(""))
    return text.join("");
}