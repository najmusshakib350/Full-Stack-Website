import { Request, Response, NextFunction } from "express";
import { User } from "./../models/userModel";
import { catchAsync } from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../utils/appError";
import { promisify } from "util";
interface CustomRequest extends Request {
  user?: any;
}

const signToken = (name: string, id: string, email: string) => {
  return jwt.sign({ name, id, email }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user: any, statusCode: number, res: Response) => {
  const token = signToken(user.name, user._id, user.email);

  let expiresIn: number | string | undefined =
    process.env.JWT_COOKIE_EXPIRES_IN;

  if (expiresIn !== undefined) {
    expiresIn = Number(expiresIn);
  }

  const cookieOptions = {
    expires: new Date(Date.now() + (expiresIn as number) * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  } as const;

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
export const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser = await User.create(req.body);
    createSendToken(newUser, 201, res);
  }
);
export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Please provide email and password!", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Incorrect email or password", 401));
    }

    createSendToken(user, 200, res);
  }
);

export const logout = (req: Request, res: Response): void => {
  res.cookie("jwt", "");
  res.status(200).json({
    status: "success",
  });
};

export const protect = catchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    let token: string | undefined;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(
        new AppError("You are not logged in! Please log in to get access.", 401)
      );
    }

    // 2) Verification token

    const decoded = (await jwt.verify(
      token,
      process.env.JWT_SECRET as string
    )) as JwtPayload;

    // 3) Check if user still exists
    const freshUser = await User.findById(decoded.id);

    if (!freshUser) {
      return next(
        new AppError("The user belonging to this token no longer exists.", 401)
      );
    }

    req.user = freshUser;

    return next();
  }
);
