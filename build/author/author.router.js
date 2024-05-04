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
exports.authorRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const AuthorService = __importStar(require("./author.service"));
exports.authorRouter = express_1.default.Router();
// GET: LIst of all authors
exports.authorRouter.get('/', (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authors = yield AuthorService.listAuthors();
        return response.status(200).json(authors);
    }
    catch (error) {
        return response.status(500).json(error.message);
    }
}));
// GET: A single author by ID
exports.authorRouter.get('/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(request.params.id, 10);
    try {
        const author = yield AuthorService.getAuthor(id);
        if (author) {
            return response.status(200).json(author);
        }
        return response.status(404).json("Author could not be found");
    }
    catch (error) {
        return response.status(500).json(error.message);
    }
}));
// POST: Create a new author
// Params: firstName, lastName
exports.authorRouter.post('/', (0, express_validator_1.body)("firstName").isString(), (0, express_validator_1.body)("lastName").isString(), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    try {
        const author = request.body;
        const newAuthor = yield AuthorService.createAuthor(author);
        return response.status(201).json(newAuthor);
    }
    catch (error) {
        return response.status(500).json(error.message);
    }
}));
// PUT: Update an existing author
// Params: firstName, lastName
exports.authorRouter.put("/:id", (0, express_validator_1.body)("firstName").isString(), (0, express_validator_1.body)("lastName").isString(), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    const id = parseInt(request.params.id, 10);
    try {
        const author = request.body;
        const updatedAuthor = yield AuthorService.updateAuthor(author, id);
        return response.status(200).json(updatedAuthor);
    }
    catch (error) {
        return response.status(500).json(error.message);
    }
}));
// DELETE: Delete an existing author
exports.authorRouter.delete('/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +request.params.id;
    if (!id || isNaN(id)) {
        return response.status(400).json("Invalid ID");
    }
    const author = yield AuthorService.getAuthor(id);
    if (!author) {
        return response.status(404).json({
            message: "Author not found"
        });
    }
    try {
        yield AuthorService.deleteAuthor(id);
        return response.status(204).end();
    }
    catch (error) {
        return response.status(500).json(error.message);
    }
}));
