
import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import fetch from 'node-fetch';

const app = express()

const corsOption = {
    origin: ['http://localhost:5173'],
    optionsSuccessStatus: 200
}
app.use(cors(corsOption))
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response) => {
    response.send('Welcome to Agent Express proxy server!')
})

app.post('/comment/:id', async (request, response) => {

    const { id } = request.params
    const comment = request.body

    console.log(comment)

    const res = await fetch(`http://frontend.test.mwanga.ng/api/v1/comments/${id}/save`, {
        method: 'post',
        body: JSON.stringify(comment),
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    console.log(data)
    response.status(201).json(data)
})


app.listen(5000, () => console.log('server is running'))