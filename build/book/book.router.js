"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = exports.bookRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const BookService = __importStar(require("./book.service"));
exports.BookService = BookService;
exports.bookRouter = express_1.default.Router();
// GET: List all the books
exports.bookRouter.get('/', (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield BookService.listBooks();
        return response.status(200).json(books);
    }
    catch (error) {
        return response.status(500).json(error.message);
    }
}));
// GET: A single book by ID
exports.bookRouter.get('/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +request.params.id;
    if (!id || isNaN(id)) {
        return response.status(400).json("Invalid ID");
    }
    try {
        const book = yield BookService.getBook(id);
        if (book) {
            return response.status(200).json(book);
        }
        return response.status(404).json("Book could not be found");
    }
    catch (error) {
        console.error(error);
        return response.status(500).json(error.message);
    }
}));
// POST: Create a new book
exports.bookRouter.post('', (0, express_validator_1.body)("title").isString(), (0, express_validator_1.body)("datePublished").isString(), (0, express_validator_1.body)("isFiction").isBoolean(), (0, express_validator_1.body)("authorId").isNumeric(), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({
            errors: errors.array()
        });
    }
    try {
        const data = Object.assign(Object.assign({}, request.body), { datePublished: new Date(request.body.datePublished) });
        const book = {
            title: data.title,
            datePublished: data.datePublished,
            isFiction: data.isFiction
        };
        const id = data.authorId;
        const newBook = yield BookService.createBook(book, id);
        if (newBook) {
            return response.status(201).json(newBook);
        }
        return response.status(404).json("Author not found");
    }
    catch (error) {
        return response.status(500).json(error.message);
    }
}));
// PUT: Update an existing book
// Params: title, datePublished, isFiction
exports.bookRouter.put("/:id", (0, express_validator_1.body)("title").isString(), (0, express_validator_1.body)("datePublished").isString(), (0, express_validator_1.body)("isFiction").isBoolean(), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    if (!request.params.id || isNaN(+request.params.id)) {
        return response.status(400).json("Invalid ID");
    }
    const id = +request.params.id;
    try {
        const book = Object.assign(Object.assign({}, request.body), { datePublished: new Date(request.body.datePublished) });
        const updatedBook = yield BookService.updateBook(book, id);
        if (updatedBook) {
            return response.status(200).json(updatedBook);
        }
        return response.status(404).json("Book not found");
    }
    catch (error) {
        return response.status(500).json(error.message);
    }
}));
// DELETE: Delete an existing book
exports.bookRouter.delete('/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (!request.params.id || isNaN(+request.params.id)) {
        return response.status(400).json("Invalid ID");
    }
    const id = +request.params.id;
    try {
        if (!(yield BookService.getBook(id))) {
            return response.status(404).json({
                error: "Book not found"
            });
        }
        yield BookService.deleteBook(id);
        return response.status(204).json({
            message: "Book deleted"
        });
    }
    catch (error) {
        return response.status(500).json(error.message);
    }
}));
