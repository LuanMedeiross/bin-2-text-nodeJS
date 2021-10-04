const input  = $("#input")
const output = $("#output")

input.keypress((e) => {
	if ($("#convert").val() == "bintotext") {	
		// Se "e.key" for nõ estiver em "10 "
		// retorna false, logo o evento é imterrompido
		// e o caractere não entra no input
	    if ("10 ".indexOf(e.key) < 0)
	    	return false;
	} 
})

$("#convert").click(() => {
	// 128 64 32 16  8  4  2  1
	//   1  1  1  1  1  1  1  1
	const bits = [128, 64, 32, 16, 8, 4, 2, 1]
	
	if ($("#convert").val() == "bintotext") {

		let iBytes = input.val().split(' ')
		let bytes  = []
		let dex    = []
		let text   = ""

		// Se a quantidade de caracteres em cada
		// elemento do vetor "byte" for "8"
		// o elemento será adicionado em outro 
		// vetor, assim separando os bytes incompletos
		// dos bytes completos
		iBytes.forEach((byte) => {
			if (byte.length == 8) {
				bytes.push(byte)
			}
		})
		
		bytes.forEach((byte) => {
			let dexN = 0

			for(let i = 0; i < byte.length; i++) {
				if (byte[i] == 1)
					dexN += bits[i]
			}

			dex.push(dexN)
		})

		dex.forEach((d) => {
			text += String.fromCharCode(d)
		})

		output.val(text)

	} else if ($("#convert").val() == "textobin") {
		
		let ascii = []
		let binary = []

		for (let i = 0; i < input.val().length; i++) {
			ascii.push(input.val()[i].charCodeAt(0))
		}

		ascii.forEach((aCode) => {
			let byte = ""

			for (let j = 0; byte.length < 8; j++) {
				if (aCode < bits[j]) {
					byte += '0'
				} else {
					aCode -= bits[j]
					byte += '1'
				}
			} binary.push(byte)
		})

		output.val(binary.join(" "))
	}
})

$("#swap").click(() => {

	if ($("#convert").val() == "bintotext") {
		input.prop("placeholder", "Text Input ...")
		output.prop("placeholder", "Binary Output ...")
		$("#convert").prop("value", "textobin")
		$("title").html("Text to Bin")
	} else if ($("#convert").val() == "textobin") {
		input.prop("placeholder", "Binary Input ...")
		output.prop("placeholder", "Text Output ...")
		$("#convert").prop("value", "bintotext")
		$("title").html("Bin to Text")
	}

	input.val("")
	output.val("")
	
})

$("#reset").click(() => {
	output.val("")
	input.val("")
})
