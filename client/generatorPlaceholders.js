export default function generatePlaceHolderText(selectedItemValue, insertValue) {
    if (selectedItemValue === 'GitHub') {
        insertValue.placeholder = 'Enter a GitHub nickname.';
    }
    if (selectedItemValue === 'Instagram') {
        insertValue.placeholder = 'Enter a Instgram nickname.';
    }
    if (selectedItemValue === 'VK') {
        insertValue.placeholder = 'Enter a VK nickname.';
    }
    if (selectedItemValue === 'Facebook') {
        insertValue.placeholder = 'Enter a Facebook nickname.';
    }
    if (selectedItemValue === 'LinkedIN') {
        insertValue.placeholder = 'Enter a LinkedIN nickname.';
    }
    if (selectedItemValue === 'Telegram') {
        insertValue.placeholder = 'Enter a Telegram nickname.';
    }
}