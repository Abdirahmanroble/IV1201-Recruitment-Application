// import {
//   type Response,
//   type Request,
//   NextFunction,
//   type ErrorRequestHandler,
// } from "express"
// /**
//  * Superclass for all error handlers.
//  */
// class ErrorHandler {

//     ErrorHandler(
//         statusCode: number = 500,
//         ): ErrorRequestHandler {
//             return (err: any, req: Request, res: Response, next: NextFunction
//     );

// // Define a custom error interface that extends the built-in Error interface
// interface CustomError extends Error {
//     statusCode?: number;
//     status?: string;
//   }

//   // Then use this interface for the error parameter
//   public static async errorHandler(
//     error: CustomError,
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) {
//     error.statusCode = error.statusCode || 500;
//     error.status = error.status || "error";
//     res.status(error.statusCode).json({
//       status: error.status,
//       message: error.message,
//     });
//   }

//   public static async errorHandler(
//     error: ErrorRequestHandler,
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) {
//     ;(error as any).statusCode = (error as any).statusCode || 500
//     ;(error as any).status = (error as any).status || "error"
//     res.status((error as any).statusCode).json({
//       status: (error as any).status,
//       message: error.message,
//     })
//   }
// }

// export default ErrorHandler
