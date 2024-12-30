import { getConnection, sql } from "../database/connection";
import Jwt from "jsonwebtoken";

export default async (req, res, next) => {
    const { token } = req.cookies;

    // Verificar si el token existe
    if (!token) {
        return res
            .status(401)
            .json({ message: "Acceso no autorizado. Token no proporcionado." });
    }

    try {
        // Verificar y decodificar el token
        const decodedToken = Jwt.verify(token, process.env.ClaveSecretaJWT);

        if (!decodedToken.id) {
            throw new Error(
                "No se ha proporcionado un ID de usuario válido en la cookie."
            );
        }

        req.userId = decodedToken.id;
        return next();
    } catch (error) {
        next(error);
    }
};
