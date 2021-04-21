const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    const htmltext = '<html> <body> <h1> SpaceX Fan Club </h1> </body> </html>';
    res.send(htmltext);
});

module.exports = router;
