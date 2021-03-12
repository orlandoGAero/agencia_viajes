import { Testimonial } from '../models/Testimoniales.js';

const guardarTestimonial = async (req, res) => {
    
    const { nombre,correo,mensaje } = req.body;
    const errores = [];

    if(nombre.trim() === '') {
        errores.push({mensaje: 'El nombre esta vació'})
    }
    
    if(correo.trim() === '') {
        errores.push({mensaje: 'El correo esta vació'})
    }
    
    if(mensaje.trim() === '') {
        errores.push({mensaje: 'El mensaje esta vació'})
    }

    if(errores.length > 0) {
        const testimoniales = await Testimonial.findAll();

        res.render('testimoniales', {
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        });
    } else {
        // Almacenar en bd
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });

            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
        }
    }
}

export {
    guardarTestimonial
}