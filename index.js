'use strict';

const books = [];

function Book(author, title, pages, read) {
	this.author = author;
	this.title = title;
	this.pages = pages;
	this.read = read;
}

function addBook(author, title, pages, read) {
	const book = new Book(author, title, pages, read);
	books.push(book);
}

function seedBooks(numOfBooks) {
	for (let i = 1; i <= numOfBooks; i++) {
		addBook(`author-${i}`, `book-${i}`, i * 100, Math.random() < 0.5);
	}
}

function renderBooks(books) {
	const bookList = document.getElementById('bookList');

	for (const book of books) {
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
		deleteBtn.classList.add(
			'absolute',
			'right-2',
			'top-1',
			'rounded',
			'px-1',
			'text-2xl',
			'before:content-["×"]',
			'hover:text-red-500',
		);
		bookDiv.appendChild(deleteBtn);

		const bookTexts = document.createElement('div');
		bookTexts.classList.add('text-center');
		bookDiv.appendChild(bookTexts);

		const title = document.createElement('h2');
		title.classList.add('text-lg');
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
}

seedBooks(10);
renderBooks(books);
