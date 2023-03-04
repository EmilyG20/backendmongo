import jwt from "jsonwebtoken";
import { UsuarioModel } from "../models/usuario.model.js";

export const validarToken = async(req,res,next) => {
  // primero validamos si estan pasando las cabeceras
  if (!req.headers.authorization){
    return res.status(401).json({
      message:"Se necesita una token para realizar esta petición"
    });
  }
  // Bearer xxxxx.xxxxx.xxxx
  // ['Bearer', 'xxxxx.xxxxx.xxxx']
  const token = req.headers.authorization.split(" ")[1];

  if (!token){
    return res.status(401).json({
      message: "Formato de token invalido, debe ser en el formato Bearer <tu_token>"
    })
  }
  try {
    // si la token es valida entonces retorna el payload sino bota error
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY)
    console.log(payload);
    const usuario= await UsuarioModel.findOne({correo:payload.correo})
    // si todo esta bien le indicaremos que pase al siguiente controlador
    if (!usuario){
      return res.json({
        message: "El usuario no tiene permisos para realizar esta accion"
      })
    }
    req.user = usuario
    next()
  }
  catch (error) {
    return res.status(401).json({
      message: "Error en la token",
      content: error.message
    })
  }
}