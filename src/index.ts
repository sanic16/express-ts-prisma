import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

import { authorRouter } from './author/author.router'
import { bookRouter } from './book/book.router'

dotenv.config()

if(!process.env.PORT){
    process.exit(1)
}

const PORT: number = +process.env.PORT || 8000

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (_req, res) => {
    res.json({
        message: 'Hello World!'
    })
})

app.use('/api/authors', authorRouter)
app.use('/api/books', bookRouter)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
