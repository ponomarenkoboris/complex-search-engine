<template>
    <section class="wrap-select">
        <div id="select">
            <!-- <div class="select__backdrop" data-type="backdrop"></div> -->
            <div class="select__input" data-type="input" @click="showHideNetworks">
                <span data-type="value">{{ placeholder }}</span>
                <i class="fa fa-chevron-down" data-type="arrow"></i>
            </div>
            <div class="select__list">
                <ul v-if="dropdown" class="select__dropdown select__list">
                    <li v-for="item in items" :data-index="item.id" :key="item.id" class="select__item" @click="chooseNetwork">
                        <p :data-index="item.id" >{{ item.value }}</p>
                        <img :data-index="item.id" class="select__item__image" :src="item.icon">
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Selector',
    data: () => ({
        placeholder: 'Choose social network!',
        items: [
            {id: '1', value: 'GitHub', icon: '../../public/github.svg'},
            {id: '2', value: 'Instagram', icon: '../../public/instagram.svg'},
            {id: '3', value: 'VK', icon: '../../public/vk.svg'},
            {id: '4', value: 'Facebook', icon: '../../public/facebook.svg'},
            {id: '5', value: 'LinkedIN', icon: '../../public/linkedin.svg'},
            {id: '6', value: 'Telegram', icon: '../../public/telegram.svg'}
        ],
        dropdown: false,
    }),
    methods: {
        showHideNetworks() {
            this.dropdown = !this.dropdown;
        },
        chooseNetwork(e) {
            if (this.dropdown === true) {
                this.items.forEach(i => {
                    if (i.id === e.target.dataset.index) {
                        this.placeholder = i.value;
                        this.$root = i;
                        this.dropdown = false;
                    }
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400&display=swap');
$fontFamily: 'Roboto', sans-serif;
$border-bottom: 1px solid #ccc;
$inputWidth: 500px;
$height: 30px;
*{  
    // position: relative;
    max-width: 600px;
    font-family: $fontFamily;
}
.select {
    width: 100%;
    font-family: $fontFamily;
    z-index: 100;
}
.select__input {
    width: $inputWidth;
    height: $height;
    border: $border-bottom;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    cursor: pointer;
}
.select__list {
    padding: 0;
    margin: 0;
    list-style: none;
}
.select__dropdown{
    z-index: 1;
    display: block;
    border: $border-bottom;
    border-radius: 5px;
    top: $height;
    left: 0;
    right: 0; 
    max-height: 200px;
    overflow-y: auto;
    box-shadow: 2px 3px 5px rgba(0, 0, 0, .5); // сделать тень
}
.select__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: $border-bottom;
}
.select__item:hover {
    background-color: #eee;
    cursor: pointer;
    transition: .150 background-color ease-in;
}
.select__item__image {
    width: 40px;
    height: 40px;
}
</style>