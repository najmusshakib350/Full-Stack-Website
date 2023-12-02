"use server";

async function createCheckOutSession(cartData: any, token: string) {
  try {
    const res = await fetch(
      "http://localhost:7890/api/v1/payment/checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cartData),
      }
    );
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }
    const session = await res.json();

    return {
      sessionUrl: session.session.url,
      errorMsg: "",
    };
  } catch (error: any) {
    return {
      errorMsg: error.message,
    };
  }
}
export { createCheckOutSession };
