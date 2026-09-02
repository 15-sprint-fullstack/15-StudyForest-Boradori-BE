import express from 'express';
import { router } from './routes/index.js';
import { config } from '#config';

const app = express();

app.use(express.json());
app.use('/', router);
app.listen(config.PORT, () => {
  console.log(
    `${config.NODE_ENV} Server running at http://localhost:${config.PORT}`,
  );
});
