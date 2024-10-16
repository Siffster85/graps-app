import mongoose, { Document, Schema } from "mongoose";

export interface IEvent extends Document {
    _id: any;
    name: string;
    description: string;
    date: string
    capacity: number
    }

    const eventSchema = new Schema<IEvent>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    });


const Event = mongoose.model("Event", eventSchema);

export default Event;