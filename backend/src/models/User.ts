import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { Roles } from "../constants";

export interface IUser extends Document {
    _id: any;
    name: string;
    email: string;
    password: string;
    roles: string[]
    comparePassword: (enteredPassword: string) => boolean;
    }

    const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: {
        type: [String],
        required: true,
        default: [Roles.Member],
    },
    });

    userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    });

    userSchema.methods.comparePassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
    };

const User = mongoose.model("User", userSchema);

export default User;