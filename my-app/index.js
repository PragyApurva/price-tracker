// index.js
import app from "./app.js"
import logger from "./config/logger.js";

const PORT = process.env.PORT || 3000;

logger.info('Server started');

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
