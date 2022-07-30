import Logger from '$Logger';
import * as Peeker from '$Peeker';

export const logger = new Logger();

logger.info('Loading modules...');
import './modules/**/index.js';

setInterval(() => Peeker.check(), 1000);