const request = require('request-promise');

const githubParser = async (req, res) => {
    
    const options = {
        uri: `https://api.github.com/search/users?q=${req.params.value}`,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36'
        }
    };
    
    const result = await request(options)
        .then(response => {
            if (response.ok || response) {
                return response;
            }
        })
        .catch(err => {
            console.log(err.message);
        });

    return result
};
module.exports = githubParser;