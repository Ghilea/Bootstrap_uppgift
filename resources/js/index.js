/**
 * import class
 */
import Functions from './class/class_functions';
let func = new Functions();

/** 
 * user interactive
 */
//when user scroll
window.addEventListener('scroll', () => {
  //fade in elements on scroll
  func.fadeIn('.box');

  //get solid color for menu on scroll down after elements height
  func.solidNavMenu();
});

/**
 * Api Police
 */
//get json data from police api, remake the array to get only what we need
func.getJson().then(data => {

  /* Count */
  //remake array to count right if the type are the same
  const stats = document.querySelector('#stats');
  let alreadyView = false;

  window.addEventListener('scroll', () => {
    if (func.inView(stats) && alreadyView === false) {

      //just so we dont animate those numbers again
      alreadyView = true;

      //rework our data
      let newArray = func.occurrence(data);

      //get containers to put contents in
      const getContentNumber = document.querySelectorAll('#stats .counters p');
      const getContentTitle = document.querySelectorAll('#stats .counters h3');

      //loop and writeout 4 of the highest crimes
      for (let index = 0; index < 4; index++) {

        //add a title of the crime
        getContentTitle[index].innerHTML =  newArray[index].type;

        //add a counting of the crime
        getContentNumber[index].innerText = newArray[index].count;

        //add animation to our numbers, stats
        func.animateValue(getContentNumber[index], 0, newArray[index].count, 1000);
      }
    }
  });

  /* add the latest crimes to the info section */
  /* getting the rows div */
  const getElement = document.querySelector('#info .row');

  /* loop and add data */
  for (let index = 0; index < 9; index++) {

    getElement.innerHTML += 
    '<section class = "col-lg-4 col-md-6">' +
      '<div class="box text-center">' +
      '<div class="icon"></div>' +
      '<h3 class="title text-uppercase overflow-hidden fw-bold fs-6">' +
      '<a class="text-dark" href="https://polisen.se' + data[index].url + '">' + data[index].name + '</a>' +
      '</h3>' + 
      '<p>' + data[index].summary + '</p>' +
      '</div></section>';
  }

});