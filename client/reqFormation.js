// formation of a request must define what user input text and based on this data, return updated link

export default function formationUserInput(userInput, value) {
    if (value === 'Instagram') {
        return `https://www.instagram.com/${userInput}/?__a=1`;
    }
}