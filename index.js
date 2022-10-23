'use strict';

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

function addDummyBooks(count) {
	for (let i = 0; i < count; i++) {
		addBookToLibrary(`title ${i}`, `author ${i}`, 300 + i, i % 2 === 0);
	}
}

if (library.length === 0) {
	addDummyBooks(3);
}
