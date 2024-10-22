import express from 'express';
import { authorize } from "../middleware/authMiddleware";
import { Roles } from "../constants";
import { createEvent, getEvents, getEvent } from '../controllers/eventController';
//  updateEvent, deleteEvent
const router = express.Router();

router.get("/", authorize([Roles.Member, Roles.Admin]), getEvents)
router.get("/:eventId", authorize([Roles.Member, Roles.Admin]), getEvent)
router.get("/admin/:eventId", authorize([Roles.Admin]), getEvent)
router.post("/", authorize([Roles.Admin]), createEvent)
//router.patch("/:id", authorize([Roles.Admin]), updateEvent)
//router.delete("/:id", authorize([Roles.Admin]), deleteEvent)


export default router;