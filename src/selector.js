const getTemaplte = (data = [], placeholder, selectedId) => {
    let defaultText = placeholder || '&#129335; &#129310; &#128064; !ERROR!';
    
    const items = data.map(item => {
        let defaultItemClass = '';
        let iconURL = item.icon;
        if (item.id === selectedId) {
            defaultText = item.value;
            defaultItemClass = 'selected';
        }
        return `
            <li class="select__item ${defaultItemClass}"  data-type="item" data-id="${item.id}">
                <p>${item.value}</p>
                <img class="select__item__image" src="${iconURL}">
            </li>
        `
    })
    return `
        <div class="select__backdrop" data-type="backdrop"></div>
        <div class="select__input" data-type="input">
            <span data-type="value">${defaultText}</span>
            <i class="fa fa-chevron-down" data-type="arrow"></i>
        </div>
        <div class="select__dropdown">
            <ul class="select__list">${items.join('')}</ul>
        </div>
    `
};

export class Select {
    _render() {
        const { placeholder, data } = this.options;
        this.$elem.classList.add('select');
        this.$elem.innerHTML = getTemaplte(data, placeholder, this.selectedId);
    }
    _setup() {
        this.clickHandler = this.clickHandler.bind(this);
        this.$elem.addEventListener('click', this.clickHandler);
        this.$arrow = this.$elem.querySelector('[data-type="arrow"]');
        this.$value = this.$elem.querySelector('[data-type="value"]');
    }
    constructor(selector, options) {
        this.$elem = document.querySelector(selector);
        this.options = options;
        this.selectedId = options.selectedId;
        this._render();
        this._setup();
    }
    clickHandler(event) {
        const { type } = event.target.dataset;
        if (type === 'input') {
            this.toggle();
        } else if (type === 'item') {
            const id = event.target.dataset.id;
            this.select(id);
        } else if (type === 'backdrop') {
            this.close();
        }
    }
    get isOpen() {
        return this.$elem.classList.contains('open');
    }
    get current() {
        return this.options.data.find(item => item.id === this.selectedId);
    }
    select(id) {
        this.selectedId = id;
        this.$value.textContent = this.current.value;
        this.$elem.querySelectorAll('[data-type="item"]').forEach(item => {
            item.classList.remove('selected');
        });
        this.$elem.querySelector(`[data-id="${id}"]`).classList.add('selected');
        this.options.onSelect ? this.options.onSelect(this.current) : null;
        this.close();
    }
    
    toggle() {
        this.isOpen ? this.close() : this.open();
    }
    open() {
        this.$elem.classList.add('open');
        this.$arrow.classList.remove('fa-chevron-down');
        this.$arrow.classList.add('fa-chevron-up');
    }
    close() {
        this.$elem.classList.remove('open');
        this.$arrow.classList.add('fa-chevron-down');
        this.$arrow.classList.remove('fa-chevron-up');
    }
    destroy() {
        this.$elem.removeEventListener('click', this.clickHandler);
        this.$elem.innerHTML = '';
    }
}