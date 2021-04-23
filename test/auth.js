/* eslint-disable no-undef */ 
const {
	chai,
	// eslint-disable-next-line no-unused-vars
	server, /**necessário importar mesmo sem utilizar diretamente */
	app,
	// eslint-disable-next-line no-unused-vars
	should
} = require("./testConfig");
const userModel = require("../models/userModel");

/**
 * Teste criação e autenticação 
 * (1) Login
 * (2) Register
 */

// eslint-disable-next-line no-undef
describe("Auth", () => {

	/** Limpa banco de dados*/
	before((done) => {
		userModel.deleteMany({}, () => {
			done();
		});
	});

	/**prepara objeto */
	const testData = {
		"email": "demo@gmail.com",
		"status": "1",
		"name": "demo",
		"password": "demo*29",
		"passwordConfirm": "demo*29",
		"role": "admin"
	};


	/**
	 * @param  {} "/POSTRegister"
	 * @param  {} (
	 */
	describe("/POST Register COM ERRO", () => {
		it("Deve retornar erro, falta de informação para cadastro. erro 400 !", (done) => {
			chai.request(app)
				.post("/api/auth/register")
				.send({
					"email": testData.email
				})
				.end((err, res) => {
					res.should.have.status(400);
					done();
				});
		});
	});

	/**
	 * @param  {} "/POSTRegister"
	 * @param  {} (
	 */
	describe("/POST Register COM SUCESSO", () => {
		it("Deve registrar o usuario.", (done) => {
			chai.request(app)
				.post("/api/auth/register")
				.send(testData)
				.end((err, res) => {
					res.should.have.status(201);
					res.body.should.have.property("status").eql("success");
					testData._id = res.body.data._id;
					done();
				});
		});
	});


	/**
	 * @param  {} "/POSTLogin"
	 * @param  {} (
	 */
	describe("/POST LOGIN COM ERRO FALTA DA SENHA", () => {
		it("Deve retornar erro por falta de campo , erro 400.", (done) => {
			chai.request(app)
				.post("/api/auth/login")
				.send({
					"email": testData.email
				})
				.end((err, res) => {
					res.should.have.status(400);
					done();
				});
		});
	});


	/**
	 * @param  {} "/POSTLogin"
	 * @param  {} (
	 */
	describe("/POST LOGIN INEXISTENTE", () => {
		it("Deve retornar erro de login", (done) => {
			chai.request(app)
				.post("/api/auth/login")
				.send({
					"email": "admin@admin.com",
					"password": "any123"
				})
				.end((err, res) => {
					res.should.have.status(401);
					done();
				});
		});
	});


	/**
	 * @param  {} "/POSTLogin"
	 * @param  {} (
	 */
	describe("/POST Login DONE", () => {
		it("Deve realizar o login", (done) => {
			chai.request(app)
				.post("/api/auth/login")
				.send({
					"email": testData.email,
					"password": testData.password
				})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("status").eql("success");
					done();
				});
		});
	});
});