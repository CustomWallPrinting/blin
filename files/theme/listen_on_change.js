document.addEventListener('DOMContentLoaded', function(event) { 

  if ( document.querySelectorAll('.listen_on_change select') ) { start( document.querySelectorAll('.listen_on_change select') ) }

  function start(selects) {
    if ( document.querySelector('.widget.other') ) {
      document.querySelector('.widget.other').style.setProperty('display','none')
    }
    selects.forEach(select => {
      select.addEventListener('change', function (event) {
        if ( select.options[select.selectedIndex].value == 'other' ) {
          document.querySelector('.widget.other').style.setProperty('display','block')
        } else {
          document.querySelector('.widget.other').style.setProperty('display','none')
        } 
      })

    });
  }

});