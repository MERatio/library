'use strict';

const dom = {
  addBookBtn: document.querySelector('#addBookBtn'),
  addBookDialog: document.querySelector('#addBookDialog'),
  closeDialogBtn: document.querySelector('#closeDialogBtn'),
  addBookForm: document.querySelector('#addBookForm'),
  booksList: document.querySelector('#booksList'),
};

class Book {
  static #books = [];

  constructor(title, author, pages, haveRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
  }

  changeHaveRead() {
    this.haveRead = !this.haveRead;
  }

  static addBookToBooks(title, author, pages, haveRead) {
    const book = new Book(title, author, pages, haveRead);
    this.#books.push(book);
  }

  static createDomBook(book) {
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
    domReadBookBtn.dataset.bookId = book.id;
    if (book.haveRead) {
      domBook.dataset.read = 'true';
      domReadBookBtn.textContent = 'Read';
    } else {
      domBook.dataset.read = 'false';
      domReadBookBtn.textContent = 'Not read';
    }
    domReadBookBtn.addEventListener('click', (e) => {
      const bookId = e.currentTarget.dataset.bookId;
      const book = this.#books.find((book) => book.id === bookId);
      book.changeHaveRead();
      this.displayDomBooks();
    });
    domBook.appendChild(domReadBookBtn);

    const domRemoveBookBtn = document.createElement('button');
    domRemoveBookBtn.classList.add('remove-book-btn', 'removeBookBtn');
    domRemoveBookBtn.setAttribute('type', 'button');
    domRemoveBookBtn.dataset.bookId = book.id;
    domRemoveBookBtn.textContent = 'Remove';
    domRemoveBookBtn.addEventListener('click', (e) => {
      const bookId = e.currentTarget.dataset.bookId;
      const bookIndex = this.#books.findIndex((book) => book.id === bookId);
      this.#books.splice(bookIndex, 1);
      this.displayDomBooks();
    });
    domBook.appendChild(domRemoveBookBtn);

    return domBook;
  }

  static displayDomBooks() {
    dom.booksList.replaceChildren();
    for (const book of this.#books) {
      const domBook = Book.createDomBook(book);
      dom.booksList.appendChild(domBook);
    }
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
  Book.addBookToBooks(title, author, pages, haveRead);
  Book.displayDomBooks();
  dom.addBookForm.reset();
});

Book.addBookToBooks('Atomic Habits', 'James Clear', 320, true);
Book.addBookToBooks('A Game of Thrones', 'George R. R. Martin', 694, false);
Book.addBookToBooks('The Lord of the Rings', 'J. R. R. Tolkien', 1077, false);

Book.displayDomBooks();
