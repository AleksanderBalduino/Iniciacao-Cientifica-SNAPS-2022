let userEmail = document.getElementById('userEmail');
let signoutlink = document.getElementById('signoutlink');
let iconEmail = document.getElementById('iconEmail');
let iconDownArrow = document.getElementById('iconDownArrow');
let navItemId = document.getElementById('navItemId');
let dropdownMenuUserEmail = document.getElementById('dropdownMenuUserEmail');
let btnCadastroNavBar = document.getElementById('btnCadastroNavBar');

let containerSigninSignout = document.getElementById('containerSigninSignout');
let userLogado = document.getElementById('userLogado');
let userEmailLogado = document.getElementById('userEmailLogado');

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
  localStorage.clear();
  sessionStorage.clear();

  userEmail.innerText = "Entrar";
  userEmail.classList.add('nav-link-remove-icon');
  userEmail.href = "login.html";

  iconEmail.classList.replace('d-unset','d-none');
  iconDownArrow.classList.replace('d-unset','d-none');

  navItemId.classList.remove('nav-item-x');

  dropdownMenuUserEmail.classList.add('d-none');

  btnCadastroNavBar.classList.remove('d-none');

  /* Container Usuário Logado */
  containerSigninSignout.classList.remove('d-none');
  userLogado.classList.add('d-none');
  window.location.reload();
}

window.onload = function(){
  getUsername();

  if(currentUser == null) {
    userEmail.innerText = "Entrar";
    userEmail.classList.add('nav-link-remove-icon');
    userEmail.href = "login.html";

    iconEmail.classList.replace('d-unset','d-none');
    iconDownArrow.classList.replace('d-unset','d-none');

    navItemId.classList.remove('nav-item-x');
  }

  else{
    userEmail.innerText = currentUser.email;
    userEmail.classList.remove('nav-link-remove-icon');
    userEmail.removeAttribute("href");
    userEmail.classList.add("dropdown-toggle");
    userEmail.dataset.toggle = "dropdown";

    signoutlink.href = "javascript:Signout()";

    iconEmail.classList.replace('d-none','d-unset');
    iconDownArrow.classList.replace('d-none','d-unset');

    navItemId.classList.add('nav-item-dropdown-x');
    navItemId.classList.remove('active');

    dropdownMenuUserEmail.classList.remove('d-none');

    btnCadastroNavBar.classList.add('d-none');

    /* Usuário Logado */
    containerSigninSignout.classList.add('d-none');
    userLogado.classList.remove('d-none');
    userEmailLogado.innerText = 'Email: ' + currentUser.email;
  }
}