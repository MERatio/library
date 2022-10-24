'use strict';

const dom = {
	cards: document.querySelector('.js-cards'),
	openModalBtn: document.querySelector('.js-open-modal-btn'),
	modal: document.querySelector('.js-modal'),
	closeModalBtn: document.querySelector('.js-close-modal-btn'),
	bookForm: document.querySelector('.js-book-form'),
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

	const domTitle = document.createElement('h3');
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
	dom.cards.innerHTML = '';
	for (const book of library) {
		const domBook = createDomBook(book);
		dom.cards.appendChild(domBook);
	}
}

function handleOpenModalClick() {
	dom.modal.classList.add('active');
	dom.bookForm.elements[0].focus();
}

function handleCloseModalClick() {
	dom.modal.classList.remove('active');
	dom.bookForm.reset();
}

function handleModalClick(event) {
	if (event.target === dom.modal) {
		handleCloseModalClick();
	}
}

function handleBookFormSubmit(event) {
	event.preventDefault();
	const bookProps = {};
	for (const element of event.target.elements) {
		if (element.nodeName === 'INPUT') {
			if (element.type === 'checkbox') {
				bookProps[element.name] = element.checked;
			} else {
				bookProps[element.name] = element.value;
			}
		}
	}

	const { title, author, numOfPages, read } = bookProps;
	addBookToLibrary(title, author, numOfPages, read);
	renderLibrary(library);
	handleCloseModalClick();
}

function addDummyBooks(count) {
	for (let i = 0; i < count; i++) {
		addBookToLibrary(`title ${i}`, `author ${i}`, 300 + i, i % 2 === 0);
	}
}

window.addEventListener('DOMContentLoaded', () => {
	if (library.length === 0) {
		addDummyBooks(5);
		renderLibrary(library);
	}

	dom.openModalBtn.addEventListener('click', handleOpenModalClick);

	dom.closeModalBtn.addEventListener('click', handleCloseModalClick);

	dom.modal.addEventListener('click', handleModalClick);

	dom.bookForm.addEventListener('submit', handleBookFormSubmit);
});
