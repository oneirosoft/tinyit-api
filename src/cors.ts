import { cors } from '@elysiajs/cors'

export const corsOptions =
    cors({
        origin: process.env.ORIGIN,
        credentials: true,
        methods: ['GET', 'PUT', 'OPTIONS'],
        allowedHeaders: ['Content-Type'],
    })