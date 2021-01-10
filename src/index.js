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

let SEARCH_URL = '' ;
let link_name = '';

const select = new Select('#select', {
    placeholder: 'Choose social network!',
    // selectedId: '4',
    data: [
    {id: '1', value: 'GitHub', icon: './images/github.svg', url: 'https://api.github.com/search/users?q='},
    {id: '2', value: 'Instagram', icon: './images/instagram.svg', url: 'https://api.instagram.com/'},
    {id: '3', value: 'VK', icon: './images/vk.svg', url: 'https://vk.com/'},
    {id: '4', value: 'Facebook', icon: './images/facebook.svg', url: 'https://graph.facebook.com/'},
    {id: '5', value: 'LinkedIN', icon: './images/linkedin.svg', url: ''},
    {id: '6', value: 'Telegram', icon: './images/telegram.svg', url: ''}
  ],
  onSelect(item) {
    SEARCH_URL = item.url;
    link_name = item.value; // сделать так, чтобы правильно отображалось 
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