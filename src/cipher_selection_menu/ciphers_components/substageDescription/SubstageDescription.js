export default function SubstageDescription({type, substep, text, clue, encryptedText}){
    function getCharCode(letter){
        let charCode = letter.charCodeAt();
        if(letter.charCodeAt() >= 97){
            charCode -= 6;
        }
        return charCode - 65;
    }
    
    console.log(substep, type);

    if(substep > 0 && type == "encription")
        return(
            <p className="description">
                Примечание:
                <br/>
                Если расположить буквы латинского алфавита друг за другом, сначала
                26 заглавных, а после 26 прописных, то буквы будут соответствовать номерам.
                <br/>
                {text[substep - 1]} - номер {getCharCode(text[substep - 1])}
                <br/>
                {clue[(substep - 1) % clue.length]} - номер {getCharCode(clue[(substep - 1) % clue.length])}
                <br/>
                ({getCharCode(text[substep - 1])} + {getCharCode(clue[(substep - 1) % clue.length])}) % 52 =
                {getCharCode(encryptedText[substep - 1])}, что соответствует букве {encryptedText[substep - 1]}  
            </p>
        );

    if(substep > 0 && type == "decription")
        return(
            <p className="description">
                Примечание:
                <br/>
                Если расположить буквы латинского алфавита друг за другом, сначала
                26 заглавных, а после 26 прописных, то буквы будут соответствовать номерам.
                <br/>
                {text[substep - 1]} - номер {getCharCode(text[substep - 1])}
                <br/>
                {clue[(substep - 1) % clue.length]} - номер {getCharCode(clue[(substep - 1) % clue.length])}
                <br/>
                ({getCharCode(text[substep - 1])} - {getCharCode(clue[(substep - 1) % clue.length])}) % 52 =
                {getCharCode(encryptedText[substep - 1])}, что соответствует букве {encryptedText[substep - 1]}  
            </p>
    );
}