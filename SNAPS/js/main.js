/*================================================================================================================*/

/* Header */

(function($) { "use strict";

    $(function() {
        var header = $(".start-style");
        $(window).scroll(function() {    
            var scroll = $(window).scrollTop();
        
            if (scroll >= 10) {
                header.removeClass('start-style').addClass("scroll-on");
            } else {
                header.removeClass("scroll-on").addClass('start-style');
            }
        });
    });     
        
    //Animation
    
    $(document).ready(function() {
        $('body.hero-anime').removeClass('hero-anime');
    });

    //Menu On Hover
        
    $('body').on('mouseenter mouseleave','.nav-item',function(e){
            if ($(window).width() > 750) {
                var _d=$(e.target).closest('.nav-item');_d.addClass('show');
                setTimeout(function(){
                _d[_d.is(':hover')?'addClass':'removeClass']('show');
                },1);
            }
    }); 
    
  })(jQuery);

/*================================================================================================================*/

/* Preloader */
var random = Math.floor((Math.random() * 1500)); 
$(document).ready(function() {
  
  setTimeout(function(){
    $('body').addClass('loaded');
    reloadScrollBars();
  }, random);
  unloadScrollBars();
});


function unloadScrollBars() {
    document.documentElement.style.overflow = 'hidden';
    document.body.scroll = "no"; // IE
}

function reloadScrollBars() {
    document.documentElement.style.overflow = 'auto';
    document.body.scroll = "yes"; // IE
}

/*================================================================================================================*/

/* Botão voltar ao topo */

var amountScrolled = 200;
var amountScrolledNav = 0;

$(window).load(function() {
  if ( $(window).scrollTop() > amountScrolledNav ) {
    $('header.start-header').addClass('scroll-on');
  } else {
    $('header.start-header').removeClass('scroll-on');
  }

  if ( $(window).scrollTop() > amountScrolled ) {
    $('button.back-to-top').addClass('show');
  } else {
    $('button.back-to-top').removeClass('show');
  }
});

$(window).scroll(function() {
  if ( $(window).scrollTop() > amountScrolled ) {
    $('button.back-to-top').addClass('show');
  } else {
    $('button.back-to-top').removeClass('show');
  }
});

$('button.back-to-top').click(function() {
  $('html, body').animate({
    scrollTop: 0
  }, 1000);
  return false;
});

// Ignore this
// This is just for content manipulation
var skeleton = '<div class="skeleton"><div class="skeleton-wrapper"><div class="skeleton-wrapper-inner"><div class="skeleton-wrapper-body"><div class="skeleton-avatar"></div><div class="skeleton-author"></div><div class="skeleton-label"></div><div class="skeleton-content-1"></div><div class="skeleton-content-2"></div><div class="skeleton-content-3"></div></div></div></div></div>';
for(var i=0;i<10;i++){
  $('#content').append(skeleton); 
}

// Add waves effect
Waves.attach('button.back-to-top', 'waves-effect');
Waves.init();

/*================================================================================================================*/

/* Animação Scroll */

$('a.scroll-link').click(function() {
  $('html, body').animate({
    scrollTop: 0
  }, 1000);
  return false;
});

/*================================================================================================================*/

/* Animacao Scroll | Ancora links internos */

$("div a.simulador-link").click(function(event){
   event.preventDefault();
   var dest=0;
   if($(this.hash).offset().top > $(document).height()-$(window).height()){
     dest=$(document).height()-$(window).height();
   }else{
     dest=$(this.hash).offset().top;
   }

   $('html,body').animate({scrollTop:dest}, 1000,'swing');
 });

/*================================================================================================================*/

/* Carrosel Topo */

