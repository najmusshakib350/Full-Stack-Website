import CartItem from "./../models/cartItemModel";
import { catchAsync } from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";
interface CustomRequest extends Request {
  user?: any;
}
const cartCalculation = (cartItems: any[]) => {
  const sum: string = cartItems.reduce(
    (accumulator: string, currentNumber: any) => {
      const x = parseInt(accumulator, 10);
      const y = parseInt(currentNumber.price, 10);
      return x + y;
    },
    0
  );

  return {
    price: sum,
    count: cartItems.length,
  };
};
export const creatCartItem = catchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    let cartItems: any;
    let items: any;
    const item = await CartItem.create(req.body);
    if (item) {
      cartItems = await CartItem.find({
        user: req.user._id,
      }).populate("user", "name");
      items = cartCalculation(cartItems);
    }
    res.status(201).json({
      status: "success",
      data: {
        item,
        ...items,
        cartArr: cartItems,
      },
    });
  }
);

export const getCartItem = catchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    let cartItems: any;
    cartItems = await CartItem.find({
      user: req.user._id,
    }).populate("user", "name");

    const items = cartCalculation(cartItems);

    res.status(200).json({
      status: "success",
      data: {
        ...items,
        cartArr: cartItems,
      },
    });
  }
);
