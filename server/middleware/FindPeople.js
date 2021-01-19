const githubParser = require('./github.parser');
const vkParser = require('./vk.parser');

async function findPeople(req, res) {
    
    if (req.params.socialNetwork === 'GitHub') {
        const fetchData = await githubParser(req, res);
        return fetchData;
    }

    if (req.params.socialNetwork === 'Instageram') {

    }

    if (req.params.socialNetwork === 'VK') {
        const fetchData = await vkParser(req, res);
        console.log('fetchData: ', fetchData);
        return fetchData;
    }

    if (req.params.socialNetwork === 'Facebook') {

    }

    if (req.params.socialNetwork === 'LinkedIN') {

    }

    if (req.params.socialNetwork === 'Telegram') {

    }

}
module.exports = findPeople;