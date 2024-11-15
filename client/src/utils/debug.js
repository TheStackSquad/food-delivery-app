export const debugMode = process.env.NODE_ENV === 'development';

export const logError = (error) => {
  if (debugMode) {
    console.error('🚨 [App Error]:', error);
  }
};

export const logInfo = (message) => {
  if (debugMode) {
    console.info('ℹ️ [App Info]:', message);
  }
};

// Use in your entry point (index.js)
window.onerror = function(msg, url, lineNo, columnNo, error) {
  logError(`${msg}\nLine: ${lineNo}\nColumn: ${columnNo}\n${error?.stack || ''}`);
  return false;
};