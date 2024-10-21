import express from 'express';
import { authorize } from "../middleware/authMiddleware";
import { Roles } from "../constants";
import { createEvent, getEvents } from '../controllers/eventController';
//  updateEvent, deleteEvent
const router = express.Router();

router.get("/", authorize([Roles.Member, Roles.Admin]), getEvents)
//router.get("/:id", authorize([Roles.Member, Roles.Admin]), getEvent)
router.post("/", authorize([Roles.Admin]), createEvent)
//router.patch("/:id", authorize([Roles.Admin]), updateEvent)
//router.delete("/:id", authorize([Roles.Admin]), deleteEvent)


export default router;