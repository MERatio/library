'use strict';

const dom = {
	cards: document.querySelector('.js-cards'),
};

let library = [];

function Book(title, author, numOfPages, read) {
	this.title = title;
	this.author = author;
	this.numOfPages = numOfPages;
	this.read = read;
}

function addBookToLibrary(title, author, numOfPages, read) {
	const newBook = new Book(title, author, numOfPages, read);
	library = [...library, newBook];
}

function createDomBook(book) {
	const domBook = document.createElement('article');
	domBook.classList.add('card');

	const domTitle = document.createElement('h2');
	domTitle.classList.add('card-title');
	domTitle.textContent = book.title;
	domBook.appendChild(domTitle);

	const domAuthor = document.createElement('p');
	domAuthor.classList.add('card-text');
	domAuthor.textContent = `by ${book.author}`;
	domBook.appendChild(domAuthor);

	const domNumOfPages = document.createElement('p');
	domNumOfPages.classList.add('card-text');
	domNumOfPages.textContent = `${book.numOfPages} pages`;
	domBook.appendChild(domNumOfPages);

	const domRead = document.createElement('p');
	domRead.classList.add('card-text');
	domRead.textContent = book.read ? 'read' : 'not read yet';
	domBook.appendChild(domRead);

	return domBook;
}

function renderLibrary(library) {
	for (const book of library) {
		const domBook = createDomBook(book);
		dom.cards.appendChild(domBook);
	}
}

function addDummyBooks(count) {
	for (let i = 0; i < count; i++) {
		addBookToLibrary(`title ${i}`, `author ${i}`, 300 + i, i % 2 === 0);
	}
}

if (library.length === 0) {
	addDummyBooks(5);
	renderLibrary(library);
}
