// Node Modules
import express from 'express';

// Routes
import auth from './routes/auth.routes.js';

import maps from './routes/maps.routes.js';

function api_router(app) {
	const router = express.Router();
	app.use('/api/v1', router);

	router.use('/auth-service', auth);

	router.use('/maps', maps);
}

export default api_router;
