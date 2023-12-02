"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { productData } from "@/lib/productData";
import { LoginUserInfo } from "@/lib/interface";
import { isAuthenticated } from "@/lib/authenticate";
import { addToCart } from "@/redux/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
const Products = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState<LoginUserInfo>({
    name: "",
    token: "",
    id: "",
    email: "",
  });
  const cartData = useSelector((state: RootState) => {
    return state.cart;
  });

  useEffect(function () {
    const res = isAuthenticated();
    if (res) {
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

  async function handleCart(
    event: React.MouseEvent<HTMLButtonElement>,
    price: string,
    id: string,
    token: string
  ) {
    const res = isAuthenticated();
    if (res === false) {
      router.push("/user/login");
    }
    dispatch(addToCart({ price, id, token }));
  }

  return (
    <div className="container mx-auto mt-10">
      <p className="text-black text-base text-center mb-6">
        {cartData.errorMsg !== "" ? cartData.errorMsg : ""}
      </p>
      <div className="flex justify-center gap-10">
        {productData.map((item, i) => {
          return (
            <div className="border w-[300px] px-2" key={i}>
              <Image
                src={item.image}
                alt="image"
                width={300}
                height={300}
                className="object-cover"
              />
              <p className="text-black text-base my-3">${item.price}</p>

              <button
                onClick={(event) =>
                  handleCart(event, item.price, userInfo.id, userInfo.token)
                }
                type="button"
                className="text-white text-base bg-slate-700 rounded-full py-2 px-6 block mx-auto mb-6"
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
