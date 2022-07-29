import Logger from 'Logger';

let logger = new Logger();

// testLogs();

logger = new Logger('testing-logger');

testLogs();

function testLogs() {
    logger.log('TEST');
    logger.debug('TEST');
    logger.info({ test: 'test' });
    logger.warn('TEST');
    logger.error('TEST');
}