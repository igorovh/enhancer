import * as Logger from '$Logger';
import * as Peeker from '$Peeker';

Logger.info('Loading events...');
import './events/*.js';

Logger.info('Loading modules...');
import './modules/**/index.js';

setInterval(() => Peeker.check(), 1000);