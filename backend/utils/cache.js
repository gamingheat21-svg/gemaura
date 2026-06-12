const NodeCache = require('node-cache');
// Standard TTL is 12 hours for horoscopes
const cache = new NodeCache({ stdTTL: 43200, checkperiod: 3600 });

module.exports = cache;
