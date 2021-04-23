process.env.NODE_ENV = "test"; /** define o ambiente */

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../serve");
let app = require("../app");
let should = chai.should();
chai.use(chaiHttp);

//Export this to use in multiple files
module.exports = {
	chai: chai,
	server: server,
	app: app,
	should: should
};