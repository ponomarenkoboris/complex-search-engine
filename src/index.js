import './style.scss';
import './images/facebook.svg';
import './images/github.svg';
import './images/vk.svg';
import './images/telegram.svg';
import './images/linkedin.svg';
import './images/instagram.svg';
import { Select } from './selector.js';
import { EMPTY, fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, mergeMap, tap, catchError, filter } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';

// Functions imports
import generatePlaceHolderText from './generatorPlaceholders';
import formationUserInput from './reqFormation';



let SEARCH_URL = '' ;
let link_name = '';

const select = new Select('#select', {
    placeholder: 'Choose social network!',
    // selectedId: '4',
    data: [
    {id: '1', value: 'GitHub', icon: './images/github.svg', url: 'https://api.github.com/search/users?q='},
    {id: '2', value: 'Instagram', icon: './images/instagram.svg', url: 'https://api.instagram.com/'},
    {id: '3', value: 'VK', icon: './images/vk.svg', url: 'https://vk.com/'},
    {id: '4', value: 'Facebook', icon: './images/facebook.svg', url: 'https://www.facebook.com/search/top/?q='},
    {id: '5', value: 'LinkedIN', icon: './images/linkedin.svg', url: ''},
    {id: '6', value: 'Telegram', icon: './images/telegram.svg', url: ''}
  ],
  onSelect(item) {
    const searchInput = document.querySelector('.search__input');
    searchInput.style.cssText = "width: 500px; visibility: visible; margin: 0 auto; margin-bottom: 50px; transition: .3s ease-in-out;"; 
    generatePlaceHolderText(item.value, searchInput); 
    // SEARCH_URL = formationUserInput(searchInput.value, item.url); // add when formtionUser input will be ready
    SEARCH_URL = item.url
    link_name = item.value;
  }
});
// Логика поиска
const search = document.querySelector('#search');
const result = document.querySelector('#result');


const stream$ = fromEvent(search, 'input')
    .pipe(
        map(event => event.target.value),
        debounceTime(1000),
        distinctUntilChanged(),
        tap(() => result.innerHTML = ''),
        filter(val => val.trim()),
        switchMap(val => fromFetch(SEARCH_URL + val).pipe(
            switchMap(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log('Uncorrect URL');
                    catchError(err => EMPTY);
                }
            })
        )),
        map(res => res.items),
        mergeMap(items => items)
    );

stream$.subscribe(user => {
    const html = `
        <div class="card">
            <div class="card-image">
                <img src="${user.avatar_url}">
            </div>
            <div class="card-action">
                <span class="card-action__title">${user.login}</span>
                <hr>
                <a href="${user.html_url}" target="_blank" class="card-action__link">Open: <span class="card-action__link__site-name">${link_name}</span></a>
            </div>
        </div>
    `
    result.insertAdjacentHTML('beforeend', html);
});



// Test links 
// document.querySelector('.test-button').addEventListener('click', () => {
//     let value = document.querySelector('.test-links-input');
//     let firstRow = value.value.split(' ')[0]
//     let secondRow = value.value.split(' ')[1]

//     let html = `
//         <a href="https://www.linkedin.com/search/results/people/?firstName=${firstRow}&lastName=${secondRow}&origin=SEO_PSERP" target="_blank">https://www.linkedin.com/search/results/people/?firstName=${firstRow}&lastName=${secondRow}&origin=SEO_PSERP</a>
//     `;
//     fetch('https://www.linkedin.com/search/results/people/?firstName=${firstRow}&lastName=${secondRow}&origin=SEO_PSERP')
//         .then(res => res.json())
//         .catch(rej => alert(rej))
//         .then(data => console.log(data))
//     document.querySelector('.test-links').insertAdjacentHTML('beforeend', html);

// })