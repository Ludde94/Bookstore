// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { getJSON } from './utils/getJSON';


let persons,

    chosenHobbyFilter = 'all',

    chosenSortOption,

    hobbies = [];


async function start() {

    persons = await getJSON('/public/books.json');

    displayPersons();

}



function displayPersons() {

    // filter according to hobby and call displayPersons

    let filteredPersons = persons.filter(

        ({ hobby }) => chosenHobbyFilter === 'all'

            || chosenHobbyFilter === hobby

    );

    if (chosenSortOption === 'Last name') { sortByLastName(filteredPersons); }

    if (chosenSortOption === 'Age') { sortByAge(filteredPersons); }

    let htmlArray = filteredPersons.map(({

        id, title, author, description, category, price

    }) => /*html*/
    

  '<h1>hejsan</h1>'
  
  )

    document.querySelector('.book-list').innerHTML = htmlArray.join('');

}


start();