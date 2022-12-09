import WordBox from "./WordBox"
import "./WordBoxes.css"

export default function WordBoxes(props){

    var text = props.text;
    var listOfElements = [];
    var result = []; 

    for(var k = 0; k < text.length; k++){
        let charCode = text[k].charCodeAt();
        if(text[k].charCodeAt() >= 97){
            charCode -= 6;
        }
        listOfElements.push({
            "word": text[k],
            "numeric": charCode,
            })
    }

    var result = listOfElements.map(
        (element, i) => {
            return(
                <WordBox
                    key = {element.word + i}
                    word = {element.word} 
                    numeric = {element.numeric - 65}
                />
            )
        }
    );

    return(
        <div className="WordBoxes">
            {result}
        </div>
    );
}