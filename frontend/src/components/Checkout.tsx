"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { createCheckOutSession } from "@/lib/serverAction";
import { LoginUserInfo } from "@/lib/interface";
import { isAuthenticated } from "@/lib/authenticate";
import { useRouter } from "next/navigation";

const Checkout = () => {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState<LoginUserInfo>({
    name: "",
    token: "",
    id: "",
    email: "",
  });
  const cartInfo = useSelector((state: RootState) => {
    return state.cart;
  });
  async function handleCheckOut() {
    const sessionObject = {
      email: userInfo.email,
      cartItems: [...cartInfo.cartArr],
    };
    const res = await createCheckOutSession(sessionObject, userInfo.token);

    if (res) {
      router.push(res.sessionUrl);
    }
  }
  useEffect(function () {
    const res = isAuthenticated();

    if (res) {
      setUserInfo((prev: LoginUserInfo) => {
        return {
          ...prev,
          name: res.name,
          token: res.token,
          id: res.id,
          email: res.email,
        };
      });
    }
  }, []);
  return (
    <div className="container mx-auto">
      <button
        onClick={handleCheckOut}
        disabled={cartInfo.count === 0 || userInfo.token === "" ? true : false}
        type="button"
        className={
          cartInfo.count === 0 || userInfo.token === ""
            ? "text-white text-base bg-slate-700 rounded-full py-2 px-6 block mx-auto mt-10 opacity-60"
            : "text-white text-base bg-slate-700 rounded-full py-2 px-6 block mx-auto mt-10"
        }
      >
        Checkout
      </button>
    </div>
  );
};

export default Checkout;
