import { Request, Response, NextFunction } from "express";

// Development error middleware
function developmentError(err: any, req: Request, res: Response): void {
  const a = {
    status: err.status,
    message: err.message,
    err,
  };

  res.status(err.statuscode).json({
    status: err.status,
    message: err.message,
    err,
  });
}

// Production error middleware
function productionError(err: any, req: Request, res: Response): void {
  if (err.isoperational) {
    res.status(err.statuscode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "something went wrong!!!",
    });
  }
}

export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  err.statuscode = err.statuscode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    developmentError(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    productionError(err, req, res);
  }

  next();
}
