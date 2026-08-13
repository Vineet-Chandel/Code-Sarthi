const DataUriParser = require("datauri");
const path = require("path");

const getDataUrl = (file) => {
    const parser = new DataUriParser();
    if (!file) {
        throw new Error("File not provided");
    }
    // FIXED SPELLING
    const extName = path.extname(file.originalname).toString();

    return parser.format(extName, file.buffer);
};

module.exports = getDataUrl;
