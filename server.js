const http = require('http')
const fs = require('fs')

const port = process.env.PORT || 3000

http.createServer((req, res) => {

	let arq = ''

	if (req.url == '/')
		// Se a url da requisição for '/'
		// o arquivo será o diretório atual
		// + "/index.html" 
		arq = __dirname + "/static/index.html" 
	else 
		// Se a url da requisição não for '/'
		// o arquivo será o diretório atual
		// + a url da requisição
		arq = __dirname + "/static" + req.url

	fs.readFile(arq, (err, data) => {
		if (err) {
			// Se houver algum erro
			// haverá um retorno, logo é interrompido a função
			res.writeHead(404)
			return res.end("Página ou arquivo não encontrado")
		}

		// Se não houver erro
		// a resposta terá o codigo 200 (OK)
		// e renderizará a pagina requirida
		res.writeHead(200)
		res.end(data)
	})
}).listen(port, () => {
	console.log("Servidor iniciado em http://localhost:" + port)
})