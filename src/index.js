import * as Logger from '$Logger';
Logger.info('Loading events...');
import './events/*.js';

Logger.info('Loading modules...');
import './modules/**/index.js';
