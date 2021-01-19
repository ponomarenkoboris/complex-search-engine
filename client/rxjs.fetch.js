// if it'll be need
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