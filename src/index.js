import './style.scss';
import { Select } from './selector.js';
import { EMPTY, fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, mergeMap, tap, catchError, filter } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

const select = new Select('#select', {
    placeholder: 'Choose social network!',
    // selectedId: '4',
    data: [
    {id: '1', value: 'GitHub', icon: ''},
    {id: '2', value: 'Instagram', icon: ''},
    {id: '3', value: 'VK', icon: ''},
    {id: '4', value: 'Facebook', icon: ''},
    {id: '5', value: 'LinkedIN', icon: ''},
    {id: '6', value: 'Telegram', icon: ''}
  ],
  onSelect(item) {
    console.log('selectedItem', item);
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
        switchMap(val => ajax.getJSON(URL + val).pipe(
            catchError(err => EMPTY)
        )),
        map(res => res.items),
        mergeMap(items => items)
    )

stream$.subscribe(user => {
    const html = `
        <div class="card">
            <div class="card-image">
                <img src="${user.avatar_url}">
                <span class="card-title">${user.login}</span>
            </div>
            <div class="card-action">
                <a href="${user.html_url}" target="_blank">Открыть github</a>
            </div>
        </div>
    `
    result.insertAdjacentHTML('beforeend', html);
});