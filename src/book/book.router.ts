import express from 'express'
import type { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import * as BookService from './book.service'

export const bookRouter = express.Router()

// GET: List all the books
bookRouter.get('/', async(_request: Request, response: Response) => {
    try {
        const books = await BookService.listBooks()
        return response.status(200).json(books)
    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})


// GET: A single book by ID
bookRouter.get('/:id', async(request: Request, response: Response) => {
    const id: number = +request.params.id
    if(!id || isNaN(id)){
        return response.status(400).json("Invalid ID")
    }
    try {
        const book = await BookService.getBook(id)
        if(book){
            return response.status(200).json(book)
        }
        return response.status(404).json("Book could not be found")
    } catch (error: any) {
        console.error(error)
        return response.status(500).json(error.message)
    }
})

// POST: Create a new book
bookRouter.post(
    '', 
    body("title").isString(),
    body("datePublished").isString(),
    body("isFiction").isBoolean(),
    body("authorId").isNumeric(),
    async(request: Request, response: Response) => {
        const errors = validationResult(request)
        if(!errors.isEmpty()){
            return response.status(400).json({
                errors: errors.array()
            })
        }        

        try {
            const data = {...request.body, datePublished: new Date(request.body.datePublished)}
            const book = {
                title: data.title,
                datePublished: data.datePublished,
                isFiction: data.isFiction
            }
            const id: number = data.authorId
            const newBook = await BookService.createBook(book, id)
            if(newBook){
                return response.status(201).json(newBook)
            }
            return response.status(404).json("Author not found")
        } catch (error: any) {
            return response.status(500).json(error.message)
        }

    })

// PUT: Update an existing book
// Params: title, datePublished, isFiction
bookRouter.put(
    "/:id",
    body("title").isString(),
    body("datePublished").isString(),
    body("isFiction").isBoolean(),
    async(request: Request, response: Response) => {
        const errors = validationResult(request)
        if(!errors.isEmpty()){
            return response.status(400).json({ errors: errors.array() })
        }
        if(!request.params.id || isNaN(+request.params.id)){
            return response.status(400).json("Invalid ID")
        }
        const id: number = +request.params.id

        try {
            const book = {...request.body, datePublished: new Date(request.body.datePublished)}
            const updatedBook = await BookService.updateBook(book, id)
            if(updatedBook){
                return response.status(200).json(updatedBook)
            }
            return response.status(404).json("Book not found")
        } catch (error: any) {
            return response.status(500).json(error.message)
        }
    }
)

// DELETE: Delete an existing book
bookRouter.delete('/:id', async(request: Request, response: Response) => {
    if(!request.params.id || isNaN(+request.params.id)){
        return response.status(400).json("Invalid ID")
    }
    const id: number = +request.params.id
    try {
        if(!await BookService.getBook(id)){
            return response.status(404).json({
                error: "Book not found"
            })
        }
        await BookService.deleteBook(id)
        return response.status(204).json({
            message: "Book deleted"
        })
    } catch (error: any) {
        return response.status(500).json(error.message)
    }
})


export { BookService }
