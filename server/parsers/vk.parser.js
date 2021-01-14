const rp = require('request-promise');
const cheerio = require('cheerio');
const Table = require('cli-table');

let users = [];

const option = {
    url: 'https://vk.com/borisponomarenko', // paste client input 
    html: true
};

const getUserDataFromHTML = (userPage) => {
    console.log('userPage start: ' + userPage + ' : end userPage');
    
    const redExpUsername = /<meta property="og:description" content="\w+ \w+/;
    const regExpImage = /<img width="1" height="1" src="\w+:+.+/;
    
    let userName = userPage.match(redExpUsername)[0].split('content="')[1];
    console.log('userName: ', userName);
    let userImage = userPage.match(regExpImage)[0].split('src="')[1].split('"')[0];
    console.log('userImage: ', userImage);
};

rp(option)
    .then((data) => {
        getUserDataFromHTML(data);
    })
    .catch(err => {
        console.log('ERR: ', err);
    });