// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { getJSON } from './utils/getJSON';
const shoppingCart = [];

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
  }

  let htmlArray = filteredPersons.map(
    ({ id, title, author, description, category, price, img }) =>
      `<div class="col-lg-3 bookrow" data-id="${id}">
      <a href="#" class="img-link">
        <img class="pic" src="${img}" title="Click to see more details"/>
        </a>
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
      shoppingCart.push(book);
      showShoppingcart(shoppingCart)
    });
  }

  const imgs = document.getElementsByClassName('pic');
  for (let i = 0; i < imgs.length; i++) {
    imgs[i].addEventListener('click', (event) => {
      const bookRow = event.target.closest('.bookrow');
      const id = bookRow.getAttribute('data-id') || bookRow.id;
      const book = persons.find((person) => person.id === id);
      displayInformation(id);
    });
  }
}

//show the shopping cart
function showShoppingcart(shoppingCart) {
  const bookIds = new Set(shoppingCart.map(book => book.id));
  const bookCounts = {};
  
  bookIds.forEach(id => {
    bookCounts[id] = shoppingCart.filter(book => book.id === id).length;
  });
  
  let cartItems = '';
  
  bookIds.forEach(id => {
    const book = shoppingCart.find(book => book.id === id);
    const count = bookCounts[id];
    cartItems += `<div>${book.title} (${count}x) - ${book.price}:-</div>`;
  });

  showModal(cartItems, shoppingCart);
}


//showmodalwithshoppingcart
function showModal(cartItems) {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content">
    <div class="modal-header">
      <span class="close">&times;</span>
      <h2 class = "headtext">Your shopping cart</h2>
    </div>
    <div class="modal-body">
      <p>${cartItems}</p>
    </div>
    <div class="modal-footer">
      <h3>Total including VAT: ${cartItems.price}</h3>
    </div>
    </div>
    `;
  document.body.appendChild(modal);

  const closeButton = modal.querySelector('.close');
  closeButton.addEventListener('click', () => {
    modal.remove();
  });
  modal.style.display = 'block';
}




//showsingelbook
function displayInformation(id) {
  const correctPerson = persons.find((person) => person.id === id);
  if (!correctPerson) {
    console.log(`Could not find person with id: ${id}`);
    return;
  } 
  const html = `
    <div class="col-xxl-12" data-id="${correctPerson.id}">
      <img class="person" style = "margin-top: 100px;" src="${correctPerson.img}">
      <br></br>
      <h6 class = "titlefont">${correctPerson.title}</h6>
      <p class = "authorfont">${correctPerson.author}</p>
      <p class = "categoryfont">Category: ${correctPerson.category}</p>
      <p class = "descriptionfont">Description: ${correctPerson.description}</p>
      <p class = "pricefont">price: ${correctPerson.price}:-</p>
    </div>
  `;
  document.querySelector('.book-list').innerHTML = html;
}

start();