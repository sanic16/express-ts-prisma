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
exports.deleteAuthor = exports.updateAuthor = exports.createAuthor = exports.getAuthor = exports.listAuthors = void 0;
const db_server_1 = require("../utils/db.server");
const listAuthors = () => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.author.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            createdAt: true
        }
    });
});
exports.listAuthors = listAuthors;
const getAuthor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.author.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            createdAt: true
        }
    });
});
exports.getAuthor = getAuthor;
const createAuthor = (author) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName } = author;
    return db_server_1.db.author.create({
        data: {
            firstName,
            lastName
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            createdAt: true
        }
    });
});
exports.createAuthor = createAuthor;
const updateAuthor = (author, id) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName } = author;
    return db_server_1.db.author.update({
        where: {
            id
        },
        data: {
            firstName,
            lastName
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            createdAt: true
        }
    });
});
exports.updateAuthor = updateAuthor;
const deleteAuthor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_server_1.db.author.delete({
        where: {
            id
        }
    });
});
exports.deleteAuthor = deleteAuthor;
