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

    return text.join("");
}