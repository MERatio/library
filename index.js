'use strict';

const addBookBtn = document.getElementById('addBookBtn');
const addBookModal = document.getElementById('addBookModal');
const closeBookModalBtn = document.getElementById('closeBookModalBtn');
const addBookForm = document.getElementById('addBookForm');
const bookList = document.getElementById('bookList');

let curId = 0;
let books = [];

function Book(title, author, pages, read) {
	this.id = curId;
	curId++;
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

function deleteBook(bookId) {
	books = books.filter((book) => book.id !== Number(bookId));
	const bookDiv = bookList.querySelector(`[data-book-id="${bookId}"]`);
	const bookDeleteBtn = bookDiv.querySelector('button.close-btn');
	bookDeleteBtn.removeEventListener('click', handleDeleteBookBtnClick);
	bookDiv.remove();
}

function handleDeleteBookBtnClick(e) {
	deleteBook(e.target.parentNode.dataset.bookId);
}

function styleBookReadBtn(book, readBtn) {
	if (book.read) {
		readBtn.textContent = 'Unread';
		readBtn.classList.remove('bg-blue-500', 'hover:bg-blue-600');
		readBtn.classList.add('bg-rose-500', 'hover:bg-rose-600');
	} else {
		readBtn.textContent = 'Read';
		readBtn.classList.remove('bg-rose-500', 'hover:bg-rose-600');
		readBtn.classList.add('bg-blue-500', 'hover:bg-blue-600');
	}
}

function changeBookReadBtn(book, readBtn) {
	book.read = !book.read;
	styleBookReadBtn(book, readBtn);
}

function renderBook(book) {
	const bookDiv = document.createElement('li');
	bookDiv.classList.add(
		'text-white',
		'relative',
		'rounded',
		'bg-stone-700',
		'px-4',
		'py-6',
		'shadow',
	);
	bookDiv.dataset.bookId = book.id;

	const deleteBtn = document.createElement('button');
	deleteBtn.setAttribute('type', 'button');
	deleteBtn.classList.add('close-btn');
	deleteBtn.addEventListener('click', handleDeleteBookBtnClick);
	bookDiv.appendChild(deleteBtn);

	const bookTexts = document.createElement('div');
	bookTexts.classList.add('text-center');
	bookDiv.appendChild(bookTexts);

	const title = document.createElement('h2');
	title.classList.add('text-lg', 'font-bold');
	title.textContent = book.title;
	bookTexts.appendChild(title);

	const author = document.createElement('p');
	author.textContent = `By ${book.author}`;
	bookTexts.appendChild(author);

	const pages = document.createElement('p');
	pages.textContent = `${book.pages} pages`;
	bookTexts.appendChild(pages);

	const readBtn = document.createElement('button');
	readBtn.setAttribute('type', 'button');
	readBtn.classList.add(
		'mt-1',
		'rounded',
		'px-4',
		'py-1',
		'font-medium',
		'text-white',
	);
	styleBookReadBtn(book, readBtn);
	readBtn.dataset.bookId = book.id;
	readBtn.addEventListener('click', (e) => {
		const readBtn = e.target;
		const bookToUpdateId = Number(readBtn.dataset.bookId);
		const bookToUpdate = books.find((book) => book.id === bookToUpdateId);
		changeBookReadBtn(bookToUpdate, readBtn);
	});
	bookTexts.appendChild(readBtn);

	bookList.appendChild(bookDiv);
}

function addBook(title, author, pages, read) {
	const book = new Book(title, author, pages, read);
	books.push(book);
	renderBook(book);
}

function seedBooks(numOfBooks) {
	for (let i = 1; i <= numOfBooks; i++) {
		addBook(`book-${i}`, `author-${i}`, i * 100, Math.random() < 0.5);
	}
}

addBookBtn.addEventListener('click', () => {
	addBookModal.showModal();
});

closeBookModalBtn.addEventListener('click', () => {
	addBookModal.close();
});

addBookForm.addEventListener('submit', (e) => {
	const addBookForm = e.currentTarget;
	const title = addBookForm.querySelector('#title').value;
	const author = addBookForm.querySelector('#author').value;
	const pages = Number(addBookForm.querySelector('#pages').value);
	const read = addBookForm.querySelector('#read').checked;
	addBook(title, author, pages, read);
	addBookForm.reset();
});

seedBooks(10);
