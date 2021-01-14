import './style.scss';
import '../public/facebook.svg';
import '../public/github.svg';
import '../public/vk.svg';
import '../public/telegram.svg';
import '../public/linkedin.svg';
import '../public/instagram.svg';
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
    generatePlaceHolderText(item.value, searchInput); 
    // SEARCH_URL = formationUserInput(searchInput.value, item.value); // add when formtionUser input will be ready
    SEARCH_URL = item.url;
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