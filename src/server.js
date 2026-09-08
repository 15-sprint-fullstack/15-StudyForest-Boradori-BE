import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { config, isDevelopment, isProduction } from '#config';
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
  console.log(`${config.NODE_ENV} Server running`);
  if (isProduction) {
    console.log(
      `${config.NODE_ENV} API 문서: ${process.env.RENDER_EXTERNAL_URL}`,
    );
  } else if (isDevelopment) {
    console.log(`${config.NODE_ENV} API 문서: http://localhost:5001/api-docs`);
  }
});
