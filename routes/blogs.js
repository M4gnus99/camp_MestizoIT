const express = require('express')
const Blog = require('../models/blog')
const router = express.Router()

// Obtenemos Nuevo Blog
router.get('/new', (req, res)=>{
    res.render('blogs/new', {blog: new Blog()})
})

// Obtenemos el Blog a editar
router.get('/edit/:id', async(req, res)=>{
    const blog = await Blog.findById(req.params.id)
    res.render('blogs/edit', {blog: blog})
})

// Crear Nuevo Blog
router.post('/', async(req, res, next)=>{
    req.blog = new Blog()
    next()
},saveBlogAndRedirect('new'))


// Obtener el Blog x Slug
router.get('/:slug', async(req, res)=>{
    const blog = await Blog.findOne({slug: req.params.slug})
    if(blog== null)res.redirect('/')
    res.render('blogs/show', {blog: blog})
})

// Editar Blog x ID
router.put('/:id', async(req, res, next)=>{
    req.blog = await Blog.findById(req.params.id)
    next()
}, saveBlogAndRedirect('edit'))


// Guardar Blog y redirecciono

function saveBlogAndRedirect(path){
    return async(req, res)=>{
        let blog = req.blog
        blog.title = req.body.title
        blog.description = req.body.description
        blog.content = req.body.content
        try{
            blog = await blog.save()
            res.redirect(`/blogs/${blog.slug}`)
        }catch (e){
            res.render(`blogs/${path}`, {blog: blog})
        }
    }
}


module.exports = router;