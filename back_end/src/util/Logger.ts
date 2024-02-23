import { VError } from 'verror';

/**
 * Writes log messages to the console.
 */
class Logger {
  /**
   * Logs the specified exception to the console.
   *
   * @param exc The exception that shall be logged.
   */
  public logException(exc: Error): void {
    console.error(exc.message);
    console.error(exc.name);
    
    // Otherwise, we should check if `exc` is an instance of VError.
    if (exc instanceof VError && Object.values(VError.info(exc)).length !== 0) {
      console.error(VError.info(exc));
    }
    
    console.error(exc.stack);
    
    const cause = VError.cause(exc);
    if (cause) {
      console.error('Caused by:');
      this.logException(cause as Error); 
    }
  }
}

export default Logger;