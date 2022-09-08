import * as Logger from '$Logger';
import { isDev } from '$Utils/dev';

Logger.info('Loading events...');
import './events/*.js';

Logger.info('Loading modules...');
import './modules/**/index.js';

if (isDev) Logger.debug('Development mode is enabled.');
