import React, { useState } from 'react'
import SlidingButton from '../../button/SlidingButton'
import { motion } from "framer-motion"
import WordBox from "./word_boxes/WordBox"
import WordBoxes from './word_boxes/WordBoxes';
import "./PairCipher.css"

export default function PairCipher(){
    var stages = {
        "1": "Ввод данных",
        "2": "Смещение значение каждого символа",
        "3": "Отправка сообщения",
        "4": "Обратное смещение значения каждого символа",
        "5": "Вывод данных"
    }
    let [textState, setText] = useState("");
    let [keyState, setKey] = useState([]);
    let [stage, setStage] = useState(1);
    let [substep, setSubstep] = useState([0,0,0,0,0]);
    let [encryptedText, setEncryptedText] = useState("");
    let [decryptedText, setDecryptedText] = useState("");

    const incrementStage = () => {
        let substepMax = [1, textState.length, 1, textState.length, 1]
        console.log(stage, substep);
        substep[stage - 1]++
        const newSubstep = {...substep};
        setSubstep(newSubstep);
        
        if(stage < 5 && substep[stage - 1] >= substepMax[stage - 1])
            setStage(stage + 1);
    }
    const decrementStage = () => {
        console.log(stage, substep);
        substep[stage - 1]--;
        const newSubstep = {...substep};
        setSubstep(newSubstep);

        if(stage > 1 && substep[stage - 1] <= 0)
            setStage(stage - 1);
    }
    const changeText = () =>{
        const text = document.getElementById("input-text").value;
        setText(text);
        const cipherText = pairCipherEncrypt(text);
        setEncryptedText(cipherText[0]);
        setKey(cipherText[1]);
        setDecryptedText(pairCipherDecrypt(cipherText[0], cipherText[1]));
    }
    
    return(
        <motion.div
            className = 'PairCipher'
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
            <p className='CCstage'> Шифр Пар. Этап {stage} - {stages[stage]}</p>
        </div>

        <div className='MainCipherArea'>
            <div className='CCFunctionPanel'>
                <p className='areaName'> Шифрование </p>
                <input 
                                id='input-text' 
                                maxLength="9" 
                                className='InputField' 
                                onChange={changeText} 
                                type = "text" 
                                placeholder='Input text...'
                />
                {stage > 1 &&   
                        <Step2 substep = {substep[1]} 
                                text = {textState} 
                                clue = {keyState}
                                encryptedText = {encryptedText}
                        />
                }
            </div>
            <div className='ccDescription'>
                    <img width="400px" src='https://konspekta.net/infopediasu/baza20/2959936949871.files/image005.gif'/>
                    <p> Шифр пар — Алфавит случайным образом записывают в 2 строки, и шифрования текста происходит заменой буквы на соседнюю ей по вертикали. </p>
            </div>
            <div className='CCFunctionPanel2'>
                <p className='areaName'> Дешифрование </p>
                {stage > 3 &&
                    <Step4  className = "Step4" 
                            substep = {substep[3]} 
                            encryptedText = {encryptedText}
                            clue = {keyState}
                            decryptedText = {decryptedText}
                    />}   
                {stage > 4 && 
                    <div className='InputField'>{decryptedText}</div>
                }                
            </div>  
        </div>
        </motion.div>
    )

}
function Step4({clue, decryptedText, substep}){
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    let result = alphabet.map(
        (e,i) => {
            return(
                <WordBox
                    key = {clue[i] + e}
                    word = {alphabet[i]}
                    numeric = {clue[i]}
                />
            )
        }
    );

    return(
        <>
            <div className='pairCipherKey'>
                {result}
            </div>
            <WordBoxes text = {decryptedText.substr(0,substep)}/>
            <p className='description'>
                Примечание: 
                <br/>
                Каждая буква из ключа заменяется на букву того же номера в алфавите.
            </p>
        </>
    );
}

function Step2({clue, encryptedText, substep}){
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    let result = alphabet.map(
        (e,i) => {
            return(
                <WordBox
                    key = {alphabet[i] + e}
                    word = {clue[i]}
                    numeric = {alphabet[i]}
                />
            )
        }
    );

    return(
        <>
            <div className='pairCipherKey'>
                {result}
            </div>
            <WordBoxes text = {encryptedText.substr(0,substep + 1)}/>
            <p className='description'>
                Примечание: 
                <br/>
                Каждая буква алфавита заменяется на букву того же номера в рандомно перемешанном алфавите.
                <br/>
                Ключем является как раз этот алфавит. Он генерируется заново при каждом новом шифровании(хотя это и не обязательно).
            </p>
        </>
    );
}




function pairCipherEncrypt(text) {
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
                      'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
                      'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let randomAlphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
                          'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                          'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
                          'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    shuffle(randomAlphabet);

    let cipherText = [];
    for (let i = 0; i < text.length; i++) {
        let letter = text[i];
        let letterIndex = alphabet.indexOf(letter);
        let newLetter = randomAlphabet[letterIndex];
        cipherText.push(newLetter);
    }

    return [cipherText.join(""), randomAlphabet];
}

function pairCipherDecrypt(cipherText, keyAlphabet) {
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
                      'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
                      'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    
    let text = [];

    for (let i = 0; i < cipherText.length; i++) {
        let newLetter = cipherText[i];
        let newLetterIndex = keyAlphabet.indexOf(newLetter);
        let letter = alphabet[newLetterIndex];
        text.push(letter);
    }

    return text.join("");
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}