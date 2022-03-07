/**
 * import class
 */
import Functions from './class/class_functions';
let func = new Functions();
/**
 * import header && footer
 */
func.importHTML('header', './includes/header.html');
func.importHTML('footer', './includes/footer.html');

/** 
 * user interactive
 */
//if clicked outside mobile button and when its open, just close it
window.addEventListener('click', event => {
  let mobileButton = document.querySelector('.menu-open');

  if (!mobileButton.contains(event.target)) {
    mobileButton.checked = false;
  }
})