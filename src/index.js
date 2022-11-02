import * as Logger from '$Logger';
import { isDev } from '$Utils/dev';
import * as Island from '$Utils/island';

window.__enhancer = true;

Logger.info('Loading events...');
import './events/*.js';

Logger.info('Loading modules...');
import './modules/**/index.js';

if (isDev) {
    Logger.debug('Development mode is enabled.');
    Island.addToQueue('Development mode is enabled.');
}
