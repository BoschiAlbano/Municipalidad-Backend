import { getConnection, sql } from "../database/connection";
import Jwt from "jsonwebtoken";

// export default async (req, res, next) => {
//     const { token } = req.cookies;

//     // Verificar si el token existe
//     if (!token) {
//         return res
//             .status(401)
//             .json({ message: "Acceso no autorizado. Token no proporcionado." });
//     }

//     try {
//         // Verificar y decodificar el token
//         const decodedToken = Jwt.verify(token, process.env.ClaveSecretaJWT);

//         if (!decodedToken.id) {
//             throw new Error(
//                 "No se ha proporcionado un ID de usuario válido en la cookie."
//             );
//         }

//         req.userId = decodedToken.id;
//         return next();
//     } catch (error) {
//         next(error);
//     }
// };

export default async (req, res, next) => {
    try {
        //#region Usando JWT
        // obtenemos el jws q nos manda el cliente por medio de una cabecera
        let token = null;
        const authorization = req.get("Authorization"); // cago el token de la cabecera
        if (
            !(authorization && authorization.toLowerCase().startsWith("bearer"))
        ) {
            // si no tengo "authorization" o no comienza con la parabla "bearer"
            res.status(401).json({
                error: "Token no existe, mande un token",
            });
            return;
        }

        //console.log("Aqui")
        token = authorization.substring(7); //"Bearer 3dsfdsf4fsdf4fsdf"
        const decodeToken = Jwt.verify(token, process.env.ClaveSecretaJWT); // decodificamos el token -> invalid token
        if (!token || !decodeToken.id) {
            res.status(401).json({
                error: "Token es invalido",
            });
            return;
        }
        //#endregion

        //#region verificar que el id del usuario este en la base de datos, esta de mas hacer esto?
        const SQL_Usuarios = `select * from Usuarios as Us where Us.id = ${decodeToken.id}`;
        const pool = await getConnection();
        const resultado = await pool.request().query(SQL_Usuarios);

        if (resultado.recordset.length === 0) {
            return res.status(401).json({
                error: "Usuario no esta logiado o el JWT id no existe en la base de datos",
            });
        }

        //#endregion
        req.userId = decodeToken.id;
        return next();
    } catch (error) {
        next(error);
    }
};
