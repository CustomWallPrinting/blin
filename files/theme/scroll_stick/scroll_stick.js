document.addEventListener("DOMContentLoaded", function(event) { 

  var window_innerHeight = window.innerHeight
  var window_innerWidth = window.innerWidth
  start(document.querySelector('.scroll_stick_wrapper'))

  function start(wrapper) {
    document.querySelector('.sticky_main .image').style.setProperty('top', document.querySelector('.sticky_main .headline').offsetHeight + (- 20) + 'px' )
    //document.querySelector('.sticky_main .image').style.setProperty('height', document.querySelector('.sticky_main').offsetHeight -  document.querySelector('.sticky_main .headline').offsetHeight + (+ 20) + 'px' )
    document.querySelector('.sticky_main .image').style.setProperty('height', document.querySelector('.sticky_main').offsetHeight -  document.querySelector('.sticky_main .headline').offsetHeight + 'px' )
    
    everyElement(
      wrapper.querySelectorAll('.sticky_element'), 
      document.querySelector('.sticky_main .image').offsetHeight,
      wrapper.querySelector('.sticky_main .image').getBoundingClientRect().top
      )
  }

  function everyElement(elements, imageHeight, imageTop) {
    elements.forEach(element => {
      element.querySelector('.copy').style.setProperty('height', element.querySelector('.content').offsetHeight + 'px')
      element.querySelector('.content').classList.add('height_copied')     
      scroll(element, imageHeight, imageTop)
    });
  }

  function scroll(element, imageHeight, imageTop) {
    window.addEventListener('scroll', e => {
        var elementPosition = element.querySelector('.copy').getBoundingClientRect().top + window.pageYOffset
        var windowBottom = window_innerHeight + window.pageYOffset
        var scrolled_since_element =  windowBottom - elementPosition
        var element_position_in_percent = ( 100 -  ( scrolled_since_element / imageHeight  * 100 ) )  
        
        var pixelTop = imageTop + ( imageHeight * (0.01*element.dataset.sticktop) )
        
        var margin_bottom = window_innerHeight - (pixelTop+element.querySelector('.content').offsetHeight) + 'px'
        element.style.setProperty('--margin-bottom', margin_bottom)
        
        if (element_position_in_percent <= element.dataset.sticktop) {
            element.querySelector('.content').classList.add('stick')
            element.querySelector('.content').style.setProperty('top', pixelTop+'px')
        } else {
            element.querySelector('.content').classList.remove('stick')
            element.querySelector('.content').style.setProperty('top','inherit')
        }
    });
  }


});