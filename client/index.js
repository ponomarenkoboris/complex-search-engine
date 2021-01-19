import './style.scss';
import '../public/facebook.svg';
import '../public/github.svg';
import '../public/vk.svg';
import '../public/telegram.svg';
import '../public/linkedin.svg';
import '../public/instagram.svg';
import { Select } from './selector.js';
import { render } from './renderCard';

let socialNetwork = '';

const select = new Select('#select', {
    placeholder: 'Choose social network!',
    // selectedId: '4',
    data: [
    {id: '1', value: 'GitHub', icon: '../public/github.svg'},
    {id: '2', value: 'Instagram', icon: '../public/instagram.svg'},
    {id: '3', value: 'VK', icon: '../public/vk.svg'},
    {id: '4', value: 'Facebook', icon: '../public/facebook.svg'},
    {id: '5', value: 'LinkedIN', icon: '../public/linkedin.svg'},
    {id: '6', value: 'Telegram', icon: '../public/telegram.svg'}
  ],
  onSelect(item) {
    const searchInput = document.querySelector('.search__input');
    searchInput.style.cssText = "width: 500px; visibility: visible; margin: 0 auto; margin-bottom: 50px; transition: .3s ease-in-out;"; 
    searchInput.placeholder = `Enter a ${item.value} nickname.`;
    socialNetwork = item.value;
  }
});
// Логика поиска
const search = document.querySelector('#search');
const result = document.querySelector('#result');


const debounce = (send, time) => {
    let timeout;
    return function () {
        const call = () => { send.apply(this, arguments) };
        clearTimeout(timeout);
        timeout = setTimeout(call, time);
    };
}

function sendReq(e) {   
  result.innerHTML = '';
  if(e.target.value === '') {
    return
  }

  fetch(`http://localhost:3000/user/${socialNetwork}/${e.target.value}`)
    .then(res => {
      if (res.ok) {
        return res.json();
      }          
    })
    .catch(err => console.log(err))
    .then(data => {
      render(socialNetwork, data, result);
    }
  );      
}; 

sendReq = debounce(sendReq, 200);
search.addEventListener('keydown', sendReq);
