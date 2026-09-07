import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { config } from '#config';
import { cors, errorHandler, logger } from '#middlewares';
import { swaggerSpec } from '../swagger/swagger.js';
import { router } from './routes/index.js';

const app = express();
app.use(cors);
app.use(express.json());
app.use(logger);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/', router);
app.use(errorHandler);
app.listen(config.PORT, () => {
  console.log(
    `${config.NODE_ENV} Server running at http://localhost:${config.PORT}`,
  );
  console.log('API 문서: http://localhost:5001/api-docs');
});
