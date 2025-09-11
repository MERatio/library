'use strict';

const dom = {
  addBookBtn: document.querySelector('#addBookBtn'),
  addBookDialog: document.querySelector('#addBookDialog'),
  closeDialogBtn: document.querySelector('#closeDialogBtn'),
  addBookForm: document.querySelector('#addBookForm'),
  booksList: document.querySelector('#booksList'),
};
const books = [];

function Book(title, author, pages, haveRead) {
  if (!new.target) {
    throw new TypeError('calling Book constructor without new is invalid');
  }

  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
}

function addBookToBooks(title, author, pages, haveRead) {
  const book = new Book(title, author, pages, haveRead);
  books.push(book);
}

function createDomBook(book) {
  const domBook = document.createElement('li');
  domBook.classList.add('books-list-item');

  const domBookTitle = document.createElement('p');
  domBookTitle.classList.add('book-title');
  domBookTitle.textContent = book.title;
  domBook.appendChild(domBookTitle);

  const domBookAuthor = document.createElement('p');
  domBookAuthor.textContent = book.author;
  domBook.appendChild(domBookAuthor);

  const domBookPages = document.createElement('p');
  domBookPages.textContent = `${book.pages} pages`;
  domBook.appendChild(domBookPages);

  const domReadBookBtn = document.createElement('button');
  domReadBookBtn.classList.add('read-book-btn', 'readBookBtn');
  domReadBookBtn.setAttribute('type', 'button');
  if (book.haveRead) {
    domBook.dataset.read = 'true';
    domReadBookBtn.textContent = 'Read';
  } else {
    domBook.dataset.read = 'false';
    domReadBookBtn.textContent = 'Not read';
  }
  domBook.appendChild(domReadBookBtn);

  const domRemoveBookBtn = document.createElement('button');
  domRemoveBookBtn.classList.add('remove-book-btn', 'removeBookBtn');
  domRemoveBookBtn.setAttribute('type', 'button');
  domRemoveBookBtn.textContent = 'Remove';
  domBook.appendChild(domRemoveBookBtn);

  return domBook;
}

function clearDomBookList() {
  dom.booksList.replaceChildren();
}

function displayDomBooks(books) {
  clearDomBookList();
  for (const book of books) {
    const domBook = createDomBook(book);
    dom.booksList.appendChild(domBook);
  }
}

dom.addBookBtn.addEventListener('click', () => {
  dom.addBookDialog.showModal();
});

dom.closeDialogBtn.addEventListener('click', () => {
  dom.addBookDialog.close();
});

dom.addBookForm.addEventListener('submit', (e) => {
  const title = dom.addBookForm.querySelector('#title').value;
  const author = dom.addBookForm.querySelector('#author').value;
  const pages = parseInt(dom.addBookForm.querySelector('#pages').value);
  const haveRead = dom.addBookForm.querySelector('#haveRead').checked;
  const book = new Book(title, author, pages, haveRead);
  books.push(book);
  displayDomBooks(books);
  dom.addBookForm.reset();
});

addBookToBooks('Atomic Habits', 'James Clear', 320, true);
addBookToBooks('A Game of Thrones', 'George R. R. Martin', 694, false);
addBookToBooks('The Lord of the Rings', 'J. R. R. Tolkien', 1077, false);

displayDomBooks(books);
