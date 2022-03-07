/**
 * import class
 */
import Functions from './class/class_functions';
let func = new Functions();

/* remove class so menu will be visible */
const menu = document.querySelector('#header');
menu.classList.remove('header-transparent');

//when user scroll
window.addEventListener('scroll', () => {
  //fade in elements on scroll
  func.fadeIn('#view .box');
});

/**
 * Api Police
 */
//get json data from police api, remake the array to get only what we need
func.getJson().then(data => {

  //remake data in a new array and sort it too
  let newArray = func.occurrence2(data);

  //get element
  let area = document.querySelector('#area');

  //loop and add more options to the selection
  newArray.forEach(element => {
    area.innerHTML += '<option>' + element.name + ' (' + element.count + ')</option>';
  });

  //change of the selection list
  area.addEventListener('change', () => {

    //get element
    const getElement = document.querySelector('#view .row');

    //each time we do a change we need to remove all contents that exist
    getElement.innerHTML = '';

    //remove from space and (, we only want the first word
    let singleWord = area.value.split(' (');

    //loop again and add content to the area we selected
    data.forEach(element => {

      //if the word we have are the same as element location
      if (element.location.name === singleWord[0]) {
        
        /* add content */
        getElement.innerHTML +=
          '<section class="col-lg-4 col-md-6 mt-5">' +
          '<div class="box text-center">' +
          '<div class="icon"></div>' +
          '<h3 class="title text-uppercase overflow-hidden fw-bold fs-6">' +
          '<a class="text-dark" href="https://polisen.se' + element.url + '">' + element.name + '</a>' +
          '</h3>' +
          '<h4 class="text-uppercase overflow-hidden fw-bold fs-6">' + element.type + '</h4>' +
          '<p>' + element.summary + '</p>' +
          '</div></section>';
      }

    });

    //fade in elements
    func.fadeIn('#view .box');

  })

});