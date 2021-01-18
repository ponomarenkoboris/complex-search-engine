import './style.scss';
import '../public/facebook.svg';
import '../public/github.svg';
import '../public/vk.svg';
import '../public/telegram.svg';
import '../public/linkedin.svg';
import '../public/instagram.svg';
import { Select } from './selector.js';

let socialNetwork = '';
let linkName = '';

const select = new Select('#select', {
    placeholder: 'Choose social network!',
    // selectedId: '4',
    data: [
    {id: '1', value: 'GitHub', icon: '../public/github.svg', url: 'https://api.github.com/search/users?q='},
    {id: '2', value: 'Instagram', icon: '../public/instagram.svg', url: 'https://www.instagram.com/'},
    {id: '3', value: 'VK', icon: '../public/vk.svg', url: 'https://vk.com/'},
    {id: '4', value: 'Facebook', icon: '../public/facebook.svg', url: 'https://www.facebook.com/'},
    {id: '5', value: 'LinkedIN', icon: '../public/linkedin.svg', url: ''},
    {id: '6', value: 'Telegram', icon: '../public/telegram.svg', url: ''}
  ],
  onSelect(item) {
    const searchInput = document.querySelector('.search__input');
    searchInput.style.cssText = "width: 500px; visibility: visible; margin: 0 auto; margin-bottom: 50px; transition: .3s ease-in-out;"; 
    searchInput.placeholder = `Enter a ${item.value} nickname.`;
    linkName = item.value;
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
      console.log('data: ', data);
      for (let i = 0; i < data.items.length; i++) {
        const html = `
          <div class="card">
              <div class="card-image">
                  <img src="${data.items[i].avatar_url}">
              </div>
              <div class="card-action">
                  <span class="card-action__title">${data.items[i].login}</span>
                  <hr>
                  <a href="${data.items[i].html_url}" target="_blank" class="card-action__link">Open: <span class="card-action__link__site-name">${linkName}</span></a>
              </div>
          </div>
        `;
        result.insertAdjacentHTML('afterbegin', html);
      }
    }
  );      
}; 

sendReq = debounce(sendReq, 200);
search.addEventListener('keydown', sendReq);

// const stream$ = fromEvent(search, 'input')
//     .pipe(
//         map(event => event.target.value),
//         debounceTime(500),
//         distinctUntilChanged(),
//         filter(item => item.trim()),
//         tap(() => result.innerHTML = ''),
//         switchMap(item => fromFetch(`http://localhost:3000/user/${socialNetwork}/${item}}`).pipe(
//             switchMap(respose => {
//                 if (respose.ok) {
//                     return respose.json();
//                 } else {
//                     console.log('URL is not correct');
//                     catchError(err => EMPTY);
//                 }
//             })
//         )),
//         map(res => {
//             console.log(res.items);
//             return res.items
//         }),
//         mergeMap(items => items)
//     );


// stream$.subscribe(user => {
//     const html = `
//         <div class="card">
//             <div class="card-image">
//                 <img src="${user.avatar_url}">
//             </div>
//             <div class="card-action">
//                 <span class="card-action__title">${user.login}</span>
//                 <hr>
//                 <a href="${user.html_url}" target="_blank" class="card-action__link">Open: <span class="card-action__link__site-name">${link_name}</span></a>
//             </div>
//         </div>
//     `
//     result.insertAdjacentHTML('beforeend', html);
// });