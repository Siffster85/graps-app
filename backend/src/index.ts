import express from 'express';
import authRouter from "./routes/authRouter";
import connectUserDB from "./connections/userDB";
import dotenv from "dotenv";
import helmet from 'helmet';
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authenticate } from "./middleware/authMiddleware";
import { errorHandler } from "./middleware/errorMiddleware";
import userRouter from "./routes/userRouter";

dotenv.config();

interface UserBasicInfo {
    _id: any;
    //name: string;
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
app.use(helmet())


app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


app.use(authRouter);
app.use("/users", authenticate, userRouter);

app.use(errorHandler);

connectUserDB();
