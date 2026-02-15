const DataUriParser = require("datauri/parser.js");
const path = require("path");

const getDataUrl = (file) => {
    const parser = new DataUriParser();

    // FIXED SPELLING
    const extName = path.extname(file.originalname).toString();

    return parser.format(extName, file.buffer);
};

module.exports = getDataUrl;
