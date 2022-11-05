jQuery(document).ready(function ($) {
  //Carte USA
  function showLabel(state) {
    var postion = document.querySelector(`#${state}`).getBoundingClientRect();
    console.log(postion, state)
    const width = postion.width
    const height = postion.height

    document.querySelector(`.${state}`).style.top = (postion.top + height / 2) + 'px'
    document.querySelector(`.${state}`).style.left = (postion.left + width / 2) + 'px'
    document.querySelector(`.${state}`).style.transform = 'translate(-50%, -50%) scale(1)'
  }

  function hideLabel(state) {
    document.querySelector(`.${state}`).style.transform = 'translate(-50%, -50%) scale(0)'
  }

  const states = document.querySelectorAll('.jqvmap-region')

  for (let i = 0; i < states.length; i++) {
    states[i].addEventListener('mouseover', () => {
      showLabel(states[i].id)
    })
    states[i].addEventListener('mouseleave', () => {
      hideLabel(states[i].id)
    })
  }
});

let userEmail = document.getElementById('userEmail');
let signoutlink = document.getElementById('signoutlink');
let textBtnCadastroSair = document.getElementById('textBtnCadastroSair');
let iconEmail = document.getElementById('iconEmail');
let navItemId = document.getElementById('navItemId');

var currentUser = null;

function getUsername() {
  let lembrarUsuario = localStorage.getItem("lembrarUsuario");

  if(lembrarUsuario == "check"){
    currentUser = JSON.parse(localStorage.getItem("user"));
  }

  else{
    currentUser = JSON.parse(sessionStorage.getItem("user"));
  }
}

function Signout() {
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("email");
  localStorage.removeItem("user");
  localStorage.removeItem("email");
  localStorage.removeItem("lembrarUsuario");

  userEmail.innerText = "Entrar";
  userEmail.classList.add('nav-link-remove-icon');
  userEmail.href = "login.html";
  
  textBtnCadastroSair.innerText = "Cadastre-se";

  iconEmail.classList.replace('d-unset','d-none');

  navItemId.classList.remove('nav-item-x');
}

window.onload = function(){
  getUsername();

  if(currentUser == null) {
    userEmail.innerText = "Entrar";
    userEmail.classList.add('nav-link-remove-icon');
    userEmail.href = "login.html";

    textBtnCadastroSair.innerText = "Cadastre-se";

    iconEmail.classList.replace('d-unset','d-none');

    navItemId.classList.remove('nav-item-x');
  }

  else{
    userEmail.innerText = currentUser.email;
    userEmail.classList.remove('nav-link-remove-icon');
    userEmail.href = "";
    
    textBtnCadastroSair.innerText = "Encerrar Sessão";

    signoutlink.href = "javascript:Signout()";

    iconEmail.classList.replace('d-none','d-unset');

    navItemId.classList.add('nav-item-x');
  }
}