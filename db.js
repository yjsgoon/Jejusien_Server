/**
 * Created by JiSoo on 2016-10-11.
 */

var config = require('./config.json');
var pgp = require('pg-promise')();
pgp.pg.defaults.poolSize = 20;
pgp.pg.defaults.ssl = true;
var DB = pgp(config.DATABASE_URL);

module.exports = DB;