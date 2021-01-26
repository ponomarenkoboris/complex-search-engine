const request = require('request-promise');

const vkParser = async (req) => {
    const options = {
        uri: `https://www.vk.com/${req.params.value}`
    };

    const getUserDataFromHTML = (userPage) => {

        let regExpUsername = /(?!>)([^><]+)(?=<\/title>)/;
        let regExpImage = /<img src="\w+:+.+" class="wi_img" alt="/;
        let userName = userPage.match(regExpUsername)[0].split(' |')[0];
        let userImage;
        try {
            userImage = userPage.match(regExpImage)[0].split('src="')[1].split('"')[0];
        } catch(e) {
            userImage = 'undefined';
        }

        if (userName && userImage) {
            return [
                {
                    login: userName,
                    avatar_url: userImage,
                    html_url: options.uri
                }
            ]
        } else {
            return null;
        }
        
    }
    
    const result = await request(options)
        .then(response => {
            const data = getUserDataFromHTML(response);
            return data;
        })
        .catch(err => {
            return JSON.stringify({message: 'This data is not correct.'});
        });
    
    return result;
};

module.exports = vkParser;