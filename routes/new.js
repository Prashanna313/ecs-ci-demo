const axios = require('axios');
const express = require("express");
const router = express.Router();

const url = 'https://aws.amazon.com/api/dirs/items/search?item.directoryId=whats-new&sort_by=item.additionalFields.postDateTime&sort_order=desc&size=25&item.locale=en_US';

router.get('/news', function (req, res, next) {
    axios.get(url)
        .then(response => {
            const parsed = [];
            const json = response.data;
            json.items.forEach(obj => {
                if (obj.item) {
                    const { headline, headlineUrl, postDateTime, modifiedDate, postSummary } = obj.item.additionalFields;
                    parsed.push({ headline, headlineUrl, postDateTime, modifiedDate, postSummary });
                }
            });
            res.json(parsed);
        })
        .catch(err => console.log(err));
});

module.exports = router;