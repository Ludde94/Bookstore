// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { getJSON } from './utils/getJSON';
const shoppingCart = [];

let Books,
    chosenHobbyFilter = 'all',
    chosenSortOption,
    hobbies = [];

async function start() {
    Books = await getJSON('/books.json');
    displayBook();
    
}

function displayBook() {
  let filteredBooks = Books.filter(
    ({ hobby }) =>
      chosenHobbyFilter === 'all' || chosenHobbyFilter === hobby
  );

  if (chosenSortOption === 'Last name') {
    sortByLastName(filteredBooks);
  }
  if (chosenSortOption === 'Age') {
    sortByAge(filteredBooks);
  }

  let htmlArray = filteredBooks.map(
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
      const book = Books.find((book) => book.id === id); 
      shoppingCart.push(book);
      showShoppingcart(shoppingCart)
    });
  }

  const imgs = document.getElementsByClassName('pic');
  for (let i = 0; i < imgs.length; i++) {
    imgs[i].addEventListener('click', (event) => {
      const bookRow = event.target.closest('.bookrow');
      const id = bookRow.getAttribute('data-id') || bookRow.id;
      const book = Books.find((book) => book.id === id);
      displayInformation(id);
    });
  }
}

//show the shopping cart
function showShoppingcart(shoppingCart) {
  const bookIds = new Set(shoppingCart.map(book => book.id));
  const bookCounts = {};
  let totalPrice = 0;
  bookIds.forEach(id => {
    bookCounts[id] = shoppingCart.filter(book => book.id === id).length;
  });
  
  let cartItems = '';
  bookIds.forEach(id => {
    const book = shoppingCart.find(book => book.id === id);
    const count = bookCounts[id];
    totalPrice += count * book.price;
    cartItems += `<div>${book.title} (${count}x) - ${book.price}:-</div>`;
  });

  showModal(cartItems, shoppingCart, totalPrice);
}


//showmodalwithshoppingcart
function showModal(cartItems,shoppingCart,totalPrice) {
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
      <h3>Total including VAT: ${totalPrice}</h3>
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
  const correctBook = Books.find((Books) => Books.id === id);
  if (!correctBook) {
    console.log(`Could not find Book with id: ${id}`);
    return;
  } 
  const html = `
    <div class="col-xxl-12" data-id="${correctBook.id}">
      <img class="book" style = "margin-top: 100px;" src="${correctBook.img}">
      <br></br>
      <h6 class = "titlefont">${correctBook.title}</h6>
      <p class = "authorfont">${correctBook.author}</p>
      <p class = "categoryfont">Category: ${correctBook.category}</p>
      <p class = "descriptionfont">Description: ${correctBook.description}</p>
      <p class = "pricefont">price: ${correctBook.price}:-</p>
    </div>
  `;
  document.querySelector('.book-list').innerHTML = html;
}

start();