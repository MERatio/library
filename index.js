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

seedBooks(10);
