import { db } from '../src/utils/db.server'

type Author = {
    firstName: string
    lastName: string
}

type Book = {
    title: string
    isFiction: boolean
    datePublished: Date
}

const getAuthors = (): Array<Author> => {
    return [
        {
            firstName: 'Julio Rubén',
            lastName: 'Sanic Martínez'
        },
        {
            firstName: 'Angela Beatríz',
            lastName: 'Canel Hernández'
        },
        {
            firstName: 'Luisa Fernanda',
            lastName: 'Santos'
        },
        {
            firstName: 'José Luis',
            lastName: 'González'
        }
    ]
}

const getBooks = (): Array<Book> => {
    return [
        {
            title: 'El arte del engaño',
            isFiction: false,
            datePublished: new Date('2021-06-08')
        },
        {
            title: 'El amor en tiempos de pandemia',
            isFiction: true,
            datePublished: new Date('2021-06-08')
        },
        {
            title: 'La guerra de los mundos',
            isFiction: true,
            datePublished: new Date('2022-06-08')
        }
    ]
}

const seed = async() => {
    await Promise.all(
        getAuthors().map(author => {
            return db.author.create({
                data: {
                    firstName: author.firstName,
                    lastName: author.lastName
                }
            })
        })
    )
    const author = await db.author.findFirst({
        where: {
            firstName: 'Julio Rubén',            
        }
    })
    if(author){
        await Promise.all(
            getBooks().map(book => {
                return db.book.create({
                    data: {
                        title: book.title,
                        isFiction: book.isFiction,
                        datePublished: book.datePublished,
                        authorId: author.id
                    }
                })
            })
        )
    }
}

seed()
.then(() => {
    console.log('Seed completed')
    process.exit(0)
})
.catch((error) => {
    console.error(error)
    process.exit(0)
})