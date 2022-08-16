let link = 'https://forms.gle/'
let botoes = document.getElementsByTagName('button')
let input = document.getElementById("btnexercicio")

function verificarCampo(){

	if (input.value.length == 17 ) {
		botoes[1].className = 'btn btn-md btn-success'
		botoes[1].style = 'pointer-events: auto;'
	}
	else{
		botoes[1].className = 'btn btn-md btn-secondary'
		botoes[1].style = 'pointer-events: none;'
	}
}

function verificarBotao(){
	
	var url = link + input.value 
	window.location.href = url

}

/*
https://forms.gle/GAXBh2UgG5X6i68cA
https://forms.gle/CSYU26ZgarZpRDji8
*/