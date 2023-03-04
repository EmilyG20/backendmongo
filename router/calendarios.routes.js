import { Router } from "express"
import * as calendariosController from "../controllers/calendarios.controllers.js"

export const calendariosRouter = Router()

//primera forma   se usaCUANDO LAS RUTAS Y MIDDLEWARE SON DIFERENTES
// calendariosRouter.get("/calendarios",validarToken,calendariosController.devolverCalendarios)
// calendariosRouter.post("/calendarios",validarToken,calendariosController.crearCalendarios)

// en todos los metodos del calendario de la misma ruta se que voy a utilizar un middleware en comun
calendariosRouter
.route('/calendarios')
.post(calendariosController.crearCalendario)
.get(calendariosController.devolverCalendarios)


// en esta forma tambien se rerpite middleware y se tiene que configurar por cada metodo http de manera independiente
// calendariosRouter.route('/calendarios')
// .post(validarToken, calendariosController.crearCalendario)
// .get(validarToken, calendariosController.devolverCalendarios)

calendariosRouter
.route('/calendario/:id')
.put(calendariosController.actualizarCalendario)
.delete(calendariosController.eliminarCalendario)