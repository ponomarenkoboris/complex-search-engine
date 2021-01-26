const request = require('request-promise');

const githubParser = async (req) => {
    
    const options = {
        uri: `https://api.github.com/search/users?q=${req.params.value}`,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36'
        }
    };
    
    const result = await request(options)
        .then(response => {
            let answer = JSON.parse(response);
            return JSON.stringify(answer.items);
        })
        .catch(err => {
            return JSON.stringify({ message: 'This data is not correct.' });
        });
    return result
};
module.exports = githubParser;