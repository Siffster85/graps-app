import Event from "../models/Event";
import { Request, Response } from "express";
import { BadRequestError } from "../middleware/errorMiddleware";
import asyncHandler from "express-async-handler";

const createEvent = asyncHandler(async (req: Request, res: Response) => {
    const { name, description, date, capacity } = req.body;

    const event = await Event.create({
        name,
        description,
        date,
        capacity,
    })

    if (event) {
        res.status(201).json({
            id: event._id,
            name: event.name,
            description: event.description,
            date: event.date,
            capacity: event.capacity
        })
    } else {
        throw new BadRequestError("An error occurred creating this event");
}
})


export { createEvent, getEvents, getEvent, updateEvent, deleteEvent }
