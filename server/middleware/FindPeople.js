const githubParser = require('../parsers/github.parser');
const vkParser = require('../parsers/vk.parser');
const twitterParser = require('../parsers/twitter.parser');

async function findPeople(req) {
    
    if (req.params.socialNetwork === 'GitHub') {
        const fetchData = await githubParser(req);
        return fetchData;
    }

    if (req.params.socialNetwork === 'Instageram') {

    }

    if (req.params.socialNetwork === 'Twitter') {
        const fetchData = await twitterParser(req);
        return fetchData;
    }

    if (req.params.socialNetwork === 'VK') {
        const fetchData = await vkParser(req);
        return fetchData;
    }

    if (req.params.socialNetwork === 'Facebook') {

    }

    if (req.params.socialNetwork === 'LinkedIN') {

    }

    

}
module.exports = findPeople;