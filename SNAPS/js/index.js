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