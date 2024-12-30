import express from "express";
import config from "./config";
import cors from "cors";
import Ruta_agenda from "./routers/agenda.router";
import Ruta_usuario from "./routers/usuario.routers";
import handleErrors from "./middleware/handleErrors";
import cookieParser from "cookie-parser";

const app = express();

// Middleware para parsear cookies
app.use(cookieParser());

//settings
app.set("port", config.port);

// middlewares
app.use(express.json()); // interprete json
app.use(express.urlencoded({ extended: false })); // permite ver el body de las peticiones

const corsOptions = {
    origin: process.env.CORS_FRONTEND, // Permitir a un dominio en especifico
    credentials: true, // Permitir credenciales
};

app.use(cors(corsOptions)); // permite que los navegadores puedan hacer o no solicitudes dependiendo del domino que vengan

// rutas
app.use(Ruta_usuario);
app.use(Ruta_agenda);

// http://localhost:4000/
app.use("/", (req, res) => {
    res.send("<h1> Pagina de Inicio </h1>");
});

// cunado no encuentre una ruta
app.use((req, res) => {
    res.status(404).json({
        error: "No existe la ruta",
    });
});

// manejar errores de los try catch
app.use(handleErrors);

export default app;