$('.slider').each(function() {
  var $this = $(this);
  var $group = $this.find('.slide_group');
  var $slides = $this.find('.slide');
  var currentIndex = 0;
  var timeout;
  
  function move(newIndex) {
    var animateLeft, slideLeft;
    
    advance();
    
    if ($group.is(':animated') || currentIndex === newIndex) {
      return;
    }
    
    if (newIndex > currentIndex) {
      slideLeft = '100%';
      animateLeft = '-100%';
    } else {
      slideLeft = '-100%';
      animateLeft = '100%';
    }
    
    $slides.eq(newIndex).css({
      display: 'block',
      left: slideLeft
    });
    $group.animate({
      left: animateLeft
    }, function() {
      $slides.eq(currentIndex).css({
        display: 'none'
      });
      $slides.eq(newIndex).css({
        left: 0
      });
      $group.css({
        left: 0
      });
      currentIndex = newIndex;
    });
  }
  
  function advance() {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      if (currentIndex < ($slides.length - 1)) {
        move(currentIndex + 1);
      } else {
        move(0);
      }
    }, 10000);
  }
  
  $('.next_btn').on('click', function() {
    if (currentIndex < ($slides.length - 1)) {
      move(currentIndex + 1);
    } else {
      move(0);
    }
  });
  
  $('.previous_btn').on('click', function() {
    if (currentIndex !== 0) {
      move(currentIndex - 1);
    } else {
      move(4);
    }
  });
  
  $.each($slides, function(index) {
    var $button = $('<a class="slide_btn">&bull;</a>');
    
    if (index === currentIndex) {
      $button.addClass('active');
    }
    $button.on('click', function() {
      move(index);
    }).appendTo('.slide_buttons');
  });
  
  advance();
});

/*================================================================================================================*/

/* Carrosel SNAPS */

var mySwiper = new Swiper(".swiper", {

  loop: true,
  slidesPerView: "auto",
  spaceBetween: 0,
  centeredSlides: true,
  slideToClickedSlide: false,
  autoplay: {
    delay: 6000,
    disableOnInteraction: false
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function(index, className) {
      return '<span class="' + className + '">' + "</span>";
    }
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  keyboard: {
    enabled: true,
  }
});

var initPhotoSwipeFromDOM = function(gallerySelector) {
  var parseThumbnailElements = function(el) {
    var thumbElements = el.childNodes,
        numNodes = thumbElements.length,
        items = [],
        figureEl,
        linkEl,
        size,
        item;

    for (var i = 0; i < numNodes; i++) {
      figureEl = thumbElements[i];

      if (figureEl.nodeType !== 1) {
        continue;
      }

      linkEl = figureEl.children[0];

      size = linkEl.getAttribute("data-size").split("x");

      item = {
        src: linkEl.getAttribute("href"),
        w: parseInt(size[0], 10),
        h: parseInt(size[1], 10)
      };

      if (figureEl.children.length > 1) {
        item.title = figureEl.children[1].innerHTML;
      }

      if (linkEl.children.length > 0) {
        item.msrc = linkEl.children[0].getAttribute("src");
      }

      item.el = figureEl;
      items.push(item);
    }

    return items;
  };

  var closest = function closest(el, fn) {
    return el && (fn(el) ? el : closest(el.parentNode, fn));
  };

  var onThumbnailsClick = function(e) {
    e = e || window.event;
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);

    var eTarget = e.target || e.srcElement;

    var clickedListItem = closest(eTarget, function(el) {
      return el.tagName && el.tagName.toUpperCase() === "LI";
    });

    if (!clickedListItem) {
      return;
    }

    var clickedGallery = clickedListItem.parentNode,
        childNodes = clickedListItem.parentNode.childNodes,
        numChildNodes = childNodes.length,
        nodeIndex = 0,
        index;

    for (var i = 0; i < numChildNodes; i++) {
      if (childNodes[i].nodeType !== 1) {
        continue;
      }

      if (childNodes[i] === clickedListItem) {
        index = nodeIndex;
        break;
      }
      nodeIndex++;
    }

    if (index >= 0) {
      openPhotoSwipe(index, clickedGallery);
    }
    return false;
  };

  var photoswipeParseHash = function() {
    var hash = window.location.hash.substring(1),
        params = {};

    if (hash.length < 5) {
      return params;
    }

    var vars = hash.split("&");
    for (var i = 0; i < vars.length; i++) {
      if (!vars[i]) {
        continue;
      }
      var pair = vars[i].split("=");
      if (pair.length < 2) {
        continue;
      }
      params[pair[0]] = pair[1];
    }

    if (params.gid) {
      params.gid = parseInt(params.gid, 10);
    }

    return params;
  };

  var openPhotoSwipe = function(
  index,
   galleryElement,
   disableAnimation,
   fromURL
  ) {
    var pswpElement = document.querySelectorAll(".pswp")[0],
        gallery,
        options,
        items;

    items = parseThumbnailElements(galleryElement);

    options = {
      closeEl: true,
      captionEl: true,
      fullscreenEl: true,
      zoomEl: true,
      shareEl: false,
      counterEl: false,
      arrowEl: true,
      preloaderEl: true,
      galleryUID: galleryElement.getAttribute("data-pswp-uid"),

      getThumbBoundsFn: function(index) {
        var thumbnail = items[index].el.getElementsByTagName("img")[0],
            pageYScroll =
            window.pageYOffset || document.documentElement.scrollTop,
            rect = thumbnail.getBoundingClientRect();

        return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
      }
    };

    if (fromURL) {
      if (options.galleryPIDs) {
        for (var j = 0; j < items.length; j++) {
          if (items[j].pid == index) {
            options.index = j;
            break;
          }
        }
      } else {
        options.index = parseInt(index, 10) - 1;
      }
    } else {
      options.index = parseInt(index, 10);
    }

    if (isNaN(options.index)) {
      return;
    }

    if (disableAnimation) {
      options.showAnimationDuration = 0;
    }

    gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();

    gallery.listen("unbindEvents", function() {
      let getCurrentIndex = gallery.getCurrentIndex();
      mySwiper.slideTo(getCurrentIndex, 0, false);
      mySwiper.autoplay.start();
    });

    gallery.listen('initialZoomIn', function() {
      if(mySwiper.autoplay.running){
        mySwiper.autoplay.stop();
      }
    });
  };

  var galleryElements = document.querySelectorAll(gallerySelector);

  for (var i = 0, l = galleryElements.length; i < l; i++) {
    galleryElements[i].setAttribute("data-pswp-uid", i + 1);
    galleryElements[i].onclick = onThumbnailsClick;
  }

  var hashData = photoswipeParseHash();
  if (hashData.pid && hashData.gid) {
    openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
  }
};

