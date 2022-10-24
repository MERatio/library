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

Book.prototype.updateRead = function () {
	this.read = !this.read;
};

function addBookToLibrary(title, author, numOfPages, read) {
	const newBook = new Book(title, author, numOfPages, read);
	library = [...library, newBook];
}

function createDomBook(book) {
	const domBook = document.createElement('article');
	domBook.classList.add('card');

	const domTitle = document.createElement('h3');
	domTitle.textContent = book.title;
	domBook.appendChild(domTitle);

	const domAuthor = document.createElement('p');
	domAuthor.textContent = `by ${book.author}`;
	domBook.appendChild(domAuthor);

	const domNumOfPages = document.createElement('p');
	domNumOfPages.classList.add('card-text');
	domNumOfPages.textContent = `${book.numOfPages} pages`;
	domBook.appendChild(domNumOfPages);

	const domReadBtn = document.createElement('button');
	domReadBtn.type = 'button';
	domReadBtn.classList.add('read-btn');
	domReadBtn.textContent = book.read ? 'read' : 'not read yet';
	domBook.appendChild(domReadBtn);

	domReadBtn.addEventListener('click', function handleReadBtnClick(event) {
		const bookIndex = Number(domBook.dataset.bookIndex);
		const book = library.find((book, index) => index === bookIndex);
		book.updateRead();
		renderLibrary(library);
	});

	const removeBookBtn = document.createElement('button');
	removeBookBtn.classList.add('remove-card-btn');
	removeBookBtn.textContent = 'Remove';
	domBook.appendChild(removeBookBtn);

	removeBookBtn.addEventListener(
		'click',
		function handleRemoveBookBtnClick(event) {
			library = library.filter(
				(book, index) => index !== Number(domBook.dataset.bookIndex)
			);

			renderLibrary(library);
		}
	);

	return domBook;
}

function renderLibrary(library) {
	dom.cards.innerHTML = '';
	for (let i = 0; i < library.length; i++) {
		const domBook = createDomBook(library[i]);
		domBook.dataset.bookIndex = i;
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
