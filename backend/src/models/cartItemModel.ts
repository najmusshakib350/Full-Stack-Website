import { Schema, model, Document, Types } from "mongoose";

interface CartItem extends Document {
  price: String;
  user: Types.ObjectId;
}

const CartItemSchema = new Schema<CartItem>(
  {
    price: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const CartItemModel = model<CartItem>("CartItem", CartItemSchema);

export default CartItemModel;
