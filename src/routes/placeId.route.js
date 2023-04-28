// Node Modules
import express from "express";
import { getPlaceId } from "../controller/placeId";

const router = express.Router();

router.route("/").get(getPlaceId);

export default router;
