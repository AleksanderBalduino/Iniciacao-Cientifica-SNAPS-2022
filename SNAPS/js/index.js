jQuery(document).ready(function ($) {

  let h2Label = document.getElementById('h2Label');
  let pDesc = document.getElementById('pDesc');

  function showLabel(state) {
    h2Label.innerText = 'Simulador selecionado:'
    var valorID = document.querySelector(`#${state}`).id;
    pDesc.classList.replace('d-none','d-block');
    pDesc.innerText = valorID;
  }

  function hideLabel(state) {
    h2Label.innerText = 'Nenhum simulador selecionado';
    pDesc.classList.replace('d-block','d-none');
  }

  const orgaoDesc = document.querySelectorAll('.orgao-desc')

  for (let i = 0; i < orgaoDesc.length; i++) {
    orgaoDesc[i].addEventListener('mouseover', () => {
      showLabel(orgaoDesc[i].id)
    })
    orgaoDesc[i].addEventListener('mouseleave', () => {
      hideLabel(orgaoDesc[i].id)
    })
  }
});

let Cardiorrespiratorio = document.getElementById('Cardiorrespiratorio');
let Gastrointestinal = document.getElementById('Gastrointestinal');
let Metabolismo = document.getElementById('Metabolismo');
let Olhos = document.getElementById('Olhos');
let Urogenital = document.getElementById('Urogenital');

Cardiorrespiratorio.addEventListener('click', (e) => {
  window.location.href = 'simulador-cardiorespiratorio.html';
});

Gastrointestinal.addEventListener('click', (e) => {
  window.location.href = 'simulador-gastrointestinal.html';
});

Metabolismo.addEventListener('click', (e) => {
  window.location.href = 'simulador-metabolismo.html';
});

Olhos.addEventListener('click', (e) => {
  window.location.href = 'simulador-olhos.html';
});

Urogenital.addEventListener('click', (e) => {
  window.location.href = 'simulador-urogenital.html';
});

// let userEmail = document.getElementById('userEmail');
// let signoutlink = document.getElementById('signoutlink');
// let textBtnCadastroSair = document.getElementById('textBtnCadastroSair');
// let iconEmail = document.getElementById('iconEmail');
// let navItemId = document.getElementById('navItemId');

// var currentUser = null;

// function getUsername() {
//   let lembrarUsuario = localStorage.getItem("lembrarUsuario");

//   if(lembrarUsuario == "check"){
//     currentUser = JSON.parse(localStorage.getItem("user"));
//   }

//   else{
//     currentUser = JSON.parse(sessionStorage.getItem("user"));
//   }
// }

// function Signout() {
//   sessionStorage.removeItem("user");
//   sessionStorage.removeItem("email");
//   localStorage.removeItem("user");
//   localStorage.removeItem("email");
//   localStorage.removeItem("lembrarUsuario");

//   userEmail.innerText = "Entrar";
//   userEmail.classList.add('nav-link-remove-icon');
//   userEmail.href = "login.html";
  
//   textBtnCadastroSair.innerText = "Cadastre-se";

//   iconEmail.classList.replace('d-unset','d-none');

//   navItemId.classList.remove('nav-item-x');
// }

// window.onload = function(){
//   getUsername();

//   if(currentUser == null) {
//     userEmail.innerText = "Entrar";
//     userEmail.classList.add('nav-link-remove-icon');
//     userEmail.href = "login.html";

//     textBtnCadastroSair.innerText = "Cadastre-se";

//     iconEmail.classList.replace('d-unset','d-none');

//     navItemId.classList.remove('nav-item-x');
//   }

//   else{
//     userEmail.innerText = currentUser.email;
//     userEmail.classList.remove('nav-link-remove-icon');
//     userEmail.href = "";
    
//     textBtnCadastroSair.innerText = "Encerrar Sessão";

//     signoutlink.href = "javascript:Signout()";

//     iconEmail.classList.replace('d-none','d-unset');

//     navItemId.classList.add('nav-item-x');
//   }
// }