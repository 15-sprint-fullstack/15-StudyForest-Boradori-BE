import express from 'express';
import { cors } from './middlewares/cors.middleware.js';
import { logger } from './middlewares/logger.middleware.js';
import { router } from './routes/index.js';
import { config } from '#config';

const app = express();
app.use(cors);
app.use(express.json());
app.use(logger);

app.use('/', router);
app.listen(config.PORT, () => {
  console.log(
    `${config.NODE_ENV} Server running at http://localhost:${config.PORT}`,
  );
});
