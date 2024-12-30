// servicios de consulta a la base de datos
import { getConnection, sql } from "../database/connection";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { z } from "zod";

// Definir el esquema de validación
const registerSchema = z.object({
    Nombre: z
        .string()
        .min(2, "El nombre debe tener al menos 2 caracteres")
        .max(50, "El nombre no puede exceder 50 caracteres")
        .regex(
            /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
            "El nombre solo puede contener letras"
        ),

    Apellido: z
        .string()
        .min(2, "El apellido debe tener al menos 2 caracteres")
        .max(50, "El apellido no puede exceder 50 caracteres")
        .regex(
            /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
            "El apellido solo puede contener letras"
        ),

    Dni: z
        .string()
        .length(8, "El DNI debe tener 8 dígitos")
        .regex(/^\d+$/, "El DNI solo puede contener números"),

    Email: z
        .string()
        .email("Email inválido")
        .max(100, "El email no puede exceder 100 caracteres"),

    Password: z
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .max(100, "La contraseña no puede exceder 100 caracteres")
        .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
        .regex(/[0-9]/, "Debe contener al menos un número")
        .regex(/[!@#$%^&*]/, "Debe contener al menos un carácter especial"),
});

export const Register = async (req, res, next) => {
    try {
        // Validar los datos de entrada
        const validatedData = registerSchema.parse(req.body);
        // Encriptar password
        const hashedPassword = await bcrypt.hash(validatedData.Password, 10);
        // Preparar la consulta parametrizada
        const query = `
        INSERT INTO usuarios (Nombre, Apellido, Dni, Email, Password)
        VALUES (@Nombre, @Apellido, @Dni, @Email, @Password)`;

        const pool = await getConnection();
        const request = pool.request();

        // Agregar los parámetros de forma segura
        request
            .input("Nombre", validatedData.Nombre)
            .input("Apellido", validatedData.Apellido)
            .input("Dni", validatedData.Dni)
            .input("Email", validatedData.Email)
            .input("Password", hashedPassword);

        await request.query(query);

        res.status(201).json({
            error: 0,
            mensaje: "Los datos se grabaron con éxito",
        });
    } catch (error) {
        // Manejar errores de validación de Zod
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                error: 1,
                mensaje: "Error de validación",
                detalles: error.errors.map((err) => ({
                    campo: err.path.join("."),
                    mensaje: err.message,
                })),
            });
        }

        // Manejar error de email o dni duplicado
        if (error.number === 2627) {
            return res.status(409).json({
                error: 1,
                mensaje: "Ya estas registrado",
            });
        }

        // Otros errores
        next(error);
    }
};

const loginSchema = z.object({
    Email: z.string().email("Email inválido"),
    Password: z.string(),
});

export const Login = async (req, res, next) => {
    try {
        // Validar los datos de entrada
        const validatedData = loginSchema.parse(req.body);
        const { Email, Password } = validatedData;

        // Preparar la consulta parametrizada
        const pool = await getConnection();
        const result = await pool
            .request()
            .input("email", sql.VarChar, Email)
            .query(
                "SELECT TOP(1) * FROM usuarios AS Us WHERE Us.Email = @email"
            );

        // Validar que el usuario exista
        const user = result.recordset[0];
        if (!user) {
            return res.status(401).json({
                error: 1,
                mensaje: "Usuario y/o Password son incorrectos o no Existen.",
            });
        }

        // Comparar passwords
        const isValidPassword = await bcrypt.compare(Password, user.Password);
        if (!isValidPassword) {
            return res.status(401).json({
                error: 1,
                mensaje: "Usuario y/o Password son incorrectos o no Existen.",
            });
        }

        // Crear payload para el JWT con información mínima necesaria
        const tokenPayload = {
            id: user.id,
            usuario: user.Usuario,
        };

        // Generar JWT
        const token = Jwt.sign(tokenPayload, process.env.ClaveSecretaJWT, {
            expiresIn: process.env.JWT_TIEMPO_EXPIRA,
            algorithm: "HS256",
        });

        // Establecer token en cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000, // 24 horas
        });

        // Establecer session en cookie
        const userSession = {
            id: user.id,
            usuario: user.Usuario,
            email: user.Email,
        };
        res.cookie("session", userSession, {
            httpOnly: false,
            secure: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000, // 24 horas
        });

        return res.status(200).json({
            error: 0,
            mensaje: "Login Exitoso",
            // token,
            datos: {
                id: user.id,
                usuario: user.Usuario,
                email: user.Email,
            },
        });
    } catch (error) {
        console.error("Error en login:", error.message);

        // Manejar errores de validación de Zod
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                error: 1,
                mensaje: "Error de validación",
                detalles: error.errors.map((err) => ({
                    campo: err.path.join("."),
                    mensaje: err.message,
                })),
            });
        }

        return next(new Error("Error en la autenticación"));
    }
};

export const Logout = async (req, res, next) => {
    res.clearCookie("token", { httpOnly: true, path: "/" });
    res.clearCookie("session", { httpOnly: false, path: "/" });
    res.send("Cookie eliminada");
};
