import Event from "../models/Event";
import { Request, Response } from "express";
import { BadRequestError } from "../middleware/errorMiddleware";
import asyncHandler from "express-async-handler";

const getEvents = asyncHandler(async (req: Request, res: Response ) =>{
    const events = await Event.find({}, "name description date capacity");

    res.status(200).json(
        events.map((event) => {
            return { id: event._id, name: event.name, description: event.description, date: event.date, capacity: event.capacity, attendees: event.attendees};
        })
    )
})

const getEvent = asyncHandler(async (req: Request, res: Response) => {
    const eventId = req.params.eventId
    const event = await Event.findById(eventId, "name description date capacity");

    if (!event) {
        throw new BadRequestError("Event not available");
    }
    res.status(200).json(event);
});

const createEvent = asyncHandler(async (req: Request, res: Response) => {
    const { name, description, date, capacity, attendees } = req.body;


    const event = await Event.create({
        name,
        description,
        date,
        capacity,
        attendees,
    })

    if (event) {
        res.status(201).json({
            id: event._id,
            name: event.name,
            description: event.description,
            date: event.date,
            capacity: event.capacity,
            attendees: event.attendees,
        })
    } else {
        throw new BadRequestError("An error occurred creating this event");
}
})


export { createEvent, getEvents, getEvent }

// getEvent, updateEvent, deleteEvent
