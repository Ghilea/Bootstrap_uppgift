export default class Functions {
    constructor() {
        //types that we want from the police api to be included in the request
        this.type = 'Alkohollagen;Bedrägeri;Brand;Brand%20automatlarm;Bråk;Detonation;Fylleri/LOB;Inbrott;Knivlagen;Misshandel;Misshandel,%20grov;Mord/dråp;Mord/dråp%20försök;Motorfordon,%20anträffat%20stulet;Motorfordon,%20stöld;Narkotikabrott;Ofredande/förargelse;Olaga%20frihetsberövande/människorov;Olaga%20hot;Olaga%20intrång;Olovligkörning;Rattfylleri;Rån;Rån,%20försök;Sedlighetsbrott;Skadegörelse;Skottlossning;Skottlossning,%20misstänkt;Stöld;Stöld/inbrott;Trafikbrott;Trafikolycka,%20smitning%20från;Utlänningslagen;Vapenlagen;Våld/hot%20mot%20tjänsteman;Våldtäkt;Våldtäkt,%20försök;';

        //adress for the police api + included types
        this.url = 'https://polisen.se/api/events?type=' + this.type;
    }

    /**
     * getJson from extern link
     */
    getJson = async url => {

        let response;

        //if we dont use a url when calling this method we will be using the standard url from the contructor
        if (url) {
            //get data from link
            response = await fetch(url)
        }else{
            //get data from link
            response = await fetch(this.url)
        }

        //convert it to json
        const data = await response.json()

        return data;
    }

    /**
     * Counter animation
     */
    animateValue = (obj, start, end, duration) => {

        let startTimestamp = null;

        const step = (timestamp) => {

            if (!startTimestamp) {
                startTimestamp = timestamp;
            }

            //math
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);

            if ((progress < 1)) {
                window.requestAnimationFrame(step);
            }

        };

        window.requestAnimationFrame(step);
    }

    /**
     * Rebuild an array, create empty object, loop through the array, create object property to the empty object, fill with index if found
     */
    occurrence = array => {

        let newArray = {};

        //check if input is array.
        if (Array.isArray(array)) {

            //put all of the same name together, remake to array, return sum of all element
            newArray = Object.values(array.reduce((object, {
                type
            }) => {

                //add object with 0 as start value
                object[type] = object[type] || {
                    type,
                    count: 0
                };

                //count up if the object already been added
                object[type].count++;

                return object;

            }, Object.create(null)));

        }

        //sort array after the highest count first
        newArray.sort((a, b) => {
            return b.count - a.count;
        });

        return newArray;
    };

    /**
     * same but with change on location name from the array 
     */
    occurrence2 = array => {

        let newArray = {};

        //check if input is array.
        if (Array.isArray(array)) {

            //put all of the same name together, remake to array, return sum of all element
            newArray = Object.values(array.reduce((object, {
                location
            }) => {

                //add object with location names
                object[location.name] = object[location.name] || {
                    name: location.name,
                    count: 0
                };

                //count up if the object already been added
                object[location.name].count++;

                return object;

            }, Object.create(null)));

        }

        //sort array after by location name
        newArray.sort((a, b) => {

            let name1 = a.name.toLowerCase(),
                name2 = b.name.toLowerCase();

            if (name1 < name2) {
                return -1;
            }
            if (name1 > name2) {
                return 1;
            }
            return 0;
        });

        return newArray;
    };

    /**
     * fadeIn element if it's the view for the user
     */
    //check if elements is in users view (browser window)
    inView = el => {

        //get size of the elements relative to the viewport
        let bounding = el.getBoundingClientRect();

        //get users height and width from the browser
        let ch = document.documentElement.clientHeight;
        let cw = document.documentElement.clientWidth;

        //return the elements size, top, left, bottom and right
        return (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.bottom <= (window.innerHeight || ch) &&
            bounding.right <= (window.innerWidth || cw)
        );

    };

    /**
     * fadeIn element at scroll down 
     */
    fadeIn = el => {

        //get all elements that got box as a class inside #info
        const box = document.querySelectorAll(el);

        //loop and get all elements from info that has box as class
        box.forEach(element => {
            //if the element is in view, add class viewInfoBox else remove it
            if (this.inView(element)) {
                element.classList.add('viewElement');
            } else {
                element.classList.remove('viewElement');
            }
        });

    }

    /**
     * nav menu gets solid color at scroll down
     */
    solidNavMenu = () => {
        const scroll = window.scrollY;

        //get element that has #header in it
        const menu = document.querySelector('#header');

        //get element that has home in it
        const homeEl = document.querySelector('#home');

        //get height on the menu element
        const height = homeEl.clientHeight;

        /*if scrolling and getting past the start height of the window,
        remove the transparent on menu else add it*/
        if (scroll > height) {
            menu.classList.remove('header-transparent');
        } else {
            menu.classList.add('header-transparent');
        }
    }

    /**
     * import html files as content
     */
    importHTML = (type, link) => {
        fetch(link)
            .then(response => {
                return response.text()
            })
            .then(data => {
                document.querySelector(type).innerHTML = data;
            });
    }
}