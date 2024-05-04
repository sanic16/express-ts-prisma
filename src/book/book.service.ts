import { Author } from "../author/author.service";
import { db } from "../utils/db.server";

type BookRead = {
    id: number
    title: string
    datePublished: Date
    isFiction: boolean
    // authorId: number
    author: Author

}

type BookWrite = {
    title: string
    datePublished: Date
    isFiction: boolean
}

export const listBooks = async(): Promise<BookRead[]> => {
    return db.book.findMany({
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
        
    })
} 

export const getBook = async(id: number): Promise<BookRead | null> => {
    return db.book.findUnique({
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
    })
}

export const createBook = async(book: BookWrite, authorId: number): Promise<BookRead> => {
    const {
        title,
        datePublished,
        isFiction,
    } = book

    return db.book.create({
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
    })
} 

export const updateBook = async(book: BookWrite, id: number): Promise<BookRead> => {
    return db.book.update({
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
    })
}

export const deleteBook = async(id: number): Promise<void> => {
    await db.book.delete({
        where: {
            id
        }
    })
}