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
    persons = await getJSON('/books.json');
    displayPersons();
}

function displayPersons() {
    // filter according to hobby and call displayPersons
    let filteredPersons = persons.filter(
      ({ hobby }) =>
        chosenHobbyFilter === 'all' || chosenHobbyFilter === hobby
    );
  
    if (chosenSortOption === 'Last name') {
      sortByLastName(filteredPersons);
    }
    if (chosenSortOption === 'Age') {
      sortByAge(filteredPersons);
    } // WTF IS THIS?
  
    let htmlArray = filteredPersons.map(
      ({ id, title, author, description, category, price, img }) =>
        `<div class="col-lg-3 bookrow" data-id="${id}">
          <a href="#" class="img-link" data-description="${description}">
          <img class="pic" src="${img}" title="Click to see more details"/></a>
           <h6>${title}</h6>
           <p>${author}</p>
           <button class="btn btn-success button"><p>${price}:-</p>
           </button>
         </div>`
    );
  
    document.querySelector('.book-list').innerHTML = htmlArray.join('');
  
    const buttons = document.getElementsByClassName('button');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', (event) => {
        const bookRow = event.target.closest('.bookrow');
        const id = bookRow.getAttribute('data-id') || bookRow.id;
        const book = persons.find((person) => person.id === id);
        alert(`You clicked a button with ID: ${id}`); 
        //addToCart(id)
      });
    }}



    

let getPersonsById = async eventId => {
  /*const book = persons.find((person) => person.id === eventId);
  return book;*/
  alert(`You clicked a button with ID: ${eventId}`); 
}

document.getElementById('checkoutbutton').addEventListener("click", getPersonsById)

start();