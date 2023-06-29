const express = require('express');
const cors = require('cors');
const router = require('./routes/general-routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const { errorMiddleware } = require('./middleware/error-handlers');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1/', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use(errorMiddleware);

app.all('*', (req, res) => {
  return res.sendStatus(404);
});

module.exports = app;
