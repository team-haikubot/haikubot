const syllable = require('syllable');

module.exports = (req, res, next) => {
    const {
        string
    } = req.body;
    const wordArray = string.slice(' ');
    //receive a string
    //slice at spaces
    //map through array & call syllable
    //5 OR 7 passes
}