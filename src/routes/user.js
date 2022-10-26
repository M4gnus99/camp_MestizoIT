const express = require('express');
const User = require('../models/user.js');
const router = express.Router();



//Crear usuario
router.post('/users',(req, res, next)=>{
     const user = new User(req.body);
     user.save()
         .them((data) => res.json(data))
         .catch((error)=> res.json({message: error}));
});

// // Guardar Usuario y redirecciono

// function saveUserAndRedirect(path){
//     return async(req, res)=>{
//         let user = req.user
//         // article.title = req.body.title
//         // article.description = req.body.description
//         // article.markdown = req.body.markdown
//         try{
//             article = await article.save()
//             res.redirect(`/articles/${article.slug}`)
//         }catch (e){
//             res.render(`articles/${path}`, {article: article})
//         }
//     }
// }

module.exports = router;