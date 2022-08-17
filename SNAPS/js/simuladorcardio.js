function moveToSelected(element) {

  if (element == "next") {
    var selected = $(".selected").next();
  } else if (element == "prev") {
    var selected = $(".selected").prev();
  } else {
    var selected = element;
  }

  var next = $(selected).next();
  var prev = $(selected).prev();
  var prevSecond = $(prev).prev();
  var nextSecond = $(next).next();

  $(selected).removeClass().addClass("selected");

  $(prev).removeClass().addClass("prevDir option");
  $(next).removeClass().addClass("nextDir option");

  $(nextSecond).removeClass().addClass("nextPontaDir option");
  $(prevSecond).removeClass().addClass("prevPontaDir option");

  const containbeta = document.querySelector('#beta');

  if (containbeta.classList.contains('option') == true){
    $(".btnbeta").removeClass("btn-hover-anim");
    $("#BetaBasal, #BetaAtivado, #BetaPoucoAtivado, #BetaBloqueado").addClass("disabled");
  }
  else if(containbeta.classList.contains('option') == false){
    setTimeout(function () {
      $(".btnbeta").addClass("btn-hover-anim");
      $("#BetaBasal, #BetaAtivado, #BetaPoucoAtivado, #BetaBloqueado").removeClass("disabled");
    }, 2000);
  }

  const containalfa = document.querySelector('#alfa');

  if (containalfa.classList.contains('option') == true){
    $(".btnalfa").removeClass("btn-hover-anim");
    $("#AlfaBasal, #AlfaAtivado, #AlfaPoucoAtivado, #AlfaBloqueado").addClass("disabled");
  }
  else if(containalfa.classList.contains('option') == false){
    setTimeout(function () {
      $(".btnalfa").addClass("btn-hover-anim");
      $("#AlfaBasal, #AlfaAtivado, #AlfaPoucoAtivado, #AlfaBloqueado").removeClass("disabled");
    }, 2000);
  }

  const containmuscarinico = document.querySelector('#muscarinico');

  if (containmuscarinico.classList.contains('option') == true){
    $(".btnmuscarinico").removeClass("btn-hover-anim");
    $("#MuscarinicoBasal, #MuscarinicoAtivado, #MuscarinicoPoucoAtivado, #MuscarinicoBloqueado").addClass("disabled");
  }
  else if(containmuscarinico.classList.contains('option') == false){
    setTimeout(function () {
      $(".btnmuscarinico").addClass("btn-hover-anim");
      $("#MuscarinicoBasal, #MuscarinicoAtivado, #MuscarinicoPoucoAtivado, #MuscarinicoBloqueado").removeClass("disabled");
    }, 2000);
  }
};

$('#carousel div').click(function() {
  moveToSelected($(this));
});

$('#prev').click(function() {
  moveToSelected('prev');
});

$('#next').click(function() {
  moveToSelected('next');
});

function modalClose() {
  if (location.hash == '#openBetaBasal' || location.hash == '#openBetaAtivado' || location.hash == '#openBetaPoucoAtivado' || location.hash == '#openBetaBloqueado'
      || location.hash == '#openAlfaBasal' || location.hash == '#openAlfaAtivado' || location.hash == '#openAlfaPoucoAtivado' || location.hash == '#openAlfaBloqueado'
      || location.hash == '#openMuscarinicoBasal' || location.hash == '#openMuscarinicoAtivado' || location.hash == '#openMuscarinicoPoucoAtivado' || location.hash == '#openMuscarinicoBloqueado') {
    location.hash = '#close';
  }
}

$(".close").click(function(){
  location.hash = '#close';
});

var modalBB = document.querySelector('#openBetaBasal');
var modalBA = document.querySelector('#openBetaAtivado');
var modalBPA = document.querySelector('#openBetaPoucoAtivado');
var modalBBL = document.querySelector('#openBetaBloqueado');

modalBB.addEventListener('click', function(e) {
  modalClose();
}, false);

modalBA.addEventListener('click', function(e) {
  modalClose();
}, false);

modalBPA.addEventListener('click', function(e) {
  modalClose();
}, false);

