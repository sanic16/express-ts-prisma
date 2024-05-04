"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.createBook = exports.getBook = exports.listBooks = void 0;
const db_server_1 = require("../utils/db.server");
const listBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.book.findMany({
        select: {
            id: true,
            title: true,
            datePublished: true,
            isFiction: true,
            author: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    createdAt: true
                }
            }
        },
    });
});
exports.listBooks = listBooks;
const getBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.book.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            title: true,
            datePublished: true,
            isFiction: true,
            author: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    createdAt: true
                }
            }
        }
    });
});
exports.getBook = getBook;
const createBook = (book, authorId) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, datePublished, isFiction, } = book;
    return db_server_1.db.book.create({
        data: {
            title,
            datePublished,
            isFiction,
            authorId
        },
        select: {
            id: true,
            title: true,
            isFiction: true,
            datePublished: true,
            author: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    createdAt: true
                }
            }
        }
    });
});
exports.createBook = createBook;
const updateBook = (book, id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.book.update({
        where: {
            id
        },
        data: book,
        select: {
            id: true,
            title: true,
            datePublished: true,
            isFiction: true,
            author: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    createdAt: true
                }
            }
        }
    });
});
exports.updateBook = updateBook;
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_server_1.db.book.delete({
        where: {
            id
        }
    });
});
exports.deleteBook = deleteBook;
