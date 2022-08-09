var overlay = document.getElementById("overlay");

// Buttons to 'switch' the page
var openSignInButton = document.getElementById("slide-left-button");
var openSignUpButton = document.getElementById("slide-right-button");

// The sidebars
var leftText = document.getElementById("sign-in");
var rightText = document.getElementById("sign-up");

// The forms
var signinForm = document.getElementById("sign-up-info");
var accountForm = document.getElementById("sign-in-info")

// Open the Sign In page
openSignIn = () =>{
  // Remove classes so that animations can restart on the next 'switch'
  leftText.classList.remove("overlay-text-left-animation");
  overlay.classList.remove("open-sign-up");
  rightText.classList.remove("overlay-text-right-animation-out");
  // Add classes for animations
  signinForm.classList += " form-right-slide-out";
  leftText.className += " overlay-text-left-animation-out";
  overlay.className += " open-sign-in";
  rightText.className += " overlay-text-right-animation";
  // hide the sign in form once it is out of view
  setTimeout(function(){
    signinForm.classList.remove("form-right-slide-in")
    signinForm.style.display = "none";
    signinForm.classList.remove("form-right-slide-out")
  },700);
  // display the sign up form once the overlay begins moving left
  setTimeout(function(){
    accountForm.style.display = "flex";
    accountForm.classList += " form-left-slide-in";
  },400);
}

// Open the Sign Up page
openSignUp = () =>{
  // Remove classes so that animations can restart on the next 'switch'
  leftText.classList.remove("overlay-text-left-animation-out");
  overlay.classList.remove("open-sign-in");
  rightText.classList.remove("overlay-text-right-animation");
  // Add classes for animations
  accountForm.className += " form-left-slide-out"
  rightText.className += " overlay-text-right-animation-out";
  overlay.className += " open-sign-up";
  leftText.className += " overlay-text-left-animation";
  // hide the sign up form once it is out of view
  setTimeout(function(){
    accountForm.classList.remove("form-left-slide-in");
    accountForm.style.display = "none";
    accountForm.classList.remove("form-left-slide-out");
  }, 700);
  // display the sign in form once the overlay begins moving right
  setTimeout(function(){
    signinForm.style.display = "flex";
    signinForm.classList += " form-right-slide-in";
  }, 400);
}

// When a 'switch' button is pressed, switch page
openSignUpButton.addEventListener("click", openSignUp, false);
openSignInButton.addEventListener("click", openSignIn, false);

/* Botão Show Hide Password */
function ShowHidePassword(e) {
  var tipo = e.parentNode.querySelector("[id='password-input-sign-in']");
  if (tipo.type == "password") {
    tipo.type = "text";
  } else {
    tipo.type = "password";
  }

  tipo.type = tipo.type; //aplica o tipo que ficou no primeiro campo

  if (e.classList.contains("uil-eye-slash")) { //se tem olho fechado
    e.classList.remove("uil-eye-slash"); //remove classe olho fechado
    e.classList.add("uil-eye"); //coloca classe olho aberto
  } else { //senão
    e.classList.remove("uil-eye"); //remove classe olho aberto
    e.classList.add("uil-eye-slash"); //coloca classe olho fechado
  }
}

/* Recarregar página */
function ReloadPage_Reset() {
  const nodeList = document.querySelectorAll(".txtOutros");
  for (let i = 0; i < nodeList.length; i++) {
    nodeList[i].value='';
  }
}

/* Select função */
$(function(){
    var closeSelectTimeout;

    function hideMaterialList(parent){
        parent.css({
            'overflow': 'hidden'
        }).removeClass('isOpen');
        clearTimeout(closeSelectTimeout);
        closeSelectTimeout = setTimeout(function(){
            parent.parent().css({
                'z-index': 0  
            });
        }, 200);
    }
    $(document.body).on('mousedown', '.materialBtn, .select li', function(event){
        if(parseFloat($(this).css('opacity')) > 0 && $(document).width() >= 1008){
            var maxWidthHeight = Math.max($(this).width(), $(this).height());
            if($(this).find("b.drop").length == 0 || $(this).find("b.drop").css('opacity') != 1) {
                // .drop opacity is 1 when it's hidden...css animations
                drop = $('<b class="drop" style="width:'+ maxWidthHeight +'px;height:'+ maxWidthHeight +'px;"></b>').prependTo(this);
            }
            else{
                $(this).find("b.drop").each(function(){
                    if($(this).css('opacity') == 1){
                        drop = $(this).removeClass("animate");
                        return;
                    }
                })
            }
            x = event.pageX - drop.width()/2 - $(this).offset().left;
            y = event.pageY - drop.height()/2 - $(this).offset().top;
            drop.css({
                top: y,
                left: x
            }).addClass("animate");
        }
    });
    $(document.body).on('dragstart', '.materialBtn, .select li', function(e){
        e.preventDefault();
    })

    var selectTimeout;
    $(document.body).on('click', '.select li', function() {
        var parent = $(this).parent();
        parent.children('li').removeAttr('data-selected');
        $(this).attr('data-selected', 'true');
        clearTimeout(selectTimeout);
        if(parent.hasClass('isOpen')){
            if(parent.parent().hasClass('required')){
                if(parent.children('[data-selected]').attr('data-value')){
                    parent.parents('.materialSelect').removeClass('error empty');
                }
                else{
                    parent.parents('.materialSelect').addClass('error empty');
                }
            }
            hideMaterialList($('.select'));
            /*document.getElementById("txtOutros").focus();*/
            const nodeList = document.querySelectorAll(".txtOutros");
            for (let i = 0; i < nodeList.length; i++) {
              nodeList[i].focus();
            }
        }
        else{
            var pos = Math.max(($('li[data-selected]', parent).index() - 2) * 48, 0);
            parent.addClass('isOpen');
            parent.parent().css('z-index', '999');
            if($(document).width() >= 1008){
                var i = 1;
                selectTimeout = setInterval(function(){
                    i++;
                    parent.scrollTo(pos, 50);
                    if(i == 2){
                        parent.css('overflow', 'auto');
                    }
                    if(i >= 4){
                        clearTimeout(selectTimeout);
                    }
                }, 100);
            }
            else{
                parent.css('overflow', 'auto').scrollTo(pos, 0);
            }
        }
    });

    $('.materialInput input').on('change input verify', function(){
        if($(this).attr('required') == 'true'){
            if($(this).val().trim().length){
                $(this).parent().removeClass('error empty');
            }
            else{
                $(this).parent().addClass('error empty');
                $(this).val('');
            }
        }
        else{
            if($(this).val().trim().length){
                $(this).parent().removeClass('empty');
            }
            else{
                $(this).parent().addClass('empty');
            }
        }
    });

    $(document.body).on('click', function(e) {
        var clicked;
        if($(e.target).hasClass('materialSelect')){
            clicked = $(e.target).find('.select').first();
        }
        else if($(e.target).hasClass('select')){
            clicked = $(e.target);
        }
        else if($(e.target).parent().hasClass('select')){
            clicked = $(e.target).parent();
        }

        if($(e.target).hasClass('materialSelect') || $(e.target).hasClass('select') || $(e.target).parent().hasClass('select')){
            hideMaterialList($('.select').not(clicked));
        }
        else{
            if($('.select').hasClass('isOpen')){
                hideMaterialList($('.select'));
            }
        }
    });
    hideMaterialList($('.select'));
})