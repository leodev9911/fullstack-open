const config = require('./utils/config');
const logger = require('./utils/logger');
const app = require('./app');

const PORT = config.PORT || 8080;
app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}/`)
})