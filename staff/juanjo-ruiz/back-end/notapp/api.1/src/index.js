const express = require('express')
const { mongoose: { connect } } = require('data')
const cors = require('./cors')
const { registerUser,
    authenticateUser,
    retrieveUser,
    updateUser,
    deleteUser,
    createNote,
    updateNote,
    deleteNote,
    retrieveNotes,
     } = require('logic')


connect('mongodb://localhost:27017/notapp')
    .then(() => {
        console.log('db connected to db')

        const api = express()

        api.use('*', cors)

        const router = express.Router()

        const jsonBodyParser = express.json()


        router.post('/users', jsonBodyParser, (req, res) => {
            try {
                const { body: { name, email, password } } = req

                registerUser(name, email, password)
                    .then(() => res.status(201).send())
                    .catch(error => res.status(400).json({ error: error.message }))

            } catch (error) {
                res.status(400).json({ error: error.message })
            }
        })

        router.post('/users/auth', jsonBodyParser, (req, res) => {
            try {
                const { body: { email, password } } = req

                authenticateUser(email, password)
                    .then(userId => res.status(200).json({ userId }))
                    .catch(error => res.status(400).json({ error: error.message }))
            } catch (error) {
                res.status(400).json({ error: error.message })
            }
        })

        router.get('/users', (req, res) => {
            try {
                const { headers: { authorization } } = req

                const [, userId] = authorization.split(' ')

                retrieveUser(userId)
                    .then(user => res.json(user))
                    .catch(error => res.status(400).json({ error: error.message }))
            } catch (error) {
                res.status(400).json({ error: error.message })
            }
        })

        router.patch('/users', jsonBodyParser, (req, res) => {
            try {
                const { headers: { authorization }, body: { name, email, password } } = req

                const [, userId] = authorization.split(' ')

                updateUser(userId, name, email, password)
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).json({ error: error.message }))
            } catch (error) {
                res.status(400).json({ error: error.message })
            }
        })

        router.delete('/users', jsonBodyParser, (req, res) => {
            try {
                const { headers: { authorization }, body: { password } } = req

                const [, userId] = authorization.split(' ')

                deleteUser(userId, password)
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).json({ error: error.message }))
            } catch (error) {
                res.status(400).json({ error: error.message })
            }
        })

        router.post('/notes', jsonBodyParser, (req, res) => {
            try {
                const { headers: { authorization }, body: { text, color, public } } = req

                const [, userId] = authorization.splic(' ')

                createNote(userId, text, color, public)
                    .then(() => res.status(201).send())
                    .catch(error => res.status(400).json({ error: error.message }))
            } catch (error) {
                res.status(400).json({ error: error.message })
            }
        })

        router.patch('/notes/:noteId', jsonBodyParser, (req, res) => {
            try {
                const { headers: { authorization }, params: { noteId }, body: { text, color, public } } = req

                const [, userId] = authorization.split(' ')

                updateNote(userId, noteId, text, color, public)
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).json({ error: error.message }))
            } catch (error) {
                res.status(400).json({ error: error.message })
            }
        })

        router.delete('/notes/:noteId', jsonBodyParser, (req, res) => {
            try {
                const { headers: { authorization }, params: { noteId } } = req

                const [, userId] = authorization.split(' ')

                deleteNote(userId, noteId)
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).json({ error: error.message }))
            } catch (error) {
                res.status(400).json({ error: error.message })
            }
        })

        router.get('/notes', jsonBodyParser, (req, res) => {
            try {
                const { headers: { authorization } } = req

                const [, userId] = authorization.split(' ')

                retrieveNotes(userId, userId)
                    .then(notes => res.status(200).json(notes))
                    .catch(error => res.status(400).json({ error: error.message }))
            } catch (error) {
                res.status(400).json({ error: error.message })
            }
        })

        router.get('/users/:ownerId/notes', jsonBodyParser, (req, res) => {
            try {
                const { headers: { authorization }, params: { ownerId } } = req

                const [, userId] = authorization.split(' ')

                retrieveNotes(userId, ownerId)
                    .then(notes => res.status(200).json(notes))
                    .catch(error => res.status(400).json({ error: error.message }))
            } catch (error) {
                res.status(400).json({ error: error.message })
            }
        })

        api.use('/api', router)

        api.listen(8080, () => console.log('server running'))

    }) 