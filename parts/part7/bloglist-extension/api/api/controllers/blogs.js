const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor, tokenExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (req, res, next) => {
    try {
        const blogs = await Blog
            .find({})
            .populate('user', {
                name: 1,
                username: 1
            })
        res.send(blogs)
    } catch (error) {
        next(error)
    }
})

blogsRouter.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id

        const blog = await Blog.findById(id)
        res.send(blog)
    } catch (error) {
        next(error)
    }
})

blogsRouter.post('/', tokenExtractor, userExtractor, async (req, res, next) => {
    try {
        const { id: userId } = req.user
        if (!userId) {
            return res.status(401).send({ "error": "invalid token" })
        }
        const user = await User.findById(userId)

        const blog = new Blog({
            ...req.body,
            user: user.id
        })

        const newEntry = await blog.save()
        user.blogs = user.blogs.concat(newEntry._id)
        user.save()

        const newBlog = await Blog
            .findById(newEntry.id)
            .populate('user', {
                name: 1,
                username: 1
            })

        res.status(201).send(newBlog).end()
    } catch (error) {
        next(error)
    }
})

blogsRouter.put('/:id/comments', async (req, res, next) => {
    try {
        const { id } = req.params
        const blog = req.body

        const updatedBlog = await Blog
            .findByIdAndUpdate(id, blog, { new: true })
            .populate('user', {
                name: 1,
                username: 1
            })

        res.send(updatedBlog)
    } catch (error) {
        next(error)
    }
})

blogsRouter.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        console.log(id)
        const blog = req.body

        const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
        res.send(updatedBlog)
    } catch (error) {
        next(error)
    }
})

blogsRouter.delete('/:id', tokenExtractor, userExtractor, async (req, res, next) => {
    try {
        const { id: userId } = req.user

        if (!userId) {
            return res
                .status(401)
                .send({ "error": "invalid token" })
                .end()
        }

        const { id } = req.params
        const blog = await Blog.findById(id)

        if (userId !== blog.user.toString()) {
            return res
                .status(401)
                .send({
                    "error": "only the creator of the blog can delete it"
                })
        }

        await Blog.findByIdAndDelete(blog.id)
        res.status(204).end()
    } catch (error) {
        next(error)
    }
})

module.exports = blogsRouter
