export function render(socialNetwork, data, result){
    if (socialNetwork === 'GitHub') {
        for (let i = 0; i < data.items.length; i++) {
        const html = `
            <div class="card">
                <div class="card-image">
                    <img src="${data.items[i].avatar_url}">
                </div>
                <div class="card-action">
                    <span class="card-action__title">${data.items[i].login}</span>
                    <hr>
                    <a href="${data.items[i].html_url}" target="_blank" class="card-action__link">Open: <span class="card-action__link__site-name">${socialNetwork}</span></a>
                </div>
            </div>
        `;
        result.insertAdjacentHTML('afterbegin', html);
        }
        return;
    }
    if (socialNetwork === 'VK') {
        const html = `
            <div class="card">
                <div class="card-image">
                    <img src="${data.avatar_url}">
                </div>
                <div class="card-action">
                    <span class="card-action__title">${data.login}</span>
                    <hr>
                    <a href="${data.html_url}" target="_blank" class="card-action__link">Open: <span class="card-action__link__site-name">${socialNetwork}</span></a>
                </div>
            </div>
        `;
        result.insertAdjacentHTML('afterbegin', html);
    }
}