modalBBL.addEventListener('click', function(e) {
  modalClose();
}, false);

modalBB.children[0].addEventListener('click', function(e){
  e.stopPropagation();
}, false);

modalBA.children[0].addEventListener('click', function(e){
  e.stopPropagation();
}, false);

modalBPA.children[0].addEventListener('click', function(e){
  e.stopPropagation();
}, false);

modalBBL.children[0].addEventListener('click', function(e){
  e.stopPropagation();
}, false);

var modalAB = document.querySelector('#openAlfaBasal');
var modalAA = document.querySelector('#openAlfaAtivado');
var modalAPA = document.querySelector('#openAlfaPoucoAtivado');
var modalABL = document.querySelector('#openAlfaBloqueado');

modalAB.addEventListener('click', function(e) {
  modalClose();
}, false);

modalAA.addEventListener('click', function(e) {
  modalClose();
}, false);

modalAPA.addEventListener('click', function(e) {
  modalClose();
}, false);

modalABL.addEventListener('click', function(e) {
  modalClose();
}, false);

modalAB.children[0].addEventListener('click', function(e){
  e.stopPropagation();
}, false);

modalAA.children[0].addEventListener('click', function(e){
  e.stopPropagation();
}, false);

modalAPA.children[0].addEventListener('click', function(e){
  e.stopPropagation();
}, false);

modalABL.children[0].addEventListener('click', function(e){
  e.stopPropagation();
}, false);

var modalMB = document.querySelector('#openMuscarinicoBasal');
var modalMA = document.querySelector('#openMuscarinicoAtivado');
var modalMPA = document.querySelector('#openMuscarinicoPoucoAtivado');
var modalMBL = document.querySelector('#openMuscarinicoBloqueado');

modalMB.addEventListener('click', function(e) {
  modalClose();
}, false);

modalMA.addEventListener('click', function(e) {
  modalClose();
}, false);

modalMPA.addEventListener('click', function(e) {
  modalClose();
}, false);

modalMBL.addEventListener('click', function(e) {
  modalClose();
}, false);

modalMB.children[0].addEventListener('click', function(e){
  e.stopPropagation();
}, false);

modalMA.children[0].addEventListener('click', function(e){
  e.stopPropagation();
}, false);

modalMPA.children[0].addEventListener('click', function(e){
  e.stopPropagation();
}, false);

modalMBL.children[0].addEventListener('click', function(e){
  e.stopPropagation();
}, false);

function Desc(){
  var droga
  droga = document.getElementById('drogas').value

  var detail
  detail = document.getElementById('detail').value
 
  switch(droga){
    case 'Adrenalina':

        switch(detail){
          case 'Descrição':
            document.getElementById('detailarea').value = 'Agonista do sistema nervoso simpático.'
          break;

          case 'Efeitos':
            document.getElementById('detailarea').value = 'Aumento da frequência cardíaco, força de contração cardíaca , vasoconstricção visceral e vasodilatação muscular, levando ao aumento da pressão arterial.'
          break;

          case 'Uso Clínico':
            document.getElementById('detailarea').value = 'AESP e PCR em assistolia.'
          break;

          case 'Efeitos Adversos':
            document.getElementById('detailarea').value = 'Hipertensão arterial e arritmias.'
          break;
        }

      break;

    case 'Noradrenalina':

        switch(detail){
          case 'Descrição':
            document.getElementById('detailarea').value = 'Agonista α₁, e β₁ predominantemente.'
          break;

          case 'Efeitos':
            document.getElementById('detailarea').value = 'Efeitos cronotrópicos positivos, vasoconstricção visceral e muscular, levando ao aumento da pressão arterial.'
          break;

          case 'Uso Clínico':
            document.getElementById('detailarea').value = 'Hipotensão significativa, reanimação de atividade elétrica sem pulso (AESP) em assistolia.'
          break;

          case 'Efeitos Adversos':
            document.getElementById('detailarea').value = 'Arritmias cardíacas, hipertensão arterial, tremores, taquicardia.'
          break;
        }
        
    break;
  }  

}
