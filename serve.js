const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Console = require("console");

dotenv.config({
	path: "./config.env"
});

process.on("uncaughtException", (err) => {
	/**Ignorar erro relacionado a porta existente caso ambiente seja de desenvolvimento */
	if (err.errno !== -4091 || process.env.NODE_ENVIROMMENT !== "development") {
		Console.log(err.name, err.message);
		process.exit(1);
	}
});

const app = require("./app");

/**clear old log */
Console.clear();

const database = process.env.NODE_ENVIROMMENT == "development" ?
	process.env.DATABASE.replace("<password>", process.env.DATABASE_PASSWORD) :
	process.env.DATABASETEST.replace("<password>", process.env.DATABASE_PASSWORDTEST);

/*  Conectando ao banco de dados  */
mongoose.connect(database, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
}).then(() => {
	Console.log("Conectado ! App  está sendo carregada , Presione CTRL + C para parar o processo 👌 ... \n");
});

/* Iniciando o servidor  */
const port = process.env.PORT;
app.listen(port, () => {
	Console.log(`Api  iniciada na porta :  ${port}, com sucesso  🎉 🎉 !!`);
});

process.on("unhandledRejection", (err) => {
	Console.log(err.name, err.message);
	// eslint-disable-next-line no-undef
	server.close(() => {
		process.exit(1);
	});
});
 