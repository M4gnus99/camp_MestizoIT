const mongoose = require('mongoose');
const {marked} = require('marked');

/*
SLUG= lo que viene desp de nuiestro dominio
ej: https://midominio.com/SLUG/ y se refiere
a una pag o publicación específica.
*/
const slugify = require('slugify');
/*
dompurify= desinfectar un fragmento de HTML,
eliminando cargas útiles XSS(cross site scripting)
*/
const createDOMPurify = require('dompurify');

const {JSDOM} = require('jsdom');
/* 
es un herramienta que nos permite recrear un DOM
dentro de un entorno en el que no contamos con un 
nevegador.
*/
const dompurify = createDOMPurify(new JSDOM().window)



const userSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        require: true,
        /* Construye indices únicos pero no
        es una validación */
        unique: true
    },
    sanitizedhtml: {
        type: String,
        require: true
    }

},{VersionKey: false}
)

// Middleware pre.()

userSchema.pre('validate', function(next){
    if (this.nickname){
        /*
        strict= elimina los caracteres especiales
        */
        this.slug = slugify(this.nickname, {replacement: '-', strict: false})
    }
    if (this.password){
        /*
        strict= elimina los caracteres especiales
        */
        this.slug = slugify(this.password, {replacement: '-', strict: false})
    }

    if (this.nickname){
        /*
        Lo que hacemos es convertir nuestro doc HTML y luego limpiar
        ese documento que le pasamos y se deshace de cualquier código 
        malisioso. 
        */
        this.sanitizedhtml = dompurify.sanitize(marked(this.nickname))
    }
    if(this.password){
        this.sanitizedhtml = dompurify.sanitize(marked(this.password))
    }
    if(this.name){
        this.sanitizedhtml = dompurify.sanitize(marked(this.name))
    }
    if(this.email){
        this.sanitizedhtml = dompurify.sanitize(marked(this.email))
    }
    next();
});

module.exports = mongoose.model('User',userSchema)