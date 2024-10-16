import express, { Request, Response } from 'express';
import { authorize } from "../middleware/authMiddleware";
import { Roles } from "../constants";
import { createEvent, getEvents, getEvent, updateEvent, deleteEvent  } from '../controllers/eventController';

const router = express.Router();

router.get("/", authorize([Roles.Member, Roles.Admin]), getEvents)
router.get("/:id", authorize([Roles.Member, Roles.Admin]), getEvent)
router.post("/", authorize([Roles.Admin]), createEvent)
router.patch("/", authorize([Roles.Admin]), updateEvent)
router.delete("/", authorize([Roles.Admin]), deleteEvent)


export default router;