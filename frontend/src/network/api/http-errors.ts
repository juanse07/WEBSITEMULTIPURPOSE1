class HtttpError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = this.constructor.name;
  }
}
/**
 * status code:400
 */
export class BadRequestError extends HtttpError {
 
}

/**
 * status code:401
 */
export class UnauthorizedError extends HtttpError {
   
  }

  /**
 * status code:404
 */
export class NotFoundError extends HtttpError {
  
  }

  /**
 * status code:409
 */
export class conflictError extends HtttpError {
   
  }

   /**
 * status code:429
 */
export class ToomanyrequestError extends HtttpError {
   
  }
  
  