import express from 'express'
import { usuarioRouter } from './router/usuarios.routes.js';
import { calendariosRouter } from './router/calendarios.routes.js';
import mongoose from 'mongoose';
import { validarToken } from './utils/validador.js';

const server = express();

server.use(express.json());

server.all('/calendarios', validarToken)
server.all('/calendarios/:id', validarToken)

server.use(usuarioRouter);
server.use(calendariosRouter)

const puerto = process.env.PORT ?? 3000
server.listen(puerto, ()=>{
  console.log(`Servidor corriendo correctamente en el puerto ${puerto}`);
  mongoose.set("strictQuery",true)
  mongoose.connect(process.env.MONGO_URL)
  .then((valor)=>{
    console.log("Se conecto a la base de datos exitosamente")
  })
    .catch((error) =>{
      console.log("Error al conectarse a la base")
    })
  
})