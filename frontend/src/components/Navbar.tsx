"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaStripeS } from "react-icons/fa6";
import { FaCartArrowDown } from "react-icons/fa";
import { isAuthenticated } from "@/lib/authenticate";
import { LoginUserInfo } from "@/lib/interface";
import { userLogout } from "@/lib/clientAction";
import { useRouter } from "next/navigation";
import { cartData } from "@/redux/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartInfo = useSelector((state: RootState) => {
    return state.cart;
  });

  const [userInfo, setUserInfo] = useState<LoginUserInfo>({
    name: "",
    token: "",
    id: "",
    email: "",
  });
  async function handleLogout(event: React.MouseEvent<HTMLButtonElement>) {
    const user = await userLogout();
    if (user) {
      router.push("/user/login");
    }
  }
  useEffect(function () {
    const res = isAuthenticated();

    if (res) {
      dispatch(cartData(res.token));

      setUserInfo((prev: LoginUserInfo) => {
        return {
          ...prev,
          name: res.name,
          token: res.token,
          id: res.id,
        };
      });
    }
  }, []);

  return (
    <div className="bg-slate-700">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link href="/">
            <FaStripeS className="text-white text-[36px]" />
          </Link>
          <div className="flex gap-3 justify-end py-4">
            {userInfo.token !== "" ? (
              ""
            ) : (
              <Link href="/user/login" className="text-white text-lg">
                Login
              </Link>
            )}

            {userInfo.token !== "" ? (
              ""
            ) : (
              <Link href="/user/registration" className="text-white text-lg ">
                Registration
              </Link>
            )}
            {userInfo.token !== "" ? (
              <div className="relative flex items-center">
                {" "}
                <FaCartArrowDown className="text-white text-lg" />{" "}
                <p className="text-white text-sm absolute bottom-[100%] left-[100%] -translate-x-[50%] translate-y-[50%]">
                  {cartInfo.count}
                </p>{" "}
              </div>
            ) : (
              ""
            )}
            <p className="text-white text-lg">{userInfo.name}</p>
            {userInfo.token !== "" ? (
              <button
                type="button"
                className="text-white text-lg cursor-pointer"
                onClick={handleLogout}
              >
                LogOut
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
