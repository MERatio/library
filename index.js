'use strict';

const dom = {
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

function displayBooks(books) {
  for (const book of books) {
    const domBook = document.createElement('li');
    domBook.classList.add('books-list-item');
    dom.booksList.appendChild(domBook);

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
  }
}

addBookToBooks('Atomic Habits', 'James Clear', 320, true);
addBookToBooks('A Game of Thrones', 'George R. R. Martin', 694, false);
addBookToBooks('The Lord of the Rings', 'J. R. R. Tolkien', 1077, false);

displayBooks(books);
