import express from 'express';
import authRouter from "../src/routes/authRouter";
import connectUserDB from "../src/connections/userDB";
import dotenv from "dotenv";
import helmet from 'helmet';
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authenticate } from "../src/middleware/authMiddleware";
import { errorHandler } from "../src/middleware/errorMiddleware";
import userRouter from "../src/routes/userRouter";
import eventRouter from "../src/routes/eventRouter"

dotenv.config();

interface UserBasicInfo {
    _id: any;
    email: string;
    roles: string[]
    }
    
    declare global {
        namespace Express {
            interface Request {
                user?: UserBasicInfo | null;
            }
        }
    }

const app = express();
const port = process.env.PORT || 8000;


app.use(
    cors({
        origin: "https://nwwrestling.netlify.app",
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true,
    })
);

app.use(helmet())
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


app.use(authRouter);
app.use("/users", authenticate, userRouter);
app.use("/events", authenticate, eventRouter)

app.use(errorHandler);

connectUserDB();

module.exports = app