initPhotoSwipeFromDOM(".my-gallery");
/*================================================================================================================*/

/* Animação Fade */
class ScrollFadeIn {
  constructor() {
    this.ANIMATION_CLASS = 'is-animation';

    let $section = document.querySelectorAll('.js-scroll-fade-in:not(.is-animation)');
    if ($section.length === null) {
      return;
    }
    let controller = new ScrollMagic.Controller();
    for (let i = 0; i < $section.length; i++) {
      let scene = new ScrollMagic.Scene({
        triggerElement: $section[i],
        triggerHook: 'onEnter',
        reverse: false,
        offset: 100 }).

      addTo(controller);
      scene.on('enter', () => {
        $section[i].classList.add(this.ANIMATION_CLASS);
      });
      scene.on('end', () => {
        scene.destroy(true);
      });
    }
  }
}

new ScrollFadeIn();

class ScrollFade {
  constructor() {
    this.ANIMATION_CLASS = 'is-animation';

    let $section = document.querySelectorAll('.js-scroll-fade:not(.is-animation)');
    if ($section.length === null) {
      return;
    }
    let controller = new ScrollMagic.Controller();
    for (let i = 0; i < $section.length; i++) {
      let scene = new ScrollMagic.Scene({
        triggerElement: $section[i],
        triggerHook: 'onEnter',
        reverse: false,
        offset: 100 }).

      addTo(controller);
      scene.on('enter', () => {
        $section[i].classList.add(this.ANIMATION_CLASS);
      });
      scene.on('end', () => {
        scene.destroy(true);
      });
    }
  }
}

new ScrollFade();

/*================================================================================================================*/