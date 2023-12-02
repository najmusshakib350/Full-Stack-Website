import { Request, Response } from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-08-01",
});

export const createCheckoutSession = async (req: Request, res: Response) => {
  // create checkout session

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: "http://localhost:3000/payment/success",
    cancel_url: "http://localhost:3000/payment/cancel",

    mode: "payment",
    //adding the shipping prices
    shipping_address_collection: {
      allowed_countries: ["US", "CA"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 900,
            currency: "usd",
          },
          display_name: "Regular shipping",
          //delivers between 5- 7 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
    ],
    allow_promotion_codes: true,
    customer_email: req.body.email,

    line_items: req.body.cartItems.map((item: any) => {
      const value = parseInt(item.price, 10) * 100;
      return {
        price_data: {
          currency: "usd",
          unit_amount: value,
          product_data: {
            name: "Product Name",
            description: "Product Description",
            images: [],
          },
        },
        quantity: 1,
      };
    }),
  });

  res.status(200).json({
    status: "success",
    session,
  });
};

const createPurchaseCheckout = async (session: any) => {
  try {
    // Implement Our logic to handle successful payment intent here

    console.log(session);
  } catch (err) {}
};

export const webHookCheckout = (req: Request, res: Response) => {
  const signature = req.headers["stripe-signature"];

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );

    if (event.type === "payment_intent.succeeded") {
      createPurchaseCheckout(event.data.object as Stripe.PaymentIntent);
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    return res.status(400).send(`webhook error`);
  }
};
