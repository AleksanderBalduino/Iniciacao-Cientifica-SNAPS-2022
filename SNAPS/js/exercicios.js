let link = 'https://forms.gle/'
let botoes = document.getElementById('buttonExercicio')
let input = document.getElementById("btnexercicio")

function verificarCampo(){
	if (input.value.length == 17 ) {
		botoes.className = 'btn btn-md btn-success'
		botoes.style = 'pointer-events: auto;'
	}
	else{
		botoes.className = 'btn btn-md btn-secondary'
		botoes.style = 'pointer-events: none;'
	}
}

function verificarBotao(){
	var url = link + input.value 
	window.location.href = url
}

function validator(teste){
	input.addEventListener("keydown", function(e) {
	    if(e.keyCode === 32) {
	    	e.preventDefault();
	  	}
	});
}

/*$('input').on("input", function(e) {
    $(this).val($(this).val().replace(/,/g, ""));
});*/