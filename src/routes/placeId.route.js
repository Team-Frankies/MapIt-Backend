// Node Modules
import express from 'express';
import {getPlaceId} from '../controllers/placeId.js';

const router = express.Router();

router.route('/:place_id').get(getPlaceId);

export default router;
