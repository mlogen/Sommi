const LOG_LEVELS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
};

const getTimestamp = () => new Date().toISOString();

const formatMessage = (level, message, data = {}) => {
  const timestamp = getTimestamp();
  return {
    timestamp,
    level,
    message,
    ...data,
  };
};

class Logger {
  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';
  }

  error(message, error = null, context = {}) {
    const formattedMessage = formatMessage(LOG_LEVELS.ERROR, message, {
      error: error?.message || error,
      stack: error?.stack,
      ...context,
    });

    console.error('[ERROR]', formattedMessage);

    // In production, you might want to send this to a logging service
    if (!this.isDevelopment) {
      // TODO: Send to logging service (e.g., Sentry, LogRocket)
    }
  }

  warn(message, context = {}) {
    const formattedMessage = formatMessage(LOG_LEVELS.WARN, message, context);
    console.warn('[WARN]', formattedMessage);
  }

  info(message, context = {}) {
    const formattedMessage = formatMessage(LOG_LEVELS.INFO, message, context);
    console.info('[INFO]', formattedMessage);
  }

  debug(message, context = {}) {
    if (this.isDevelopment) {
      const formattedMessage = formatMessage(LOG_LEVELS.DEBUG, message, context);
      console.debug('[DEBUG]', formattedMessage);
    }
  }

  // Track user interactions
  trackUserAction(action, details = {}) {
    this.info('User Action', {
      action,
      ...details,
      timestamp: getTimestamp(),
    });
  }

  // Track API calls
  trackApiCall(endpoint, method, duration, status, error = null) {
    const context = {
      endpoint,
      method,
      duration,
      status,
      error,
    };

    if (error || status >= 400) {
      this.error('API Call Failed', error, context);
    } else {
      this.debug('API Call Completed', context);
    }
  }

  // Track component lifecycle
  trackComponentLifecycle(componentName, action, duration = null) {
    this.debug('Component Lifecycle', {
      component: componentName,
      action,
      duration,
    });
  }
}

export default new Logger(); 