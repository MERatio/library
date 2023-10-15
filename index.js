'use strict';

const addBookBtn = document.getElementById('addBookBtn');
const addBookModal = document.getElementById('addBookModal');
const closeBookModalBtn = document.getElementById('closeBookModalBtn');
const addBookForm = document.getElementById('addBookForm');

const books = [];

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

function renderBook(book) {
	const bookList = document.getElementById('bookList');

	const bookDiv = document.createElement('li');
	bookDiv.classList.add(
		'relative',
		'rounded',
		'bg-gradient-to-r',
		'px-4',
		'py-6',
		'shadow',
	);
	if (book.read) {
		bookDiv.classList.add('from-blue-300', 'to-blue-200');
	} else {
		bookDiv.classList.add('from-red-300', 'to-red-200');
	}

	const deleteBtn = document.createElement('button');
	deleteBtn.setAttribute('type', 'button');
	deleteBtn.classList.add('close-btn');
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
		'bg-blue-500',
		'px-4',
		'py-1',
		'font-medium',
		'text-white',
		'hover:bg-blue-600',
	);
	readBtn.textContent = book.read ? 'Unread' : 'Read';
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
	const pages = addBookForm.querySelector('#pages').value;
	const read = addBookForm.querySelector('#read').checked;
	addBook(title, author, pages, read);
	addBookForm.reset();
});

seedBooks(10);
